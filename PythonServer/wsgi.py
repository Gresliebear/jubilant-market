from flask import Flask, request, jsonify, url_for, Blueprint, render_template, send_from_directory, current_app, session
from datetime import datetime
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy  #you write python code to insert, update, delete, CRUD # pip install flask_sqlalchemy 
from flask_migrate import Migrate
from web3 import Web3
import json 
from decouple import config
from flask_cors import CORS, cross_origin
from abortCode import abort_if_userAddr_exists, abort_if_useraddr_doesnt_exist

# Initilize Flask App
# Each Api call is for the functionality of the React Front 
# Or for initilizating Solidity SmartContract
# EMF Emergency fund
# Submit a claim 
# Contribute Delegates

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

# datatable SQLalchemy 
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userAddress = db.Column(db.String(32), unique=True, nullable=False )
    account_total = db.Column(db.Integer, unique=False, nullable=False )
    latest_month = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return f"User('{self.userAddress}','{self.account_total}', '{self.latest_month}')"


# UserDepoist needs to be renamed to UsersRecords
# rename deposit to account total
class UserDepoist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userAddress = db.Column(db.String(32), unique=True, nullable=False)
    txn_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow) 
    deposit = db.Column(db.Integer, unique=False, nullable=False )

    def __repr__(self):
        return f"UserDepoist('{self.userAddress}','{self.deposit}', {self.txn_date})"

class UserTxnGraph(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userAddress = db.Column(db.String(32), unique=False, nullable=False)
    txn_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow) 
    txnAmount = db.Column(db.Integer, unique=False, nullable=False )

    def __repr__(self):
        return f"UserDepoist('{self.userAddress}','{self.txnAmount}', {self.txn_date})"


# MockUserData
user_put_args = reqparse.RequestParser()
user_put_args.add_argument("userAddress", type=str, help="UserAddress Require", required=True)
user_put_args.add_argument("account_total", type=int, help="account_total Require", required=True)
user_put_args.add_argument("latest_month", type=int, help="latest_month Require", required=True)

user_update_args = reqparse.RequestParser()
user_update_args.add_argument("userAddress", type=str, help="UserAddress Require", required=True)
user_update_args.add_argument("account_total", type=int, help="account_total Require", required=True)
user_update_args.add_argument("latest_month", type=int, help="latest_month Require", required=True)

# EMFDeposit Validae Webrequest
EMFDeposit_put_args = reqparse.RequestParser()
EMFDeposit_put_args.add_argument("userAddress", type=str, help="UserAddress Require", required=True)
EMFDeposit_put_args.add_argument("Deposit", type=int, help="Deposit Require", required=True)

# GET parse still not function TypeERROS
# EMFDeposit Validae Webrequest GET
EMFDeposit_get_args = reqparse.RequestParser()
EMFDeposit_get_args.add_argument("userAddress", type=str, help="UserAddress Require", required=True)

# EMFDeposit Validae Webrequest PATCH
EMFDeposit_patch_args = reqparse.RequestParser()
EMFDeposit_patch_args.add_argument("userAddress", type=str, help="UserAddress Require", required=True)
EMFDeposit_patch_args.add_argument("Deposit", type=int, help="Deposit Require", required=True)

# EMFWithdraw Validate Webrequest
EMFWithdraw_get_args = reqparse.RequestParser()
EMFWithdraw_get_args.add_argument("userAddress", type=str, help="UserAddress Require", required=True)


# EMFDeposit Validae Webrequest
EMFWithdraw_put_args = reqparse.RequestParser()
EMFWithdraw_put_args.add_argument("userAddress", type=str, help="UserAddress Require", required=True)
EMFWithdraw_put_args.add_argument("Withdraw", type=int, help="Deposit Require", required=True)


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
resource_fields_EMF = {
	'userAddress': fields.String,
	'deposit': fields.Integer,
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
        print(userAddress) #32 address 0x0640340405304504 32 place bits waleet
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

    # Delete Functionality will not be needed for Depositing
    # @marshal_with(resource_fields)
    # def delete(self, userAddress):
    #     abort_if_useraddr_doesnt_exist(userAddress, User)
    #     del users[userAddress]
    #     return '', 204

api.add_resource(JubilantMarket, "/jubilantmarket/<string:name>/<int:test>")
api.add_resource(GetData, "/jubilantmarket/<string:name>")
api.add_resource(MockUserData, "/jubilantmarket/mockuserdata/<string:userAddress>")

@app.route('/UploadCall', methods=['POST'])
def UploadCall(): 
    print(request)
    if request.method == 'POST':
        print(request.files)
        if 'file' not in request.files:
            print('No file part')
        file = request.files['file']
        print(file)
        # print(file.read())
        response_pay_load = {  "message":"Image Upload Successed"  }
        return response_pay_load, 200

    response_pay_load = {  "message":"Image Upload Failed"  }
    return response_pay_load, 200



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
# 
class EMFDeposit(Resource):
    # get request to check if useraddress is already resigter and part of the EMF
    def get(self, userAddress):
        print(userAddress)
        
        result = UserDepoist.query.filter_by(userAddress=userAddress).first()

        if not result:
            response_pay_load = { "message":"User doesnt exit", "existence":False  }
            return response_pay_load, 200

        response_pay_load = {  "message":"User exist already", "existence":True  }
        return response_pay_load, 200
    
    # @marshal_with(resource_fields_EMF)
    # initialize contract with the first deposit
    def put(self, userAddress):
        args = EMFDeposit_put_args.parse_args()
        print(args['userAddress']) #32 address 0x0640340405304504 32 place bits waleet
        # record the despoist
        result = UserDepoist.query.filter_by(userAddress=args['userAddress']).first()

        if result:
            abort(409, message="UserAddress Exist already No dont initialize new smart contract")

        # record the despoist
        user = UserDepoist(userAddress=args['userAddress'],
        deposit=args['Deposit'])
        
        # first record transaction
        record = UserTxnGraph(userAddress=args['userAddress'], txnAmount=args['Deposit'])
        db.session.add(record)
        db.session.add(user)
        db.session.commit()

        # trigger deposit Web3.py Initializes SmartContract !!!!! <EMFDeposit> 
        response_pay_load = {  "message":"Inital deposit Made" }
        return response_pay_load, 200


    # @marshal_with(resource_fields_EMF)
    def patch(self, userAddress):
        print("this is patch")
        args = EMFDeposit_patch_args.parse_args()
        result = UserDepoist.query.filter_by(userAddress=userAddress).first()
        print(result)
        
        # takes userAddress and record depoist to make more depoist to the EMF
        account_total = result.deposit 
        print("current account total", account_total)
        print("new deposit submitted", args['Deposit'])
        print(type(args['Deposit']))
        test_account_total = account_total + args['Deposit'] 
        if test_account_total > 1000:
            response_pay_load = {  "message":"Deposits cannot surpass 1000", "amountError":True }
            return response_pay_load, 200

        if args['Deposit'] == 0:
            response_pay_load = {  "message":"Deposits cannot be zero", "amountError":True }
            return response_pay_load, 200

        # trigger deposit again to SmartContract !!!!! <EMFDeposit> 


        # bug if 1100 make float
        if account_total > 1000.00:
            response_pay_load = {  "message":"Over the account Deposit limit", "overlimit":True }
            return response_pay_load, 200
        # change deposit to float for interest rate 
        new_total = int(account_total) + int(args['Deposit'])

        # record transaction
        record = UserTxnGraph(userAddress=args['userAddress'], txnAmount=new_total)
        db.session.add(record)
        db.session.commit()

        if not result:
            abort(404, message="User doesn't exist, cannot update")

        # if args['userAddress']:
        #     result.userAddress = args['userAddress']
        if args['Deposit']:
            print(new_total)
            result.deposit = new_total
            db.session.commit()

        
        
        response_pay_load = {  "message":"Transaction record and made!!", "overlimit":False }
        return response_pay_load, 200

    @marshal_with(resource_fields_EMF)
    def delete(self, userAddress):
        abort_if_useraddr_doesnt_exist(userAddress, User)
        del users[userAddress]
        return '', 204

class EMFWithdraw(Resource):
    # get users balance
    def get(self,userAddress):
        print(userAddress)
        result = UserDepoist.query.filter_by(userAddress=userAddress).first()
        
        if not result:
            abort(404, message="User doesn't exist, cannot get User's Balance")
        
        balance = result.deposit 

        response_pay_load = {  "message":"Balance returned", "balance":balance }
        return response_pay_load, 200

    def put(self, userAddress):
        # EMFWithdraw_put_args
        args = EMFWithdraw_put_args.parse_args()
        print("withdraw", args['Withdraw'])
        result = UserDepoist.query.filter_by(userAddress=userAddress).first()
        balance = result.deposit 
        print("current balance", balance)

        if balance < 0:
            response_pay_load = {  "message":"Balance Cannot be negative", "amountError":True }
            return response_pay_load, 200
        # CheckBalance() #call EMF.sol 
            # does balance match? 
            # if not EMF.sol has priority
        new_balance = balance - args['Withdraw']
        print("new balance", new_balance)
        # WithdrawCall for EMF.sol #Call EMF.sol here for withdraw
            # parameter UserAddress, amountWithdraw

        # record Withdraw transaction by taking latest balance - withdraw ammount
        record = UserTxnGraph(userAddress=args['userAddress'], txnAmount=new_balance)
        db.session.add(record)
        db.session.commit()

        # record Withdraw
        if args['Withdraw']:
            print(new_balance)
            result.deposit = new_balance
            db.session.commit()

        if args['Withdraw'] == 0:
            response_pay_load = {  "message":"Deposits cannot be zero", "amountError":True }
            return response_pay_load, 200


        response_pay_load = {  "message":"Transaction recorded and made!!", "overlimit":False }
        return response_pay_load, 200

    def patch(self):
        response_pay_load = {  "message":"Transaction record and made!!", "overlimit":False }
        return response_pay_load, 200
    

def rows_to_array(rows):
    return [r._asdict() for r in rows]

class EMFviewbalance(Resource):
    def get(self, userAddress):
        print(userAddress)
        dataDict = UserTxnGraph.query.filter_by(userAddress=userAddress).all()
        print(dataDict)

        # Struct python?
        dataObj = { 
            "accountTotal":[],
            "txn_date":[]
        }


        dataObj2 = {} 
        case_list = []
        for r in dataDict:
            print(r.txnAmount)
            print(r.txn_date)
            case ={'accountTotal':r.txnAmount,'txn_date':str(r.txn_date)}
            case_list.append(case)
        # jsonPass = jsonify(dataObj)
        # print(jsonPass)
        # print(type(jsonPass))
        json_object = json.dumps(case_list)
        response_pay_load = {  "message":"Current Balance", "overlimit":False }
        return json_object, 200

    def put(self, userAddress):
        response_pay_load = {  "message":"Current Balance", "overlimit":False }
        return response_pay_load, 200

    def patch(self, userAddress):
        response_pay_load = {  "message":"Current Balance", "overlimit":False }
        return response_pay_load, 200

# we do implement subclasses for /FrontEndEMF/EMFDeposit or /FrontEndEMF/EMFWithdraw
api.add_resource(EMFDeposit, "/jubilantmarket/EMFDeposit/<string:userAddress>")
api.add_resource(EMFWithdraw, "/jubilantmarket/EMFWithdraw/<string:userAddress>")
api.add_resource(EMFviewbalance, "/jubilantmarket/EMFviewbalance/<string:userAddress>")

if __name__ == "__main__":
    app.run(debug=True)