import { PublicKey } from "@solana/web3.js";
import idl from "../target/idl/burry_escrow.json";

const BURRY_ESCROW_PROGRAM_ID = new PublicKey(idl.address);

export function getEscrowPdaAndBump(authority: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("escrow"), authority.toBuffer()],
    BURRY_ESCROW_PROGRAM_ID,
  );
}
