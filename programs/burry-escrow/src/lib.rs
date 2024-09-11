use anchor_lang::prelude::*;
use instructions::deposit::*;
use instructions::withdraw::*;


pub mod errors;
pub mod instructions;
pub mod state;

declare_id!("3V8LV4FgZCJY6qpRp8XpLGbhdJW9pWLHyXpTs6PRfqzE");

#[program]
pub mod burry_escrow {
    use super::*;

    pub fn deposit(ctx: Context<Deposit>, escrow_amount: u64, unlock_price: u64) -> Result<()> {
        deposit_handler(ctx, escrow_amount, unlock_price)
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        withdraw_handler(ctx)
    }
}
