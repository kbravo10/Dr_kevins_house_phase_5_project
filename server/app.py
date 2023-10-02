#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session 
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Doctor, Client,Med_times,Medication,Inventory,Employee,Report

# Views go here!
    
#check if user logged in
class CheckSession(Resource):
    def get(self):
        user = Employee.query.filter(Employee.id == session.get("user_id")).first()
        print(session.get("user_id"))
        if user:
            user_info = {
                'username': user.username,
                'name': user.name,
                'id': user.id
            }
            return user_info, 200
        else:
            return {'errors': ['Unathorized']}, 401 

#login the user
class Login(Resource):
    def post(self):
        user = request.get_json()
        user_info = Employee.query.filter(Employee.username == user['username']).first()
        if user_info:
            if user_info.authenticate(user['password']) == True:
                user_dict = {
                    'name': user_info.name,
                    'id': user_info.id,
                }
                session["user_id"] = user_info.id
                print(session['user_id'])
                print(session.get('user_id'))
                return user_dict, 200
            else:
                return {"errors":["Unathorized"]}, 401
        else:
                return {"errors":["Unathorized"]}, 401



#logout route
class Logout(Resource):
    def delete(self):
        print(session["user_id"])
        if session.get('user_id'):
            session['user_id'] = None
            return{'message', ['success logout']}, 204
        else:
            return {"errors":["Unathorized"]}, 401

#inventoury route
@app.route('/inventory')
def inventory():
    inventory = Inventory.query.all()
    inventory_dict = [inv.to_dict() for inv in inventory]
    return inventory_dict, 200

#medication schedule route
class MedicationTimes(Resource):
    def get(self):
        med_times = Med_times.query.order_by(Med_times.time_slot).all()
        med_times_dict = [mt.to_dict() for mt in med_times]
        return med_times_dict, 200
    def post(self):
        pass

class MedicationTimesId(Resource):
    def get(self, id):
        # med_time_jason=request.get_json()
        # print(med_time_jason)
        med_time=Med_times.query.filter(Med_times.id == id).first()
        med_time_dict = med_time.to_dict()
        print(med_time_dict)
        return med_time_dict, 200 
    def patch(self, id):
        print(id)
        record = Med_times.query.filter(Med_times.id == id).first()
        print(request.get_json()['signed_off'])
        record.signed_off = request.get_json()['signed_off']
        request_dict = record.to_dict()
        db.session.add(record)
        db.session.commit()
        
        # print(record.signed_off)
        return request_dict, 200

@app.route('/clients')
def clients():
    print(session.get('user_id'))
    clients = Client.query.all()
    client_dict = [c.to_dict() for c in clients]    
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

api.add_resource(Login, '/login', endpoint='login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(MedicationTimes, '/medication_times', endpoint='medication_times')
api.add_resource(MedicationTimesId, '/medication_times/<int:id>', endpoint='medication_times/<int:id>')
api.add_resource(Logout, '/logout', endpoint='logout')




if __name__ == '__main__':
    app.run(port=4000, debug=True)

