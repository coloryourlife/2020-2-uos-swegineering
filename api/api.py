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

@app.route('/api/menuName', methods=['GET'])
def getStyle():
	styles = pymongo.collection.Collection(db,'style')


if __name__ == '__main__':
	app.run(debug=True)