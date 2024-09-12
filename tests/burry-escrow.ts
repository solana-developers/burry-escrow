import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { BurryEscrow } from "../target/types/burry_escrow";
import { Big } from "@switchboard-xyz/common";
import {
  AggregatorAccount,
  AnchorWallet,
  SwitchboardProgram,
} from "@switchboard-xyz/solana.js";
import { assert } from "chai";

export const solUSDSwitchboardFeed = new anchor.web3.PublicKey(
  "GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR"
);

describe("burry-escrow", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.env();
  const program = anchor.workspace.BurryEscrow as Program<BurryEscrow>;
  const payer = (provider.wallet as AnchorWallet).payer;

  it("Create Burry Escrow Below Price", async () => {
    // fetch switchboard devnet program object
    const switchboardProgram = await SwitchboardProgram.load(
      "devnet",
      new anchor.web3.Connection("https://api.devnet.solana.com"),
      payer
    );
    const aggregatorAccount = new AggregatorAccount(
      switchboardProgram,
      solUSDSwitchboardFeed
    );

    // derive escrow account
    // const uniqueSeed = Buffer.from("MICHAEL BURRY" + new Date().toISOString());

    const [Escrow] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("MICHAEL BURRY"), payer.publicKey.toBuffer()],
      program.programId
    );

    // fetch latest SOL price
    const solPrice: Big | null = await aggregatorAccount.fetchLatestValue();
    if (solPrice === null) {
      throw new Error("Aggregator holds no value");
    }

    const failUnlockPrice = new BN(solPrice.minus(10).toNumber());
    const amountToLockUp = new BN(100);

    // Send transaction
    try {
      const transaction = await program.methods
        .deposit(amountToLockUp, failUnlockPrice)
        .accounts({
          user: payer.publicKey,
          escrowAccount: Escrow,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([payer])
        .rpc();

      await provider.connection.confirmTransaction(transaction, "confirmed");

      // Fetch the created account
      const newAccount = await program.account.escrow.fetch(Escrow);

      const escrowBalance = await provider.connection.getBalance(
        Escrow,
        "confirmed"
      );
      console.log("Onchain unlock price:", newAccount.unlockPrice.toString());
      console.log("Amount in escrow:", escrowBalance);

      // Check whether the data onchain is equal to local 'data'
      assert(failUnlockPrice.eq(newAccount.unlockPrice));
      assert(escrowBalance > 0);
    } catch (error) {
      console.log(error);
      assert.fail(error);
    }
  });

  it("Withdraw from escrow", async () => {
    // derive escrow address
    const [Escrow] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("MICHAEL BURRY"), payer.publicKey.toBuffer()],
      program.programId
    );

    // send transaction
    const transaction = await program.methods
      .withdraw()
      .accounts({
        user: payer.publicKey,
        escrowAccount: Escrow,
        feedAggregator: solUSDSwitchboardFeed,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([payer])
      .rpc();

    await provider.connection.confirmTransaction(transaction, "confirmed");

    // assert that the escrow account has been closed
    let accountFetchDidFail = false;
    try {
      await program.account.escrow.fetch(Escrow);
      assert(accountFetchDidFail);
    } catch (error) {
      accountFetchDidFail = true;
      // console.log(error)
    }

    assert(accountFetchDidFail);
  });

  it("Create Burry Escrow Above Price", async () => {
    // fetch switchboard devnet program object
    const switchboardProgram = await SwitchboardProgram.load(
      "devnet",
      new anchor.web3.Connection("https://api.devnet.solana.com"),
      payer
    );
    const aggregatorAccount = new AggregatorAccount(
      switchboardProgram,
      solUSDSwitchboardFeed
    );

    // derive escrow account
    const [Escrow] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("MICHAEL BURRY"), payer.publicKey.toBuffer()],
      program.programId
    );
    console.log("Escrow Account: ", Escrow.toBase58());

    // fetch latest SOL price
    const solPrice: Big | null = await aggregatorAccount.fetchLatestValue();
    if (solPrice === null) {
      throw new Error("Aggregator holds no value");
    }
    const failUnlockPrice = new BN(solPrice.plus(10).toNumber());
    const amountToLockUp = new BN(100);

    // Send transaction
    try {
      const transaction = await program.methods
        .deposit(amountToLockUp, failUnlockPrice)
        .accounts({
          user: payer.publicKey,
          escrowAccount: Escrow,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([payer])
        .rpc();

      await provider.connection.confirmTransaction(transaction, "confirmed");
      console.log("Your transaction signature", transaction);

      // Fetch the created account
      const newAccount = await program.account.escrow.fetch(Escrow);

      const escrowBalance = await provider.connection.getBalance(
        Escrow,
        "confirmed"
      );
      console.log("Onchain unlock price:", newAccount.unlockPrice.toString());
      console.log("Amount in escrow:", escrowBalance);

      // Check whether the data onchain is equal to local 'data'
      assert(failUnlockPrice.eq(newAccount.unlockPrice));
      assert(escrowBalance > 0);
    } catch (error) {
      console.log(error);
      assert.fail(error);
    }
  });

  it("Attempt to withdraw while price is below UnlockPrice", async () => {
    let didFail = false;

    // derive escrow address
    const [Escrow] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("MICHAEL BURRY"), payer.publicKey.toBuffer()],
      program.programId
    );

    // send transaction
    try {
      const transaction = await program.methods
        .withdraw()
        .accounts({
          user: payer.publicKey,
          escrowAccount: Escrow,
          feedAggregator: solUSDSwitchboardFeed,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([payer])
        .rpc();

      await provider.connection.confirmTransaction(transaction, "confirmed");
      console.log("Your transaction signature", transaction);
    } catch (e) {
      // verify transaction returns expected error
      didFail = true;
      assert(
        e.error.errorMessage ==
          "Current SOL price is not above Escrow unlock price."
      );
    }

    assert(didFail);
  });
});
