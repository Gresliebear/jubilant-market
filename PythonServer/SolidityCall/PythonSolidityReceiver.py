# Notes for Solidty 

# Simple Smart Contact 
# https://www.youtube.com/watch?v=QfFO22lwSw4
# https://github.com/smartcontractkit/chainlink-mix
# Web3.py 
from web3 import Web3 
import os 

# SET WEB3_INFURA_PROJECT_ID
# SET WEB3_PROVIDER_HTTPS and WEB3_PROVIDER_WSS 
# Set USE_LOCAL_RPC
Web3 = Web3(Web3.HTTPProvider( os.getenv('RPC_URL')))
# Infura 
abi = '[{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'

# contract
# abi get abi from interface


address = ''
contract = web3.eth.contract(address=address, abi=abi)

latestData = contract.functions.latestRoundData().call()
print(latestData)