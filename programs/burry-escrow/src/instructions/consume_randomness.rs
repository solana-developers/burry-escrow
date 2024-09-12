use crate::errors::*;
use crate::state::*;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::Clock;
use switchboard_solana::VrfAccountData;
#[derive(Accounts)]
pub struct ConsumeRandomness<'info> {
    // burry escrow account
    #[account(mut)]
    pub escrow_account: Account<'info, Escrow>,
    // vrf client state
    #[account(mut)]
    pub vrf_state: AccountLoader<'info, VrfClient>,
    // switchboard vrf account
    #[account(
        mut,
        constraint = vrf.load()?.authority == vrf_state.key() @ EscrowErrorCode::InvalidVrfAuthorityError
    )]
    pub vrf: AccountLoader<'info, VrfAccountData>,
}

pub fn consume_randomness_handler(ctx: Context<ConsumeRandomness>) -> Result<()> {
    msg!("Successfully consumed randomness.");

    let vrf = ctx.accounts.vrf.load()?;
    let result_buffer = vrf.get_result()?;

    if result_buffer == [0u8; 32] {
        msg!("vrf buffer empty");
        return Ok(());
    }

    let vrf_state = &mut ctx.accounts.vrf_state.load_mut()?;
    let dice_type = vrf_state.dice_type;
    if result_buffer == vrf_state.result_buffer {
        msg!("result_buffer unchanged");
        return Ok(());
    }

    msg!("Result buffer is {:?}", result_buffer);

    let dice_1 = result_buffer[0] % dice_type + 1;
    let dice_2 = result_buffer[1] % dice_type + 1;

    msg!("Current Die 1 Value [1 - {}) = {}!", dice_type, dice_1);
    msg!("Current Die 2 Value [1 - {}) = {}!", dice_type, dice_2);

    msg!("Updating VRF State with random value...");
    vrf_state.result_buffer = result_buffer;
    vrf_state.die_result_1 = dice_1;
    vrf_state.die_result_2 = dice_2;
    vrf_state.timestamp = Clock::get().unwrap().unix_timestamp;

    if dice_1 == dice_2 {
        msg!("Rolled doubles, get out of jail free!");
        let escrow = &mut ctx.accounts.escrow_account;
        escrow.out_of_jail = true;
    }

    Ok(())
}
