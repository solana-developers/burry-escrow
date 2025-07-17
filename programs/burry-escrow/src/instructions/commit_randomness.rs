use anchor_lang::prelude::*;
use switchboard_on_demand::RandomnessAccountData;

use crate::{constants::ESCROW_SEED, errors::BurryError, state::Escrow};

#[derive(Accounts)]
pub struct CommitRandomness<'info> {
    pub user: Signer<'info>,
    #[account(
        mut,
        seeds = [ESCROW_SEED, user.key().as_ref()],
        bump = escrow.bump,
    )]
    pub escrow: Account<'info, Escrow>,
    /// CHECK: RandomnessAccountData
    pub randomness: UncheckedAccount<'info>,
}

impl CommitRandomness<'_> {
    pub fn handler(ctx: Context<CommitRandomness>) -> Result<()> {
        let randomness =
            RandomnessAccountData::parse(ctx.accounts.randomness.data.borrow()).unwrap();

        require_eq!(
            randomness.seed_slot,
            Clock::get()?.slot - 1,
            BurryError::RandomessAlreadyRevealed
        );

        let escrow = &mut ctx.accounts.escrow;

        escrow.randomness = ctx.accounts.randomness.key();
        escrow.seed_slot = randomness.seed_slot;

        Ok(())
    }
}
