use anchor_lang::prelude::*;
use switchboard_on_demand::RandomnessAccountData;

use crate::{constants::ESCROW_SEED, errors::BurryError, state::Escrow};

#[derive(Accounts)]
pub struct RevealRandomness<'info> {
    pub user: Signer<'info>,
    #[account(
        mut,
        seeds = [ESCROW_SEED, user.key().as_ref()],
        bump = escrow.bump,
        has_one = randomness @ BurryError::InvalidRandomness,
    )]
    pub escrow: Account<'info, Escrow>,
    /// CHECK: RandomnessAccountData
    pub randomness: UncheckedAccount<'info>,
}

impl RevealRandomness<'_> {
    pub fn handler(ctx: Context<RevealRandomness>) -> Result<()> {
        let randomness =
            RandomnessAccountData::parse(ctx.accounts.randomness.data.borrow()).unwrap();

        require_eq!(
            randomness.seed_slot,
            ctx.accounts.escrow.seed_slot,
            BurryError::RandomnessExpired
        );

        let value = randomness.get_value(&Clock::get()?).unwrap();

        let dice_type: u8 = 6;
        let dice_1 = value[0] % dice_type + 1;
        let dice_2 = value[1] % dice_type + 1;

        if dice_1 == dice_2 {
            ctx.accounts.escrow.out_of_jail = true;
        }

        Ok(())
    }
}
