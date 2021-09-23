from flask import Flask, request, jsonify, url_for, Blueprint, render_template, send_from_directory, current_app, session
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from web3 import Web3
from decouple import config
from flask_cors import CORS, cross_origin
from abortCode import abort_if_userAddr_exists, abort_if_useraddr_doesnt_exist

# Initilize Flask App
# Each Api call is for the functionality of the React Front 
# Or for initilizating Solidity SmartContract
app = Flask(__name__)
cors = CORS(app)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

API_USERNAME = config('HOME')
INFURA = config('PROID')
API_KEY = config('WEB3_INFURA_API_SECRET')
CORE_ACCOUNT = config('BUSINESSACCOUNT')

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userAddress = db.Column(db.String(32), unique=True, nullable=False )
    account_total = db.Column(db.Integer, unique=False, nullable=False )
    latest_month = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return f"User('{self.userAddress}','{self.account_total}', '{self.latest_month}')"

user_put_args = reqparse.RequestParser()
user_put_args.add_argument("userAddress", type=str, help="UserAddress Require", required=True)
user_put_args.add_argument("account_total", type=int, help="account_total Require", required=True)
user_put_args.add_argument("latest_month", type=int, help="latest_month Require", required=True)

user_update_args = reqparse.RequestParser()
user_update_args.add_argument("userAddress", type=str, help="UserAddress Require", required=True)
user_update_args.add_argument("account_total", type=int, help="account_total Require", required=True)
user_update_args.add_argument("latest_month", type=int, help="latest_month Require", required=True)


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

# flask_restful.fields.MarshallingException: invalid literal for int() with base 10: '0x0080'
resource_fields = {
	'userAddress': fields.String,
	'account_total': fields.Integer,
	'latest_month': fields.Integer,
}


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
    @marshal_with(resource_fields)
    def get(self, userAddress):
        print(userAddress)
        result = User.query.filter_by(userAddress=userAddress).first()
        if not result:
            abort(404, message="Could not find User Address")
        return result
    
    @marshal_with(resource_fields)
    def put(self, userAddress):
        args = user_put_args.parse_args()
        result = User.query.filter_by(userAddress=userAddress).first()

        if result:
            abort(409, message="UserAddress Exist already")

        
        user = User(userAddress=args['userAddress'],
        account_total=args['account_total'], 
        latest_month=args['latest_month'])

        db.session.add(user)
        db.session.commit()
        return user, 201


    @marshal_with(resource_fields)
    def patch(self, userAddress):
        args = user_update_args.parse_args()
        result = User.query.filter_by(userAddress=userAddress).first()

        if not result:
            abort(404, message="Video doesn't exist, cannot update")

        if args['userAddress']:
            result.userAddress = args['userAddress']
        if args['account_total']:
            result.account_total = args['account_total']
        if args['latest_month']:
            result.latest_month = args['latest_month']
        
        db.session.commit()
        return result

    @marshal_with(resource_fields)
    def delete(self, userAddress):
        abort_if_useraddr_doesnt_exist(userAddress, User)
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

# EMF Emergency fund
# Submit a claim 
# Contribute Delegates


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

if __name__ == "__main__":
    app.run(debug=True)