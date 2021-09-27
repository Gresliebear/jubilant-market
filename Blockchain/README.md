

![Test Image 3](/jubilant-market/Blockchain/output-onlinepngtools.png)
# What is Jubilant Market? 

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


![Test Image 3](/jubilant-market/Blockchain/Slide5.png)

## How to use Jubilant Market?
You will need to set Wallet Address or Pool Address in .env of Jubilant (Config.json)
- Event to the Smart Contracts
- Front-end is for Development (Not Production)
- Python API is for passing Addresses from front-end to Smart Contracts
- Admint Login to Check Health Smart Contract Market 
- API call to monitor the health the Pool or Wallet

## In-depth Technical/Finanical Explainations 
- Described at google docs for EthGlobal https://drive.google.com/drive/folders/1wItQmyBMxhJAUvtqhIM-Jju8De8NK5Sk?usp=sharing


## Getting Started

### Install dependencies

```
$ npm install
```

### Setup Environment Variables

_This is currently not required_

```
$ mv .env.example .env
# edit any necessary variables
```

### Running the Development Node

For local development, we will leverage hardhat's `localhost` node. This node is similar to Ganache with a few exceptions. First, it only mines blocks (generates a new block) when it receives a transaction. Second, it initializes some insecure accounts and keys you can use for development. **These are deterministic and will be the same everytime you restart the node**. At the moment, the node must be run in a separate process (terminal window).

This node can be interacted with from Metamask by setting up a local network points to `http://127.0.0.1:8545`. I recommend using a dedicated `Firefox Profile` for this. **Make sure to never accidentally use the mainnet**

[https://twitter.com/3lpsy/status/1426679423730962436](https://twitter.com/3lpsy/status/1426679423730962436)

Start the node:

```
$ npx hardhat node
```

### Deploy The Contracts and InitialState

There only exists one script inside of the `scripts` directory. It's called `setupDev.js`. This script will deploy the two contracts using the first account from hardhats pre determined list of accounts.

```
Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

Run the script:

```
$ npx hardhat run scripts/setupDev.js --network localhost
```

### Basic HardHat Commands

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
