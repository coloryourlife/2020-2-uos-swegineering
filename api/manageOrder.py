from flask import request
from flask_restx import Resource, Api, Namespace
from flask_pymongo import pymongo
from dbconfig import CONNECTION_STRING

ManageOrder = Namespace("ManageOrder")
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('mrdaebak')

@ManageOrder.route('/orderList')
class getOrderList(Resource):
	def get(self):
		orderdb = pymongo.collection.Collection(db,'orderList')
		orderList = []
		orderList_all = orderdb.find().sort([('date', 1), ('time', 1)])
		print(orderList_all)
		for item in orderList_all:
			if item['orderStatus'] != "완료":
				orderList.append({'address':item['address'], 'phoneNumber':item['phoneNumber'], 'orderStatus':item['orderStatus'],
					'menuName':item['menuName'], 'style':item['style'], 'quantity':item['quantity'], 'order_details':item['order_details'], 'name':item['name'], 'id':item['id'],
					'date':item['date'], 'time':item['time']
				})
		return {'orderList':orderList}

@ManageOrder.route('/serviceDone', methods=['POST'])
class serviceDone(Resource):
	def post(self):
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
		return {'status':'success'}