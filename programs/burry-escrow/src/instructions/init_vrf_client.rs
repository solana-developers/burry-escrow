use crate::errors::*;
use crate::state::*;
use anchor_lang::prelude::*;
use switchboard_solana::VrfAccountData;

pub const ANCHOR_DISCRIMINATOR: usize = 8;

#[derive(Accounts)]
pub struct InitVrfClient<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    // burry escrow account
    #[account(
        mut,
        seeds = [ESCROW_SEED, user.key().as_ref()],
        bump,
    )]
    pub escrow_account: Account<'info, Escrow>,
    // vrf client state
    #[account(
        init,
        seeds = [
            VRF_SEED,
            user.key.as_ref(),
            escrow_account.key().as_ref(),
            vrf.key().as_ref(),
        ],
        bump,
        payer = user,
        space = VrfClient::INIT_SPACE + ANCHOR_DISCRIMINATOR,
    )]
    pub vrf_state: AccountLoader<'info, VrfClient>,

    // switchboard vrf account
    #[account(
        mut,
        constraint = vrf.load()?.authority == vrf_state.key() @ EscrowErrorCode::InvalidVrfAuthorityError
    )]
    pub vrf: AccountLoader<'info, VrfAccountData>,
    pub system_program: Program<'info, System>,
}

pub fn init_vrf_client_handler(ctx: Context<InitVrfClient>) -> Result<()> {
    msg!("init_client validate");

    let mut vrf_state = ctx.accounts.vrf_state.load_init()?;
    *vrf_state = VrfClient::default();
    vrf_state.bump = ctx.bumps.get("vrf_state").unwrap().clone();
    vrf_state.vrf = ctx.accounts.vrf.key();
    vrf_state.escrow = ctx.accounts.escrow_account.key();
    vrf_state.die_result_1 = 0;
    vrf_state.die_result_2 = 0;
    // SOLUTION EDIT: Initalized roll count
    vrf_state.roll_count = 0;
    vrf_state.timestamp = 0;
    vrf_state.dice_type = 6; // sided

    Ok(())
}
