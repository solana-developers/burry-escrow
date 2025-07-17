use anchor_lang::prelude::*;
use instructions::*;

pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

declare_id!("DDFpiq1hQUmXPr6RvnYw4srpRjeDzGjkVNBZdr4oNfSw");

#[program]
pub mod burry_escrow {
    use super::*;

    pub fn deposit(ctx: Context<Deposit>, args: DepositArgs) -> Result<()> {
        Deposit::handler(ctx, args)
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        Withdraw::handler(ctx)
    }

    pub fn commit_randomness(ctx: Context<CommitRandomness>) -> Result<()> {
        CommitRandomness::handler(ctx)
    }

    pub fn reveal_randomness(ctx: Context<RevealRandomness>) -> Result<()> {
        RevealRandomness::handler(ctx)
    }
}
