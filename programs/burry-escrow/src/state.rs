use anchor_lang::prelude::*;

pub const ESCROW_SEED: &[u8] = b"MICHAEL BURRY";
pub const VRF_SEED: &[u8] = b"VRFCLIENT";
pub const SOL_USDC_FEED: &str = "GvDMxPzN1sCj7L26YDK2HnMRXEQmQ2aemov8YBtPS7vR";

#[account]
#[derive(InitSpace)]
pub struct Escrow {
    pub unlock_price: u64,
    pub escrow_amount: u64,
    pub out_of_jail: bool,
}

#[repr(packed)]
#[account(zero_copy(unsafe))]
#[derive(InitSpace)]
#[derive(Default)]
pub struct VrfClient {
    pub bump: u8,
    pub result_buffer: [u8; 32],
    pub dice_type: u8, // 6 sided
    pub die_result_1: u8,
    pub die_result_2: u8,
    pub timestamp: i64,
    pub vrf: Pubkey,
    pub escrow: Pubkey,
}
