#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Doctor, Client,Med_times,Medication,Inventory,Employee,Report

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

#inventoury route
@app.route('/inventory')
def inventory():
    inventory = Inventory.query.all()
    inventory_dict = [inv.to_dict() for inv in inventory]
    return inventory_dict, 200

@app.route('/medication_times')
def med_times():
    med_times = Med_times.query.order_by(Med_times.time_slot).all()
    med_times_dict = [mt.to_dict() for mt in med_times]
    return med_times_dict, 200

@app.route('/clients')
def clients():
    clients = Client.query.all()
    print(clients)
    client_dict = [c.to_dict() for c in clients]
    print(client_dict)
    
    return client_dict,200

@app.route('/doctors')
def doctors():
    doctors = Doctor.query.all()
    print(doctors)
    doctor_dict = [doc.to_dict() for doc in doctors]
    # print(doctor_dict)
    return doctor_dict,200

@app.route('/medications')
def medications():
    medications = Medication.query.all()
    medications_dict = [med.to_dict() for med in medications]
    return medications_dict, 200

@app.route('/employees')
def employees():
    employees = Employee.query.all()
    employee_dict = [employee.to_dict() for employee in employees]
    return employee_dict, 200

@app.route('/reports')
def report():
    report = Report.query.all()
    report_dict = [rep.to_dict() for rep in report]
    return report_dict, 200


if __name__ == '__main__':
    app.run(port=4000, debug=True)

