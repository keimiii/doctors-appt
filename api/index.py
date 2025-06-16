from flask import Flask, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# SQLite configuration
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'doctor_appointments.db')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(32), nullable=False)
    time = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(64), nullable=False)
    description = db.Column(db.String(64), nullable=False)

    __table_args__ = (
        db.Index('ix_date_time', 'date', 'time'),
        db.UniqueConstraint('date', 'time', name='ix_date_time'),
    )

    def to_dict(self):
            return {
                'date': self.date,
                'time': self.time,
                'name': self.name,
                'email': self.email,
                'description': self.description
            }

with app.app_context():
    db.create_all()

@app.route("/api/get_appointments", methods=["GET"])
def get_appointments():
    date = request.args.get('date')
    if date:
        data = Appointment.query.filter(Appointment.date == date).all()
    else:
        data = Appointment.query.all()
    return jsonify([a.to_dict() for a in data])


@app.route("/api/book_appointment", methods=["POST"])
def book_appointment():
    appt = Appointment(
        date=request.form['date'],
        time=request.form['time'],
        name=request.form['name'],
        email=request.form['email'],
        description=request.form['description']
    )
    try:
        db.session.add(appt)
        db.session.commit()
        return redirect(url_for("get_appointments"))
    except Exception as e:
        return e

