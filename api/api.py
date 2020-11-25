import firebase_admin
import pyrebase

from flask import Flask, jsonify, request, json,redirect, make_response, abort
from firebase_admin import credentials, auth
from flask_cors import CORS, cross_origin
from flask_pymongo import pymongo
from functools import wraps
import datetime

config = {
  'ORIGINS': [
    'http://localhost:3000',  # React
    'http://127.0.0.1:3000',
		'http://127.0.0.1:3000/order',
		'http://localhost:3000/order',
		'http://127.0.0.1:3000/orderDone',
		'http://localhost:3000/orderDone',
		'http://localhost'  # React
  ],

  'SECRET_KEY': '...'
}
app = Flask(__name__)
CORS(app, resources={ r'/*': {'origins': config['ORIGINS']}}, supports_credentials=True)
app.config['JSON_AS_ASCII'] = False
app.config["CORS_SUPPORTS_CREDENTIALS"] = True
CONNECTION_STRING = "mongodb+srv://chris0319:rkdska0401@cluster0.0umdc.mongodb.net/test?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('mrdaebak')
#Connect to firebase
cred = credentials.Certificate('fbAdminConfig.json')
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(json.load(open('fbconfig.json')))

@app.route('/sessionLogin', methods=['POST'])
def session_login():
	id_token = request.json['idToken']
	uid = request.json['uid']
	print(uid)
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

@app.route('/api/signup', methods=['POST'])
def signup():
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

@app.route('/sessionLogout', methods=['POST'])
def session_logout():
	try:
		session_cookie = request.cookies.get('session')
		decoded_claims = auth.verify_session_cookie(session_cookie)
		auth.revoke_refresh_tokens(decoded_claims['sub'])
		response = jsonify({})
		response.set_cookie('session', expires=0)
		return response
	except:
		return {'message' : 'Session lost, just logout'}

@app.route('/api/token', methods=['POST','GET'])
def token():
	content = request.json 
	email = content['email']
	password = content['password']
	try:
		user = pb.auth().sign_in_with_email_and_password(email, password)
		jwt = user['idToken']
		return {'token' : jwt}
	except:
		return {'message' : 'There was an error logging in'}

@app.route('/api',methods=['GET','POST'])
def getMenu():
	session_cookie = request.cookies.get('session')
	try:
		# decoded_claims = auth.verify_session_cookie(session_cookie, check_revoked=True)
		# print(decoded_claims)
		menu = pymongo.collection.Collection(db, 'menu')
		output = []
		for m in menu.find():
			output.append({'name' : m['name'], 'content':m['content'], 'price':m['price'],'quantity':m['quantity']})
		return jsonify({'result' : output})
	except Exception:
		return jsonify({'result' : []})

	
@app.route('/api/<string:menuName>', methods=['GET'])
def getStyle(menuName):
	styles = pymongo.collection.Collection(db,'style')
	available_menu = []
	available_style = []
	style_all = styles.find()
	for s in style_all:
		for name in s['possible_menu']:
			if name == menuName:
				available_menu.append(s['name'])
	for ss in styles.find({"name" : {"$in" : available_menu}}):
		available_style.append({'name' : ss['name'], 'content' : ss['content'], 'price' : ss['price']})
	return jsonify({'result' : available_style})

@app.route('/order/<string:menuName>', methods=['GET'])
def getDetails(menuName):
	details = pymongo.collection.Collection(db,'details')
	details_list = []
	for d in details.find():
		if d['name'] == menuName:
			details_list.append({'name' : d['name'], 'details':d['details']})
	return jsonify({'result' : details_list})

@app.route('/orderDone', methods=['POST'])
def newOrder():
	data = request.json
	orderInfo = data['orderInfo']
	userInfo = data['user']
	newOrder = []
	newOrder.append({"name":userInfo['name'],"address":userInfo['address'],'phoneNumber':userInfo['phoneNumber'],'orderStatus':'주문확인',
		'menuName':orderInfo['menuName'], 'style':orderInfo['style'], 'quantity':orderInfo['style_quantity'], 'order_details':orderInfo['details']
	})
	userdb = pymongo.collection.Collection(db,'orderList')
	userdb.insert_one({"name":userInfo['name'],"address":userInfo['address'],'phoneNumber':userInfo['phoneNumber'],'orderStatus':'주문확인',
		'menuName':orderInfo['menuName'], 'style':orderInfo['style'], 'quantity':orderInfo['style_quantity'], 'order_details':orderInfo['details'], 'id':userInfo['email']
	})
	return jsonify({'myOrder': newOrder})

@app.route('/orderList', methods=['GET'])
def getOrderList():
	orderdb = pymongo.collection.Collection(db,'orderList')
	orderList = []
	orderList_all = orderdb.find()
	for item in orderList_all:
		if item['orderStatus'] != "완료":
			orderList.append({'address':item['address'], 'phoneNumber':item['phoneNumber'], 'orderStatus':item['orderStatus'],
				'menuName':item['menuName'], 'style':item['style'], 'quantity':item['quantity'], 'order_details':item['order_details'], 'name':item['name'], 'id':item['id']
			})
	return jsonify({'orderList':orderList})

@app.route('/serviceDone', methods=['POST'])
def setServiceDone():
	userEmail = request.json['userEmail']
	currentStatus = request.json['status']
	orderdb = pymongo.collection.Collection(db,'orderList')
	userdb = pymongo.collection.Collection(db,'userInfo')
	if currentStatus == "주문확인":
		orderdb.update_one({"id":userEmail, "orderStatus":"주문확인"}, {"$set": {"orderStatus":"조리완료"}})
	elif currentStatus == "조리완료":
		orderdb.update_one({"id":userEmail, "orderStatus":"조리완료"}, {"$set": {"orderStatus":"배달완료"}})
	elif currentStatus == "배달완료":
		orderdb.update_one({"id":userEmail, "orderStatus":"배달완료"}, {"$set": {"orderStatus":'완료'}})
		user = userdb.find({'email':userEmail})
		for i in user:
			previous_order = i['total_order']
		userdb.update_one({'email':userEmail}, {"$set":{'total_order': previous_order+1}})
	return jsonify({'status':'success'})

if __name__ == '__main__':
	app.run(debug=True)