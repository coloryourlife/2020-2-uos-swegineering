import firebase_admin
import pyrebase
from flask import Flask, jsonify, request, json,redirect, make_response, abort
from flask_restx import Resource, Api
from firebase_admin import credentials, auth
from flask_cors import CORS, cross_origin
from flask_pymongo import pymongo
from functools import wraps
from auth import Auth
from order import Order
from manageOrder import ManageOrder
import datetime

config = {
  'ORIGINS': [
    'http://localhost:3000',  # React
    'http://127.0.0.1:3000',
		'http://127.0.0.1:3000/order',
		'http://localhost:3000/order',
		'http://127.0.0.1:3000/orderDone',
		'http://localhost:3000/orderDone',
		'http://localhost',
		'https://swengineering-97cd3.firebaseapp.com',
		'https://swengineering-97cd3.firebaseapp.com/*',
		'http://swengineering.s3-website.ap-northeast-2.amazonaws.com',
		'http://swengineering.s3-website.ap-northeast-2.amazonaws.com/*'  # React
  ],

  'SECRET_KEY': '...'
}
app = Flask(__name__)
CORS(app, resources={ r'/*': {'origins': config['ORIGINS']}}, supports_credentials=True)
api = Api(app)
api.add_namespace(Auth, '/auth')
api.add_namespace(Order, '/order')
api.add_namespace(ManageOrder,'/manage')
app.config['JSON_AS_ASCII'] = False
app.config["CORS_SUPPORTS_CREDENTIALS"] = True

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')