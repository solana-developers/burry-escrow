import { AnchorProvider, BN, Program, Wallet } from "@coral-xyz/anchor";
import { BurryEscrow } from "../target/types/burry_escrow";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import idl from "../target/idl/burry_escrow.json";
import onDemandIdl from "./fixtures/sb_on_demand.json";
import { PullFeed } from "@switchboard-xyz/on-demand";
import { BASE_FEE, FUNDED_KEYPAIR, PULL_FEED_PRECISION } from "./constants";
import { SbOnDemand } from "./fixtures/sb_on_demand";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const provider = new AnchorProvider(connection, new Wallet(FUNDED_KEYPAIR));
const program = new Program<BurryEscrow>(idl, provider);
const onDemandProgram = new Program<SbOnDemand>(onDemandIdl, provider);

export function getSetup() {
  return { program, onDemandProgram };
}

export async function fundKeypair(
  pubkey: PublicKey,
  lamports: number = LAMPORTS_PER_SOL / 10,
) {
  const ix = SystemProgram.transfer({
    fromPubkey: FUNDED_KEYPAIR.publicKey,
    toPubkey: pubkey,
    lamports,
  });
  const tx = new Transaction().add(ix);
  tx.feePayer = FUNDED_KEYPAIR.publicKey;
  const signature = await connection.sendTransaction(tx, [FUNDED_KEYPAIR]);
  await connection.confirmTransaction(signature);
}

export async function defundKeypair(keypair: Keypair) {
  const remainingBal = await connection.getBalance(keypair.publicKey);

  const ix = SystemProgram.transfer({
    fromPubkey: keypair.publicKey,
    toPubkey: FUNDED_KEYPAIR.publicKey,
    lamports: remainingBal - BASE_FEE,
  });
  const tx = new Transaction().add(ix);
  tx.feePayer = keypair.publicKey;
  const signature = await connection.sendTransaction(tx, [keypair]);
  await connection.confirmTransaction(signature);
}

export async function fetchPullFeedValue(pullFeed: PullFeed): Promise<number> {
  const pullFeedAcc = await pullFeed.loadData();
  const divideOverRounds = 2;
  const divExp = PULL_FEED_PRECISION / divideOverRounds;
  return pullFeedAcc.result.value
    .div(new BN(10 ** divExp))
    .div(new BN(10 ** divExp))
    .toNumber();
}
