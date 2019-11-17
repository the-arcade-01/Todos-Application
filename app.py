from flask import Flask, render_template, url_for, redirect, session, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.sqlite3'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = "hello"

db = SQLAlchemy(app)

class todos(db.Model):
	_id = db.Column("id",db.Integer, primary_key=True)
	data = db.Column(db.String(200))

	def __init__(self,data):
		self.data = data

@app.route('/',methods=["POST","GET"])
def index():
	if request.method == "POST":
		t = request.form["intodo"]
		td = todos(t)
		db.session.add(td)
		db.session.commit()
		#return redirect('/')
	#db.session.query(todos).delete()
	#db.session.commit()
	
	return render_template('index.html',values=todos.query.all())
	
@app.route('/delete/<int:_id>')
def delete(_id):
	dt = todos.query.filter_by(_id=_id).delete()
	db.session.commit()

	return redirect('/')

if __name__=='__main__':
	db.create_all()
	app.run(debug=True)