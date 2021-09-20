from flask import Flask,  request, jsonify, url_for, Blueprint, render_template, send_from_directory, current_app, session
from web3 import Web3
from decouple import config
from ComplieSolToPython import compile
app = Flask(__name__)

contract_id, contract_interface = compile()
API_USERNAME = config('HOME')
INFURA = config('PROID')
API_KEY = config('WEB3_INFURA_API_SECRET')
CORE_ACCOUNT = config('BUSINESSACCOUNT')
bytecode = contract_interface['bin']
abi = contract_interface['abi']


# flask endpoint will be used as "API" we send Web request to trigger contract lock and transactions
@app.route('/') #flask instance app fun() route
def index(): #view functions
        # pip install web3[tester]
        # ERROR: Failed building wheel for pyethash
    dataDict = { 
        "test":"Hello World"
    }
    url = 'https://mainnet.infura.io/v3/' + INFURA
    
    # Provider Infura
    # production uirl
    # Infura, which doesn't support eth_sendTransaction
    # w3 = Web3(Web3.HTTPProvider(url))

    # Geth attempt web3
    w3 = Web3(Web3.HTTPProvider('http://192.1.168.162:8545'))

    print("is connected", w3.isConnected())
    #  default from address for all transactions.
    w3.eth.default_account = CORE_ACCOUNT
    CheckgasPrice = w3.fromWei(w3.eth.gas_price , 'ether') 
    print("Ether", CheckgasPrice)
    print("known accounts", w3.eth.accounts)
    
    totalfund = w3.eth.get_balance(CORE_ACCOUNT)
    totalfund = w3.fromWei(totalfund,'ether')
    # correct 0.0126
    print("Total funds",totalfund)

    
    # pip install eth-tester
    # https://github.com/ethereum/eth-tester
    # w3 = Web3(Web3.EthereumTesterProvider())

    print(w3.eth.block_number)
    print(w3.clientVersion)
    
    # Returns either False if the node 
    # is not syncing or a dictionary showing sync status.
    print("syncing" ,w3.eth.syncing)
    # print("coinbase", w3.eth.coinbase)

    condition = w3.isConnected()
    latestBlock = str(w3.eth.get_block('latest'))
    dataDict = { 
        "test":"Hello World",
        "Web3 Connect?":condition,
        "latest block": latestBlock
    }

    # Sign a Transaction
    transaction = {
        'to': '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
        'value': 1000000000,
        'gas': 2000000,
        'gasPrice': 234567897654321,
        'nonce': 0,
        'chainId': 1
    }

    # key = API_KEY
    # # PrivateKey from wallet https://gnosis-safe.io/
    # # https://gnosis-safe.io/app/#/welcome
    # signed = w3.eth.account.sign_transaction(transaction, key)
    # print(signed.rawTransaction)
    # print(signed.hash)
    # print(signed.r)
    # print(signed.s)
    # # When you run send_raw_transaction, you get back the hash of the transaction:
    # print(w3.eth.send_raw_transaction(signed.rawTransaction))
    
    print("abi", abi)
    # print("bytecode", bytecode)
    # Contract provides a default interface for deploying and interacting with Ethereum smart contracts.
    Greeter = w3.eth.contract(abi=abi, bytecode=bytecode)
    print(Greeter.address)
# TypeError: estimate_gas() takes 2 positional arguments but 3 were given
    
    # ValueError: {'code': -32601, 'message': 
    # 'The method eth_sendTransaction does not exist/is not available'}
    tx_hash = Greeter.constructor().transact()
    # infrua doesnt support this method 
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    

    greeter = w3.eth.contract(
        address=tx_receipt.contractAddress,
        abi=abi
    )

    greeter.functions.greet().call()

    tx_hash = greeter.functions.setGreeting('Nihao').transact()
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    greeter.functions.greet().call()
# Proxy Contracts
# Address and ABIs
# AAVE token 0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9
    # aave is accsible by user
        # deposit
        # withdraw
        # borrow 
    # https://www.quicknode.com/guides/defi/how-to-make-a-flash-loan-using-aave
    # MainEntry Point to Aave
    # is LendingPool
    # deposit, borrow, withdraw and repayare only for ERC20
    # WETHGateway for polygon

    # so to interact go calls actions you must have allowance() to spend funds on behalf of msg.sender for at-least amount for the asset being asst

    passObj = jsonify(dataDict)
    return passObj
