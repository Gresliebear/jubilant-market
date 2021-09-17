from flask import Flask
app = Flask(__name__)

from flask import current_app, flash, jsonify, make_response, redirect, request, url_for

# banking license 
# WSGI
# Finanical products

@app.route('/') #flask instance app fun() route
def index(): #view functions

    dataDict = { 
        "test":"Hello World"
    }

    passObj = jsonify(dataDict)
    return passObj


@app.route('/api/hello') #flask instance app fun() route
def index(): #view functions

    # yearn
    # https://medium.com/aave/flash-loans-one-month-in-73bde954a239
    # flashloan 
    

    dataDict = { 
        "test":"Hello World"
    }

    passObj = jsonify(dataDict)
    return passObj
