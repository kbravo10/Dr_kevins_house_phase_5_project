#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Inventory, Med_times, Client

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Inventory.query.delete()
        Med_times.query.delete()

        #inventory object
        inventory_all = []
        for i in range(5):
            inventory = Inventory()
            inventory_all.append(inventory)
        db.session.add_all(inventory_all)

        #med_times object
        med_times_all = []
        for i in range(5):
            mt = Med_times()
            med_times_all.append(mt)
        db.session.add_all(med_times_all)

        # clients object
        client_all =[]
        for i in range(5):
            client = Client()
            client_all.append(client)
        db.session.add_all(client_all)

        db.session.commit()
        

