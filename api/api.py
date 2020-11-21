import firebase_admin
import pyrebase
from flask import Flask, jsonify, request, json,redirect
from firebase_admin import credentials, auth
from flask_cors import CORS, cross_origin
from flask_pymongo import pymongo
from functools import wraps
import datetime


config = {
  'ORIGINS': [
    'http://localhost:3000',  # React
    'http://127.0.0.1:3000',  # React
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

# def check_token(f):
# 	@wraps(f)
# 	def wrap(*args, **kwargs):
# 		if not request.headers.get('authorization'):
# 			return {'message': 'No token provided'}, 400
# 		try:
# 			user = auth.verify_id_token(request.headers['authorization'])
# 			request.user = user
# 		except:
# 			return {'message' : 'Invalid token provided.'}, 400
# 		return f(*args, **kwargs)
# 	return wrap

@app.route('/api/sessionInit', methods=['POST'])
def session_initializer():
	#id_token = request.form['idToken']
	id_token = request.headers.get('authorization')
	expires_in = datetime.timedelta(days=1)
	try:
		session_cookie = auth.create_session_cookie(id_token, expires_in = expires_in)
		expires = datetime.datetime.now() + expires_in
		response = jsonify({'status':'success'})
		response.set_cookie(
			'session', session_cookie, expires=expires, httponly=False
		) 
		return response
	except auth.AuthError:
		return{'message' : 'Error'}, 400

@app.route('/api/signup')
def signup():
	email = request.form.get('email')
	password = request.form.get('password')
	if email is None or password is None:
		return{'message' : 'Error missing email or password'}, 400
	try:
		user = auth.create_user(
			email = email,
			password = password
		)
		return {'message' : f'Successfully created user {user.uid}'}, 200
	except:
		return {'message' : 'Error creating user'}, 400

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

@app.route('/api',methods=['GET'])
def getMenu():
	print(request.headers)
	session_cookie = request.cookies.get('session')
	print(session_cookie)
	print(1)
	try:
		decoded_claims = auth.verify_session_cookie(session_cookie, check_revoked=True)
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

if __name__ == '__main__':
	app.run(debug=True)