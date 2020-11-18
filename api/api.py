from flask import Flask, jsonify, request, json
from flask_cors import CORS
from flask_pymongo import pymongo

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False
CONNECTION_STRING = "mongodb+srv://chris0319:rkdska0401@cluster0.0umdc.mongodb.net/test?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('mrdaebak')


# class MenuList(db.Model):
# 	id = db.Column(db.Integer, primary_key = True)
# 	title = db.Column(db.Text, nullable=False)
# 	content = db.Column(db.Text, nullable=False)

# 	def __str__(self):
# 		return f'{self.id} {self.title} {self.content}'

# def menuList_serializer(menu):
# 	return{
# 		'id' : menu.id,
# 		'title' : menu.title,
# 		'content' : menu.content
# 	}

@app.route('/api',methods=['GET'])
def getMenu():
	menu = pymongo.collection.Collection(db, 'menu')
	output = []
	for m in menu.find():
		output.append({'name' : m['name'], 'content':m['content'], 'price':m['price']})
	return jsonify({'result' : output})

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