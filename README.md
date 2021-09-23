# jubilant-market

Insurance Smart Contracts

## Docs

### Contracts

- AppContract
  - Manages state
  - Tracks deposits
- StakingManagerContract
  - AaveStaker[]
  - UniStaker[]
  - CardanoShim[]

To reduce impermanent loss, stake in pairs that are likely to move together.

From the Eth contract, prove / ask is x user's funds in y stake pool?

- Would need oracle or interchain comms
- alternative BYO cross-chain oracle

### A User will Deposit to EMF

- Assumption: user is "logged in" (tied to account to an address)
- A user does it directly (deposits to AppContract)
  - AppContract records their deposit
  - that contract will track user's deposited info / maybe where the stuff went
- Then submits to the API the transaction information (tx number)...
  - Does the address that deposited match that user
- return policy/info | deposit info

Through the API:

- Sign the transaction locally
- Submit signed transaction
- We submit it on their behalf
