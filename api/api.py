from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///order.db"
db = SQLAlchemy(app)

class MenuList(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	title = db.Column(db.Text, nullable=False)
	content = db.Column(db.Text, nullable=False)

	def __str__(self):
		return f'{self.id} {self.title} {self.content}'

def menuList_serializer(menu):
	return{
		'id' : menu.id,
		'title' : menu.title,
		'content' : menu.content
	}

@app.route('/api',methods=['GET'])
def index():
	return jsonify([*map(menuList_serializer, MenuList.query.all())])

if __name__ == '__main__':
	app.run(debug=True)