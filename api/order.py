from flask import request
from flask_restx import Resource, Api, Namespace
from flask_pymongo import pymongo
from dbconfig import CONNECTION_STRING

Order = Namespace("Order")
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('mrdaebak')

@Order.route('/orderHistory/<string:userEmail>')
class getOrderHistory(Resource):
	def get(self, userEmail):
		try:
			print(userEmail)
			orderdb = pymongo.collection.Collection(db,'orderList')
			orderLists = []
			orderList_all = orderdb.find({"id":userEmail, "orderStatus":"완료"})
			for orderList in orderList_all:
				orderLists.append({'menuName':orderList['menuName'],'style':orderList['style'],'order_details':orderList['order_details'],"quantity":orderList['quantity'], "date":orderList['date'], "price":orderList['price']})
			return { 'orderHistory':orderLists}
		except Exception:
			return {'orderHistory': []}
		

@Order.route('/menu')
class getMenu(Resource):
	def get(self):
		session_cookie = request.cookies.get('session')
		try:
			# decoded_claims = auth.verify_session_cookie(session_cookie, check_revoked=True)
			# print(decoded_claims)
			menu = pymongo.collection.Collection(db, 'menu')
			output = []
			for m in menu.find():
				output.append({'name' : m['name'], 'content':m['content'], 'price':m['price'],'quantity':m['quantity']})
			return {'result' : output}
		except Exception:
			return {'result' : []}

@Order.route('/style/<string:menuName>')
class getStyle(Resource):
	def get(self,menuName):
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
		return {'result' : available_style}

@Order.route('/details/<string:menuName>')
class getDetails(Resource):
	def get(self, menuName):
		details = pymongo.collection.Collection(db,'details')
		details_list = []
		for d in details.find():
			if d['name'] == menuName:
				details_list.append({'name' : d['name'], 'details':d['details']})
		return {'result' : details_list}

@Order.route('/done')
class setNewOrder(Resource):
	def post(self):
		data = request.json
		orderInfo = data['orderInfo']
		userInfo = data['user']
		newOrder = []
		newOrder.append({"name":userInfo['name'],"address":userInfo['address'],'phoneNumber':userInfo['phoneNumber'],'orderStatus':'주문확인',
			'menuName':orderInfo['menuName'], 'style':orderInfo['style'], 'quantity':orderInfo['style_quantity'], 'order_details':orderInfo['details'], 'date':orderInfo['date']
			,'time':orderInfo['time'], 'price':orderInfo['price']
		})
		userdb = pymongo.collection.Collection(db,'orderList')
		userdb.insert_one({"name":userInfo['name'],"address":userInfo['address'],'phoneNumber':userInfo['phoneNumber'],'orderStatus':'주문확인',
			'menuName':orderInfo['menuName'], 'style':orderInfo['style'], 'quantity':orderInfo['style_quantity'], 'order_details':orderInfo['details'], 'id':userInfo['email']
			,'date':orderInfo['date'],'time':orderInfo['time'], 'price': orderInfo['price']
		})
		return {'myOrder': newOrder}