use crate::constants::*;
use crate::state::*;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction::transfer};

pub fn deposit_handler(ctx: Context<Deposit>, escrow_amount: u64, unlock_price: f64) -> Result<()> {
    msg!("Depositing funds in escrow...");

    let escrow = &mut ctx.accounts.escrow_account;
    escrow.unlock_price = unlock_price;
    escrow.escrow_amount = escrow_amount;

    let transfer_instruction =
        transfer(&ctx.accounts.user.key(), &escrow.key(), escrow_amount);

    invoke(
        &transfer_instruction,
        &[
            ctx.accounts.user.to_account_info(),
            ctx.accounts.escrow_account.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
    )?;

    msg!(
        "Transfer complete. Escrow will unlock SOL at {}",
        &ctx.accounts.escrow_account.unlock_price
    );

    Ok(())
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        seeds = [ESCROW_SEED, user.key().as_ref()],
        bump,
        payer = user,
        space = DISCRIMINATOR_SIZE + Escrow::INIT_SPACE
    )]
    pub escrow_account: Account<'info, Escrow>,

    pub system_program: Program<'info, System>,
}
