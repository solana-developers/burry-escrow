use anchor_lang::prelude::*;

#[error_code]
#[derive(Eq, PartialEq)]
pub enum BurryError {
    #[msg("Pull feed must be SOL-USDC")]
    InvalidPullFeed,
    #[msg("Current SOL price is not above unlock price")]
    SolPriceBelowUnlockPrice,
    #[msg("Randomness already revealed")]
    RandomessAlreadyRevealed,
    #[msg("Randomness seed slot is not the same as the one in escrow account")]
    RandomnessExpired,
    #[msg("Randomness account is not the same as the one in escrow account")]
    InvalidRandomness,
}
