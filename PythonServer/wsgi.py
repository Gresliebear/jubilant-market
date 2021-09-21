from flask import Flask, request, jsonify, url_for, Blueprint, render_template, send_from_directory, current_app, session
from flask_restful import Api, Resource, reqparse, abort
from web3 import Web3
from decouple import config
from flask_cors import CORS, cross_origin

# Initilize Flask App
# Each Api call is for the functionality of the React Front 
# Or for initilizating Solidity SmartContract
app = Flask(__name__)
cors = CORS(app)
api = Api(app)

# functions
def abort_if_useraddr_doesnt_exist(userAddress):
    if userAddress not in users:
        abort(404, message=" Could not find userAddress")

def abort_if_userAddr_exists(userAddress):
    if userAddress in users:
        abort(409, message="UserAddress already exist")

# MetaMask Chain Id
# # Hex	Decimal	Network
# 0x1	1	Ethereum Main Network (Mainnet)
# 0x3	3	Ropsten Test Network
# 0x4	4	Rinkeby Test Network
# 0x5	5	Goerli Test Network
# 0x2a	42	Kovan Test Network

user_put_args = reqparse.RequestParser()
user_put_args.add_argument("userAddress", type=str, help="UserAddress Require", required=True)
user_put_args.add_argument("account_total", type=int, help="account_total Require", required=True)
user_put_args.add_argument("latest_month", type=int, help="latest_month Require", required=True)

# Data in memory
names = { 
    "tim": {"age":19, "gender":"male"},
    "bill": {"age":70, "gender":"male"}
}
# UserData
# 0x0080 is the userAddr
mockuserdata = {
    # "status": "success",
    "0x0080": 
        { 
            "userAddress": "0x0080",
            "account_total":700,
            "latest_month":9
        },
    # "message": "Successfully! All records has been fetched."
}

users = {}


# return JSON serializable objects
class JubilantMarket(Resource):
    def get(self, name, test):
        return {"name": name, "test":test}

    def post(self):
        return {"data": "Posted"}

class GetData(Resource):
    def get(self, name):
        return names[name]

class MockUserData(Resource):
    def get(self, userAddress):
        abort_if_useraddr_doesnt_exist(userAddress)
        return users[userAddress]
    
    def put(self, userAddress):
        abort_if_userAddr_exists(userAddress)
        args = user_put_args.parse_args()
        users[userAddress] = args
        return users[userAddress], 201

    def delete(self, userAddress):
        abort_if_useraddr_doesnt_exist(userAddress)
        del users[userAddress]
        return '', 204


class EMF(Resource):
    
    def get(self, userAddress):
        # check if existing account
        return mockuserdata[userAddress]
    
    def deposit(self, userAddress, action):
        return {"userAddress": userAddress, "action": action}

    def put(self, userAddress):
        return {"data":"Deposit Made!"}
    


api.add_resource(JubilantMarket, "/jubilantmarket/<string:name>/<int:test>")
api.add_resource(GetData, "/jubilantmarket/<string:name>")
api.add_resource(MockUserData, "/jubilantmarket/mockuserdata/<string:userAddress>")
api.add_resource(EMF, "/jubilantmarket/EMF/<string:userAddress>/<string:action>")



# Emergency Medical Fund Call 
#  Start Smart Contract
    
    # User Depoists function call (Solidity)
        # Parameters
        # pass username, user's address, amount of money depoisted from "wallet or bank acct"
            # Users's Address Wallet to EMF Wallet Block
            # DepoistToEMF(solidity function)
        # return statements 
            # 


    # OpenVessel deposit function call from user to Stake Pool 
        # Parameters 
        # 
        # EMF Wallet Block hits limit to deposit into Stake Pool Addresss 



# # Calling Solidity Code
# contract_id, contract_interface = compile()
# API_USERNAME = config('HOME')
# INFURA = config('PROID')
# API_KEY = config('WEB3_INFURA_API_SECRET')
# CORE_ACCOUNT = config('BUSINESSACCOUNT')
# bytecode = contract_interface['bin']
# abi = contract_interface['abi']


# # flask endpoint will be used as "API" we send Web request to trigger contract lock and transactions
# @app.route('/') #flask instance app fun() route
# def index(): #view functions
#         # pip install web3[tester]
#         # ERROR: Failed building wheel for pyethash

#     return 'passObj'

# #  http://127.0.0.1:5000/

# #  50.62.1.164:8000
# # /api/uploadCall routes web request
# # endpoint
# @app.route('/uploadCall', methods=['POST', 'GET']) #flask instance app fun() route
# def UploadCall(): 
#     trigger = False
#     # backend validation    
#     print(request.remote_addr)
#     print(request.method)
#     NewObj = request.json
#     if request.method == 'POST':
#         # jsonObj = NewObj['imageData']
#         # print(jsonObj)
#         print("upload to database")
#         trigger = True

#         if trigger == True:
#             responsPayLoad = {
#                 "message":"Upload successful",
                
#             }
            
#             return jsonify(responsPayLoad), 200

#         if trigger == False:
#             responsPayLoad = {
#                 "message":"Upload Failed",
                
#             }
            
#             return jsonify(responsPayLoad), 200

if __name__ == "__main__":
    app.run(debug=True)