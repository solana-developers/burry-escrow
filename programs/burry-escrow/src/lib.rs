use anchor_lang::prelude::*;
use instructions::{deposit::*, withdraw::*};

pub mod errors;
pub mod instructions;
pub mod state;
pub mod constants;

declare_id!("DDFpiq1hQUmXPr6RvnYw4srpRjeDzGjkVNBZdr4oNfSw");

#[program]
pub mod burry_escrow {
    use super::*;

    pub fn deposit(ctx: Context<Deposit>, escrow_amount: u64, unlock_price: f64) -> Result<()> {
        deposit_handler(ctx, escrow_amount, unlock_price)
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        withdraw_handler(ctx)
    }
}
