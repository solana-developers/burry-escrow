use anchor_lang::prelude::*;
use switchboard_on_demand::{
    prelude::rust_decimal::{prelude::FromPrimitive, Decimal},
    PullFeedAccountData,
};

use crate::{
    constants::{ESCROW_SEED, SOL_USD_FEED},
    errors::BurryError,
    state::Escrow,
};

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut,
        close = user,
        seeds = [ESCROW_SEED, user.key().as_ref()],
        bump = escrow.bump,
    )]
    pub escrow: Account<'info, Escrow>,
    /// CHECK: PullFeedAccountData
    #[account(address = SOL_USD_FEED @ BurryError::InvalidPullFeed)]
    pub pull_feed: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}

impl Withdraw<'_> {
    pub fn handler(ctx: Context<Withdraw>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;

        if !escrow.out_of_jail {
            let pull_feed =
                PullFeedAccountData::parse(ctx.accounts.pull_feed.data.borrow()).unwrap();

            let current_sol_price = pull_feed.value(&Clock::get()?).unwrap();

            require_gte!(
                current_sol_price,
                Decimal::from_f64(escrow.unlock_price).unwrap(),
                BurryError::SolPriceBelowUnlockPrice
            );
        }

        **escrow.to_account_info().try_borrow_mut_lamports()? -= escrow.escrow_amount;
        **ctx
            .accounts
            .user
            .to_account_info()
            .try_borrow_mut_lamports()? += escrow.escrow_amount;

        Ok(())
    }
}
