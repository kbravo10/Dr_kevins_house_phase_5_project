from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates



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

    serialize_rules =['-doctor.clients', '-medications.clients',]


    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable = False)
    age = db.Column(db.Integer, nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'))
    medications = db.relationship('Med_times', back_populates = 'clients')

    def __repr__(self):
        return f'name: {self.name}, age: {self.age}, doctor id: {self.doctor_id}'

#create a class medication
class Medication(db.Model, SerializerMixin):
    __tablename__ = 'medications'
    serialize_rules =['-clients.medications',]



    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, unique = True, nullable= False)
    medication_use = db.Column(db.String, nullable=False)

    clients = db.relationship('Med_times', back_populates='medications')

    def __repr__(self):
        return f'name: {self.name}, usage: {self.medication_use}, clients: {self.clients}'


#create a class med times
class Med_times(db.Model, SerializerMixin):
    __tablename__ = 'med_times'
    serialize_rules =['-employee.med_times', '-clients.med_times', 
                      '-medications.med_times', '-clients.medications', '-medications.clients']



    id = db.Column(db.Integer, primary_key=True, nullable=False)
    time_slot = db.Column(db.String, nullable=False)
    amount = db.Column(db.String)

    signed_off = db.Column(db.Integer, db.ForeignKey('employees.id'))
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    medication_id = db.Column(db.Integer, db.ForeignKey('medications.id'))

    clients = db.relationship('Client', back_populates = 'medications')
    medications = db.relationship('Medication', back_populates = 'clients')

#create a class inventory
class Inventory(db.Model, SerializerMixin):
    __tablename__ = 'inventories'

    id = db.Column(db.Integer, primary_key=True, nullable=False)

#create a class employee
class Employee(db.Model, SerializerMixin):
    __tablename__ = 'employees'
    serialize_rules =['-med_times.employee',]

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable = False)
    username = db.Column(db.String, unique=True, nullable = False)
    _password_hash = db.Column(db.String, nullable=False)

    med_times = db.relationship('Med_times', backref = 'employee')

    @hybrid_property
    def password_hash(self):
        return AttributeError()
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
