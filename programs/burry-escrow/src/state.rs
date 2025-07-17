use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Escrow {
    pub bump: u8,
    pub unlock_price: f64,
    pub escrow_amount: u64,
    pub out_of_jail: bool,
    pub randomness: Pubkey,
    pub seed_slot: u64,
}
