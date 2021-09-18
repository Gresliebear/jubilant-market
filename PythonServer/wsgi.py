from flask import Flask,  request, jsonify, url_for, Blueprint, render_template, send_from_directory, current_app, session
from web3 import Web3
from decouple import config
from ComplieSolToPython import compile
app = Flask(__name__)

contract_id, contract_interface = compile()
API_USERNAME = config('HOME')
INFURA = config('PROID')
bytecode = contract_interface['bin']
abi = contract_interface['abi']


# flask endpoint will be used as "API" we send Web request to trigger contract lock and transactions
@app.route('/') #flask instance app fun() route
def index(): #view functions
    print(web3.clientVersion)
    dataDict = { 
        "test":"Hello World"
    }
    url = 'https://mainnet.infura.io/v3/' + INFURA
    # Provider Infura
    w3 = Web3(Web3.HTTPProvider(url))

    print(w3.isConnected())
    condition = w3.isConnected()
    latestBlock = str(w3.eth.get_block('latest'))
    dataDict = { 
        "test":"Hello World",
        "Web3 Connect?":condition,
        "latest block": latestBlock
    }

    w3 = Web3(Web3.EthereumTesterProvider())

    ContractObject = w3.eth.contract(abi=abi, bytecode=bytecode)
    tx_hash = ContractObject .constructor().transact()
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
