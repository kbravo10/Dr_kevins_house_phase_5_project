from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!

#create a class doctor
class Doctor(db.Model, SerializerMixin):
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True, nullable=False)

#create a class client
class Client(db.Model, SerializerMixin):
    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True, nullable=False)

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
