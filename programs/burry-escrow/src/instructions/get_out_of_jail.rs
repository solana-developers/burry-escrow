use crate::errors::*;
use crate::state::*;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::sysvar::*;
use anchor_spl::token::{Token, TokenAccount};
use switchboard_v2::{
    OracleQueueAccountData, PermissionAccountData, SbState, VrfAccountData, VrfRequestRandomness,
};

#[derive(Accounts)]
pub struct RequestRandomness<'info> {
    // PAYER ACCOUNTS
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut,
        constraint =
            payer_wallet.owner == user.key()
            && switchboard_escrow.mint == program_state.load()?.token_mint
    )]
    pub payer_wallet: Account<'info, TokenAccount>,
    // burry escrow account
    #[account(
        mut,
        seeds = [ESCROW_SEED, user.key().as_ref()],
        bump,
    )]
    pub escrow_account: Account<'info, Escrow>,
    // vrf client state
    #[account(
        mut,
        seeds = [
            VRF_SEED,
            user.key.as_ref(),
            escrow_account.key().as_ref(),
            vrf.key().as_ref(),
        ],
        bump
    )]
    pub vrf_state: AccountLoader<'info, VrfClient>,
    // switchboard vrf account
    #[account(
        mut,
        constraint = vrf.load()?.authority == vrf_state.key() @ EscrowErrorCode::InvalidVrfAuthorityError
    )]
    pub vrf: AccountLoader<'info, VrfAccountData>,
    // switchboard accounts
    #[account(mut,
        has_one = data_buffer
    )]
    pub oracle_queue: AccountLoader<'info, OracleQueueAccountData>,
    /// CHECK:
    #[account(
        mut,
        constraint = oracle_queue.load()?.authority == queue_authority.key()
    )]
    pub queue_authority: UncheckedAccount<'info>,
    /// CHECK
    #[account(mut)]
    pub data_buffer: AccountInfo<'info>,
    #[account(mut)]
    pub permission: AccountLoader<'info, PermissionAccountData>,
    #[account(mut,
        constraint = switchboard_escrow.owner == program_state.key() && switchboard_escrow.mint == program_state.load()?.token_mint
    )]
    pub switchboard_escrow: Account<'info, TokenAccount>,
    #[account(mut)]
    pub program_state: AccountLoader<'info, SbState>,
    /// CHECK:
    #[account(
        address = *vrf.to_account_info().owner,
        constraint = switchboard_program.executable == true
    )]
    pub switchboard_program: AccountInfo<'info>,
    // SYSTEM ACCOUNTS
    /// CHECK:
    #[account(address = recent_blockhashes::ID)]
    pub recent_blockhashes: AccountInfo<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct RequestRandomnessParams {
    pub permission_bump: u8,
    pub switchboard_state_bump: u8,
}

pub fn get_out_of_jail_handler(
    ctx: Context<RequestRandomness>,
    params: RequestRandomnessParams,
) -> Result<()> {
    let switchboard_program = ctx.accounts.switchboard_program.to_account_info();
    let vrf_state = ctx.accounts.vrf_state.load()?;

    let bump = vrf_state.bump.clone();
    drop(vrf_state);

    // build vrf request struct from the Switchboard Rust crate
    let vrf_request_randomness = VrfRequestRandomness {
        authority: ctx.accounts.vrf_state.to_account_info(),
        vrf: ctx.accounts.vrf.to_account_info(),
        oracle_queue: ctx.accounts.oracle_queue.to_account_info(),
        queue_authority: ctx.accounts.queue_authority.to_account_info(),
        data_buffer: ctx.accounts.data_buffer.to_account_info(),
        permission: ctx.accounts.permission.to_account_info(),
        escrow: ctx.accounts.switchboard_escrow.clone(),
        payer_wallet: ctx.accounts.payer_wallet.clone(),
        payer_authority: ctx.accounts.user.to_account_info(),
        recent_blockhashes: ctx.accounts.recent_blockhashes.to_account_info(),
        program_state: ctx.accounts.program_state.to_account_info(),
        token_program: ctx.accounts.token_program.to_account_info(),
    };

    let vrf_key = ctx.accounts.vrf.key();
    let escrow_key = ctx.accounts.escrow_account.key();
    let user_key = ctx.accounts.user.key();
    let state_seeds: &[&[&[u8]]] = &[&[
        &VRF_SEED,
        user_key.as_ref(),
        escrow_key.as_ref(),
        vrf_key.as_ref(),
        &[bump],
    ]];

    // submit vrf request with PDA signature
    msg!("requesting randomness");
    vrf_request_randomness.invoke_signed(
        switchboard_program,
        params.switchboard_state_bump,
        params.permission_bump,
        state_seeds,
    )?;

    msg!("randomness requested successfully");

    Ok(())
}
