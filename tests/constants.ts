import { Keypair, PublicKey } from "@solana/web3.js";

export const FUNDED_KEYPAIR = Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(process.env.ANCHOR_WALLET)),
);
export const SOL_USD_FEED = new PublicKey(
  "5mXfTYitRFsWPhdJfp2fc8N6hK8cw6NB5jAYpronQasj",
);
export const PULL_FEED_PRECISION = 18;
export const BASE_FEE = 5000;
