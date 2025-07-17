import { PublicKey } from "@solana/web3.js";
import { BurryEscrow } from "../target/types/burry_escrow";
import { Program } from "@coral-xyz/anchor";

export async function fetchEscrowAcc(
  program: Program<BurryEscrow>,
  escrowPda: PublicKey,
) {
  return await program.account.escrow.fetchNullable(escrowPda);
}
