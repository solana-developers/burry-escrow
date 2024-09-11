use crate::errors::*;
use crate::state::*;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::Clock;
use std::str::FromStr;
use switchboard_v2::AggregatorAccountData;

pub fn withdraw_handler(ctx: Context<Withdraw>) -> Result<()> {
    let feed = &ctx.accounts.feed_aggregator.load()?;
    let escrow = &ctx.accounts.escrow_account;

    if !escrow.out_of_jail {
        // get result
        let val: u64 = feed.get_result()?.try_into()?;

        // check whether the feed has been updated in the last 300 seconds
        feed.check_staleness(Clock::get().unwrap().unix_timestamp, 300)
            .map_err(|_| error!(EscrowErrorCode::StaleFeed))?;

        msg!("Current feed result is {}!", val);
        msg!("Unlock price is {}", escrow.unlock_price);

        //ensure the feed value is below the unlock price
        if val < escrow.unlock_price {
            return Err(EscrowErrorCode::SolPriceAboveUnlockPrice.into());
        }
    }
    // 'Transfer: `from` must not carry data'
    **escrow.to_account_info().try_borrow_mut_lamports()? = escrow
        .to_account_info()
        .lamports()
        .checked_sub(escrow.escrow_amount)
        .ok_or(ProgramError::InvalidArgument)?;

    **ctx
        .accounts
        .user
        .to_account_info()
        .try_borrow_mut_lamports()? = ctx
        .accounts
        .user
        .to_account_info()
        .lamports()
        .checked_add(escrow.escrow_amount)
        .ok_or(ProgramError::InvalidArgument)?;

    Ok(())
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    // user account
    #[account(mut)]
    pub user: Signer<'info>,
    // escrow account
    #[account(
        mut,
        seeds = [ESCROW_SEED, user.key().as_ref()],
        bump,
        close = user
    )]
    pub escrow_account: Account<'info, Escrow>,
    // Switchboard SOL feed aggregator
    #[account(
        address = Pubkey::from_str(SOL_USDC_FEED).unwrap()
    )]
    pub feed_aggregator: AccountLoader<'info, AggregatorAccountData>,
    pub system_program: Program<'info, System>,
}
