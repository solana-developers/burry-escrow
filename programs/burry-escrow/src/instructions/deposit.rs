use anchor_lang::{
    prelude::*,
    system_program::{transfer, Transfer},
};

use crate::{constants::ESCROW_SEED, state::Escrow};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct DepositArgs {
    pub unlock_price: f64,
    pub escrow_amount: u64,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        init,
        payer = user,
        space = Escrow::DISCRIMINATOR.len() + Escrow::INIT_SPACE,
        seeds = [ESCROW_SEED, user.key().as_ref()],
        bump,
    )]
    pub escrow: Account<'info, Escrow>,
    pub system_program: Program<'info, System>,
}

impl Deposit<'_> {
    pub fn handler(ctx: Context<Deposit>, args: DepositArgs) -> Result<()> {
        let DepositArgs {
            unlock_price,
            escrow_amount,
        } = args;

        ctx.accounts.escrow.set_inner(Escrow {
            bump: ctx.bumps.escrow,
            unlock_price,
            escrow_amount,
            out_of_jail: false,
            randomness: Pubkey::default(),
            seed_slot: u64::default(),
        });

        transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.user.to_account_info(),
                    to: ctx.accounts.escrow.to_account_info(),
                },
            ),
            escrow_amount,
        )
    }
}
