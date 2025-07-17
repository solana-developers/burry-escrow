import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { BN, Program } from "@coral-xyz/anchor";
import { BurryEscrow } from "../target/types/burry_escrow";
import {
  defundKeypair,
  fetchPullFeedValue,
  fundKeypair,
  getSetup,
} from "./setup";
import {
  Connection,
  Keypair,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { getEscrowPdaAndBump } from "./pda";
import { fetchEscrowAcc } from "./accounts";
import {
  ON_DEMAND_DEVNET_QUEUE,
  PullFeed,
  Randomness,
} from "@switchboard-xyz/on-demand";
import { BASE_FEE, SOL_USD_FEED } from "./constants";
import { SbOnDemand } from "./fixtures/sb_on_demand";

describe("burry-escrow", () => {
  let { program, onDemandProgram } = {} as {
    program: Program<BurryEscrow>;
    onDemandProgram: Program<SbOnDemand>;
  };

  let connection: Connection;
  let pullFeed: PullFeed;

  const authority = Keypair.generate();
  const [escrowPda, escrowBump] = getEscrowPdaAndBump(authority.publicKey);

  beforeAll(async () => {
    ({ program, onDemandProgram } = await getSetup());
    connection = program.provider.connection;
    //@ts-ignore
    pullFeed = new PullFeed(onDemandProgram, SOL_USD_FEED);
    await fundKeypair(authority.publicKey);
  });

  test("deposit 500 lamports at $100 unlock price", async () => {
    const preUserBal = await connection.getBalance(authority.publicKey);

    const unlockPrice = 100;
    const escrowAmount = new BN(500);

    const ix = await program.methods
      .deposit({
        unlockPrice,
        escrowAmount,
      })
      .accounts({
        user: authority.publicKey,
      })
      .instruction();

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    const message = new TransactionMessage({
      payerKey: authority.publicKey,
      recentBlockhash: blockhash,
      instructions: [ix],
    }).compileToV0Message([]);

    const tx = new VersionedTransaction(message);
    tx.sign([authority]);

    const signature = await connection.sendTransaction(tx);

    await connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight,
    });

    const escrowAcc = await fetchEscrowAcc(program, escrowPda);

    expect(escrowAcc.bump).toBe(escrowBump);
    expect(escrowAcc.unlockPrice).toBe(unlockPrice);
    expect(escrowAcc.escrowAmount.toNumber()).toBe(escrowAmount.toNumber());
    expect(escrowAcc.outOfJail).toBeFalse();
    expect(escrowAcc.randomness).toStrictEqual(PublicKey.default);
    expect(escrowAcc.seedSlot.toNumber()).toBe(0);

    const postUserBal = await connection.getBalance(authority.publicKey);
    const escrowBal = await connection.getBalance(escrowPda);

    expect(postUserBal).toBeLessThanOrEqual(preUserBal - escrowBal - BASE_FEE);
  });

  test("withdraw escrowed amount", async () => {
    const [pullIx, responses, success, luts] = await pullFeed.fetchUpdateIx(
      {
        gateway: "",
        chain: "solana",
        network: "devnet",
        solanaRpcUrl: connection.rpcEndpoint,
      },
      false,
      authority.publicKey,
    );

    const ix = await program.methods
      .withdraw()
      .accounts({
        user: authority.publicKey,
      })
      .instruction();

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    const message = new TransactionMessage({
      payerKey: authority.publicKey,
      recentBlockhash: blockhash,
      instructions: [...pullIx, ix],
    }).compileToV0Message(luts);

    const tx = new VersionedTransaction(message);
    tx.sign([authority]);

    const signature = await connection.sendTransaction(tx);

    await connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight,
    });

    const escrowAcc = await fetchEscrowAcc(program, escrowPda);

    expect(escrowAcc).toBeNull();
  });

  test("throws when withdrawing below unlock price", async () => {
    const currentPrice = await fetchPullFeedValue(pullFeed);
    const unlockPrice = currentPrice * 1.5;
    const escrowAmount = new BN(500);

    const ix1 = await program.methods
      .deposit({
        unlockPrice,
        escrowAmount,
      })
      .accounts({
        user: authority.publicKey,
      })
      .instruction();

    let { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    const message1 = new TransactionMessage({
      payerKey: authority.publicKey,
      recentBlockhash: blockhash,
      instructions: [ix1],
    }).compileToV0Message();

    const tx1 = new VersionedTransaction(message1);
    tx1.sign([authority]);

    const signature = await connection.sendTransaction(tx1);

    await connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight,
    });

    const [pullIx, responses, success, luts] = await pullFeed.fetchUpdateIx(
      {
        gateway: "",
        chain: "solana",
        network: "devnet",
        solanaRpcUrl: connection.rpcEndpoint,
      },
      false,
      authority.publicKey,
    );

    const ix2 = await program.methods
      .withdraw()
      .accounts({
        user: authority.publicKey,
      })
      .instruction();

    ({ blockhash } = await connection.getLatestBlockhash());

    const message2 = new TransactionMessage({
      payerKey: authority.publicKey,
      recentBlockhash: blockhash,
      instructions: [...pullIx, ix2],
    }).compileToV0Message(luts);

    const tx2 = new VersionedTransaction(message2);
    tx2.sign([authority]);

    expect(async () => {
      await connection.sendTransaction(tx2);
    }).toThrow();
  });

  test("commit and reveal randomness", async () => {
    const [randomness, rngKp, ixs] = await Randomness.createAndCommitIxs(
      //@ts-ignore
      onDemandProgram,
      ON_DEMAND_DEVNET_QUEUE,
      authority.publicKey,
    );

    const ix1 = await program.methods
      .commitRandomness()
      .accounts({
        user: authority.publicKey,
        randomness: randomness.pubkey,
      })
      .instruction();

    let { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    let message = new TransactionMessage({
      payerKey: authority.publicKey,
      recentBlockhash: blockhash,
      instructions: [...ixs, ix1],
    }).compileToV0Message([]);

    let tx = new VersionedTransaction(message);
    tx.sign([authority, rngKp]);

    let signature = await connection.sendTransaction(tx);

    await connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight,
    });

    const escrowAcc = await fetchEscrowAcc(program, escrowPda);

    expect(escrowAcc.randomness).toStrictEqual(randomness.pubkey);

    const randomnessAcc = await randomness.loadData();

    expect(escrowAcc.seedSlot.toNumber()).toBe(
      randomnessAcc.seedSlot.toNumber(),
    );

    const revealIx = await randomness.revealIx(authority.publicKey);

    const ix2 = await program.methods
      .revealRandomness()
      .accounts({
        user: authority.publicKey,
      })
      .instruction();

    ({ blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash());

    message = new TransactionMessage({
      payerKey: authority.publicKey,
      recentBlockhash: blockhash,
      instructions: [revealIx, ix2],
    }).compileToV0Message([]);

    tx = new VersionedTransaction(message);
    tx.sign([authority]);

    signature = await connection.sendTransaction(tx);

    await connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight,
    });
  });

  test("withdraw after getting out of jail", async () => {
    let escrowAcc = await fetchEscrowAcc(program, escrowPda);
    let attempts = 0;

    while (!escrowAcc.outOfJail) {
      attempts++;
      console.log("Rolling dice...");
      const [randomness, rngKp, ixs] = await Randomness.createAndCommitIxs(
        //@ts-ignore
        onDemandProgram,
        ON_DEMAND_DEVNET_QUEUE,
        authority.publicKey,
      );

      const ix1 = await program.methods
        .commitRandomness()
        .accounts({
          user: authority.publicKey,
          randomness: randomness.pubkey,
        })
        .instruction();

      let { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();

      const message1 = new TransactionMessage({
        payerKey: authority.publicKey,
        recentBlockhash: blockhash,
        instructions: [...ixs, ix1],
      }).compileToV0Message([]);

      const tx1 = new VersionedTransaction(message1);
      tx1.sign([authority, rngKp]);

      const signature1 = await connection.sendTransaction(tx1);

      await connection.confirmTransaction({
        signature: signature1,
        blockhash,
        lastValidBlockHeight,
      });

      const revealIx = await randomness.revealIx(authority.publicKey);

      const ix2 = await program.methods
        .revealRandomness()
        .accounts({
          user: authority.publicKey,
        })
        .instruction();

      ({ blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash());

      const message2 = new TransactionMessage({
        payerKey: authority.publicKey,
        recentBlockhash: blockhash,
        instructions: [revealIx, ix2],
      }).compileToV0Message([]);

      const tx2 = new VersionedTransaction(message2);
      tx2.sign([authority]);

      const signature2 = await connection.sendTransaction(tx2);

      await connection.confirmTransaction({
        signature: signature2,
        blockhash,
        lastValidBlockHeight,
      });

      escrowAcc = await fetchEscrowAcc(program, escrowPda);
    }

    console.log(`Got out of jail after ${attempts} attempt(s)!`);

    const [pullIx, responses, success, luts] = await pullFeed.fetchUpdateIx(
      {
        gateway: "",
        chain: "solana",
        network: "devnet",
        solanaRpcUrl: connection.rpcEndpoint,
      },
      false,
      authority.publicKey,
    );

    const ix = await program.methods
      .withdraw()
      .accounts({
        user: authority.publicKey,
      })
      .instruction();

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    const message2 = new TransactionMessage({
      payerKey: authority.publicKey,
      recentBlockhash: blockhash,
      instructions: [...pullIx, ix],
    }).compileToV0Message(luts);

    const tx = new VersionedTransaction(message2);
    tx.sign([authority]);

    const signature = await connection.sendTransaction(tx);

    await connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight,
    });
  });

  afterAll(async () => {
    await defundKeypair(authority);
  });
});
