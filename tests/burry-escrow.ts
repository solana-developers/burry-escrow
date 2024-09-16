import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorError } from "@coral-xyz/anchor";
import { BurryEscrow } from "../target/types/burry_escrow";
import { Big } from "@switchboard-xyz/common";
import {
  AggregatorAccount,
  AnchorWallet,
  SwitchboardProgram,
} from "@switchboard-xyz/solana.js";
import { PublicKey, SystemProgram, Connection } from "@solana/web3.js";
import { assert, expect } from "chai";
import {
  getExplorerLink,
  confirmTransaction,
} from "@solana-developers/helpers";

const SOL_USD_SWITCHBOARD_FEED = new PublicKey(
  "GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR"
);

const ESCROW_SEED = "MICHAEL BURRY";
const DEVNET_RPC_URL = "https://api.devnet.solana.com";
const CONFIRMATION_COMMITMENT = "confirmed";
const PRICE_OFFSET = 10;
const ESCROW_AMOUNT = new anchor.BN(100);
const EXPECTED_ERROR_MESSAGE =
  "Current SOL price is not above Escrow unlock price.";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.BurryEscrow as Program<BurryEscrow>;
const payer = (provider.wallet as AnchorWallet).payer;

describe("burry-escrow", () => {
  let switchboardProgram: SwitchboardProgram;
  let aggregatorAccount: AggregatorAccount;

  before(async () => {
    switchboardProgram = await SwitchboardProgram.load(
      new Connection(DEVNET_RPC_URL),
      payer
    );
    aggregatorAccount = new AggregatorAccount(
      switchboardProgram,
      SOL_USD_SWITCHBOARD_FEED
    );
  });

  const createAndVerifyEscrow = async (unlockPrice: number) => {
    const [escrow] = PublicKey.findProgramAddressSync(
      [Buffer.from(ESCROW_SEED), payer.publicKey.toBuffer()],
      program.programId
    );

    try {
      const transaction = await program.methods
        .deposit(ESCROW_AMOUNT, unlockPrice)
        .accountsPartial({
          user: payer.publicKey,
          escrowAccount: escrow,
          systemProgram: SystemProgram.programId,
        })
        .signers([payer])
        .rpc();

      await confirmTransaction(
        provider.connection,
        transaction,
        CONFIRMATION_COMMITMENT
      );

      const escrowAccount = await program.account.escrow.fetch(escrow);
      const escrowBalance = await provider.connection.getBalance(
        escrow,
        CONFIRMATION_COMMITMENT
      );

      console.log("Onchain unlock price:", escrowAccount.unlockPrice);
      console.log("Amount in escrow:", escrowBalance);

      assert(unlockPrice === escrowAccount.unlockPrice);
      assert(escrowBalance > 0);

      console.log(
        "Transaction Explorer Link:",
        getExplorerLink("transaction", transaction, "devnet")
      );
    } catch (error) {
      console.error("Error details:", error);
      throw new Error(`Failed to create escrow: ${error.message}`);
    }
  };

  it("creates Burry Escrow Below Current Price", async () => {
    const solPrice: Big | null = await aggregatorAccount.fetchLatestValue();
    if (solPrice === null) {
      throw new Error("Aggregator holds no value");
    }
    const unlockPrice = solPrice.minus(PRICE_OFFSET).toNumber();

    await createAndVerifyEscrow(unlockPrice);
  });

  it("withdraws from escrow", async () => {
    const [escrow] = PublicKey.findProgramAddressSync(
      [Buffer.from(ESCROW_SEED), payer.publicKey.toBuffer()],
      program.programId
    );

    try {
      const transaction = await program.methods
        .withdraw()
        .accountsPartial({
          user: payer.publicKey,
          escrowAccount: escrow,
          feedAggregator: SOL_USD_SWITCHBOARD_FEED,
          systemProgram: SystemProgram.programId,
        })
        .signers([payer])
        .rpc();

      await confirmTransaction(
        provider.connection,
        transaction,
        CONFIRMATION_COMMITMENT
      );

      try {
        await program.account.escrow.fetch(escrow);
        assert.fail("Escrow account should have been closed");
      } catch (error) {
        // Expected error, account should be closed
      }

      console.log(
        "Transaction Explorer Link:",
        getExplorerLink("transaction", transaction, "devnet")
      );
    } catch (error) {
      throw new Error(`Failed to withdraw from escrow: ${error.message}`);
    }
  });

  it("creates Burry Escrow Above Current Price", async () => {
    const solPrice: Big | null = await aggregatorAccount.fetchLatestValue();
    if (solPrice === null) {
      throw new Error("Aggregator holds no value");
    }
    const unlockPrice = solPrice.plus(PRICE_OFFSET).toNumber();
    await createAndVerifyEscrow(unlockPrice);
  });

  it("fails to withdraw while price is below UnlockPrice", async () => {
    const [escrow] = PublicKey.findProgramAddressSync(
      [Buffer.from(ESCROW_SEED), payer.publicKey.toBuffer()],
      program.programId
    );

    try {
      await program.methods
        .withdraw()
        .accountsPartial({
          user: payer.publicKey,
          escrowAccount: escrow,
          feedAggregator: SOL_USD_SWITCHBOARD_FEED,
          systemProgram: SystemProgram.programId,
        })
        .signers([payer])
        .rpc();

      assert.fail("Withdrawal should have failed");
    } catch (error) {
      console.log(error.message);
      if (error instanceof AnchorError) {
        assert.include(error.message, EXPECTED_ERROR_MESSAGE);
      } else if (error instanceof Error) {
        assert.include(error.message, EXPECTED_ERROR_MESSAGE);
      } else {
        throw new Error(`Unexpected error type: ${error}`);
      }
    }
  });
});
