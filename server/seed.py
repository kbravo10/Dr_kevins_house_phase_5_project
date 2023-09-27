#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Inventory, Med_times, Client, Doctor, Medication, Employee, Report

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Inventory.query.delete()
        Med_times.query.delete()
        Client.query.delete()
        Doctor.query.delete()
        Medication.query.delete()
        Employee.query.delete()
        Report.query.delete()

        #add data to medication class
        meds = {
            'Adderall':'Adderall is used to treat attention deficit hyperactivity disorder (ADHD) and narcolepsy.',
            'Atorvastatin':"It's used to help lower cholesterol and fat levels in your blood",
            'Levothyroxine':"Levothyroxine is a man-made hormone that is used to treat hypothyroidism. Hypothyroidism is a condition where your thyroid doesn't produce enough thyroid hormone naturally.",
            'Lisinopril':"Lisinopril is a type of angiotensin-converting enzyme (ACE) inhibitor used to treat high blood pressure.",
            'Metformin' : "Metformin is used to treat type 2 diabetes",
            'Albuterol' :"Albuterol is used to treat bronchospasm, which is when your airways spasm and tighten and make it hard to breathe.",
            'Gabapentin' : "Gabapentin works in your brain to prevent seizures and relieve certain types of pain. It is used to treat epilepsy, nerve pain after shingles, and moderate to severe restless leg syndrome. It's also sometimes used to treat other types of nerve pain, fibromyalgia, hot flashes after menopause, anxiety, mood disorders, irritable bowel syndrome (IBS), alcohol withdrawal, migraines, itching, and insomnia.",
            'Omeprazole' : "Omeprazole is used to treat conditions that result from too much acid in your stomach.",
            'Losartan' : "Losartan is the fourth in the top 10 medicines used to treat high blood pressure."
        }
        medications = []
        for i in range(len(meds)):
            med = Medication(
                name = [i for i in meds][i],
                medication_use = [values for values in meds.values()][i],
            )
            db.session.add(med)
            medications.append(med)
        


        #inventory object
        inventory_list = [
            "Adhesive bandages",
            "Bandages",
            "Gauze pads",
            "Tape",
            "Scissors",
            "Tweezers",
            "Thermometer",
            "Pain reliever",
            "Antiseptic wipes",
            "Cold compress",
            "Hot compress",
            "First aid manual"
        ]

        inventory_all = []
        for i in range(len(inventory_list)):
            inventory = Inventory(
                inventory = inventory_list[i],
                count_inventory = randint(0,10),
                instructions = 'Consult doctor'
            )
            inventory_all.append(inventory)
        db.session.add_all(inventory_all)

        

        #doctors object
        doctors_all = []
        for i in range(3):
            doc = Doctor(
                name = fake.unique.name(),
                email = fake.unique.email()
            )
            db.session.add(doc)
            db.session.commit()
            doctors_all.append(doc)

        # clients object
        client_all =[]
        for i in range(5):
            doc = rc(doctors_all)
            client = Client(
                name = fake.unique.name(),
                age = randint(1, 100),
            )
            client.doctor = doc
            db.session.add(doc)
            client_all.append(client)

        #add employee seed
        emails = [
        'userOne@google.com',
        'userTwo@google.com',
        'userThree@google.com',
        'userFour@google.com',
        ]
        employees = []
        for i in range(len(emails)):
            employee = Employee(
                name = fake.name(),
                username = emails[i]
            )
            employee.password_hash = employee.name + "pass"
            db.session.add(employee)
            employees.append(employee)

        #med_times object
        med_times_all = []
        for client in client_all:
            for i in range(randint(2, 5)):
                meds = rc(medications)
                t = 4*i
                time = ''
                if t >= 12:
                    time = str(t) + ":00"
                else:
                    time = "0" + str(t) + ":00"
                mt = Med_times(
                    time_slot = time,
                    amount = 'NA',
                    signed_off = '------Not Signed Off------',
                )
                mt.clients = client
                mt.medications = meds
                med_times_all.append(mt)
        db.session.add_all(med_times_all)


        #reports
        report_types =[
            'small-injury',
            'end of shift',
            'emergency'
        ]
        reports_list = []
        for i in range(5):
            emp = rc(employees)
            report = Report(
                type_of_report = rc(report_types),
                context = fake.sentence(),
                )
            report.employee = emp
            report.client = rc(client_all)
            reports_list.append(report)
        db.session.add_all(reports_list)


        db.session.commit()
        

