from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!

#create a class doctor
class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'
    serialize_rules =['-clients.doctor',]

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)

    clients = db.relationship('Client', backref = 'doctor')

    def __repr__(self):
        return f'doctor: {self.name}, email: {self.email}, \nclients: {self.clients}'

#create a class client
class Client(db.Model, SerializerMixin):
    __tablename__ = 'clients'

    serialize_rules =['-doctor.clients',]


    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable = False)
    age = db.Column(db.Integer, 
                    db.CheckConstraint('age >= 0'),
                    nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'))

    def __repr__(self):
        return f'name: {self.name}, age: {self.age}, doctor id: {self.doctor_id}'

#create a class medication
class Medication(db.Model, SerializerMixin):
    __tablename__ = 'medications'

    id = db.Column(db.Integer, primary_key=True, nullable=False)

#create a class med times
class Med_times(db.Model, SerializerMixin):
    __tablename__ = 'med_times'

    id = db.Column(db.Integer, primary_key=True, nullable=False)

#create a class inventory
class Inventory(db.Model, SerializerMixin):
    __tablename__ = 'inventories'

    id = db.Column(db.Integer, primary_key=True, nullable=False)

#create a class employee
class Employee(db.Model, SerializerMixin):
    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
