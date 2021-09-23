# About

The contracts necessary to support the JubilentMarket project, initialized from the the sample Hardhat template.

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
