
# Jubilant Market
![output-onlinepngtools](https://user-images.githubusercontent.com/13157730/134841588-53ff3df5-73f8-4af0-ad2d-35215982b648.png)

## What is Jubilant Market? 

Jubilant Market is a set of Smart contract to be used by insurance companies, or DAO insurance. For this project we will provide a use case for HealthCare Insurance purely provided through blockchains. 

Muilt-Signed Wallet is required for the Smart Contract Deployment to access ability to interact with Stake Pools, Liquidity Pools, and AAVE borrow. 
- Deposit Funds into Stake Pools Insurer
- Withdraw Funds Out of Insurer's Pool
- Take Loans Out for Insuree
- Pay Loans Taken on by the Insurer

The functionality of Jubilent Market Brings together three parties
- **Insuree**   (Customer, User) -> Smart Contract EMF or Insurance Coverage
- **Insurer**   (Company, DAO) -> Deploying Juilibant Market as a Pool or Wallet.
- **Delegates** (Crypto traders, Investors) -> Contrubitions

**Techical Details:**

The Jubilent Market project uilitzes the Hardhat framework & templates to test, 
deployed Smart Contracts. Front-end is created in react, Back-end api built in flask_rest.py API to access Web3.py functionality to initialize Smart Contracts Outline below.


![Slide5](https://user-images.githubusercontent.com/13157730/134841600-09e22967-ccc3-48fa-893f-3ee672a56344.png)

## How to use Jubilant Market?
You will need to set Wallet Address or Pool Address in .env of Jubilant (Config.json)
- Event to the Smart Contracts
- Front-end is for Development (Not Production)
- Python API is for passing Addresses from front-end to Smart Contracts
- Admint Login to Check Health Smart Contract Market 
- API call to monitor the health of the Pool or Wallet

## In-depth Technical/Finanical Explainations 
- Described at google docs for EthGlobal https://drive.google.com/drive/folders/1wItQmyBMxhJAUvtqhIM-Jju8De8NK5Sk?usp=sharing

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

### To DO list Les
- refactor Front-end code 
  - Deposit components
  - Withdraw components
  - AmountHandlers
  - PythonServer wsgi Refactor completely
- Connect Web.py to Solidity EMF.sol 

- Create EMF contract 
  - test unit test EMF
  - EMF deployed on testnet
  - test infor feed to PythonServer
