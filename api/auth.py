import firebase_admin
import pyrebase
from flask import request, jsonify, abort,json
from flask_restx import Resource, Api, Namespace
import datetime
from flask_pymongo import pymongo
from firebase_admin import credentials, auth
from dbconfig import CONNECTION_STRING

Auth = Namespace("Auth")
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('mrdaebak')
#Connect to firebase
cred = credentials.Certificate('fbAdminConfig.json')
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(json.load(open('fbconfig.json')))

@Auth.route('/signup')
class Signup(Resource):
	def post(self):
		userInfo = request.json
		email = userInfo['email']
		password = userInfo['password']
		if email is None or password is None:
			return{'message' : 'Error missing email or password'}, 400
		try:
			user = auth.create_user(
				email = email,
				password = password
			)
			userdb = pymongo.collection.Collection(db,'userInfo')
			userdb.insert_one({"email": userInfo['email'], "name":userInfo['name'], 'address':userInfo['address'], 'phoneNumber':userInfo['phoneNumber'],'cardNum':userInfo['cardNum'],'level':'bronze','total_order': 0,'uid':user.uid,'staff':False})
			return {'message' : f'Successfully created user {user.uid}'}, 200
		except:
			return {'message' : 'Error creating user'}, 400

@Auth.route("/sessionLogin")
class Login(Resource):
	def post(self):
		id_token = request.json['idToken']
		uid = request.json['uid']
		expires_in = datetime.timedelta(days=2)
		try:
			userInfo = pymongo.collection.Collection(db,'userInfo')
			userInfos = userInfo.find()
			user = []
			for u in userInfos:
				if u['uid'] == uid:
					user.append({'email':u['email'], 'name':u['name'], 'address':u['address'], 'phoneNumber':u['phoneNumber'],'cardNum':u['cardNum'],'level':u['level'],
					'total_order':u['total_order'], 'uid':u['uid'], 'staff':u['staff']})
			session_cookie = auth.create_session_cookie(id_token, expires_in=expires_in)
			response = jsonify({'status':'success', 'userInfo': user})
			expires = datetime.datetime.now() + expires_in
			response.set_cookie(
				'session', session_cookie, expires=expires, httponly=True
			)
			return response
		except Exception.FirebaseError:
			return abort(401, "Failed")

@Auth.route('/sessionLogout')
class Logout(Resource):
	def post(self):
		try:
			session_cookie = request.cookies.get('session')
			decoded_claims = auth.verify_session_cookie(session_cookie)
			auth.revoke_refresh_tokens(decoded_claims['sub'])
			response = jsonify({})
			response.set_cookie('session', expires=0)
			return response
		except:
			return {'message' : 'Session lost, just logout'}
