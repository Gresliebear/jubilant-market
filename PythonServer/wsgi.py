from flask import Flask, request, jsonify, url_for, Blueprint, render_template, send_from_directory, current_app, session
from flask_restful import Api, Resource
from web3 import Web3
from decouple import config
from flask_cors import CORS, cross_origin
from ComplieSolToPython import compile

# Initilize Flask App
# Each Api call is for the functionality of the React Front 
# Or for initilizating Solidity SmartContract
app = Flask(__name__)
cors = CORS(app)
api = Api(app)

# return JSON serializable objects

class HelloWorld(Resource):
    def get(self):
        return {"data": "Hello World"}

    def post(self):
        return {"data": "Posted"}

api.add_resource(HelloWorld, "/helloworld")

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