import json
import click
from api.models import db, User, Character, Planet

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_data(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.name = f"User {str(x)}"
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

        ### Insert the code to populate others tables if needed
    @app.cli.command("pop-chars-and-planets")
    def pop_chars_and_planets():
        with open('./src/api/chars-and-planets.json', 'rt') as json_data:
            data = json.load(json_data)

            for char in data["Characters"]:
                db.session.merge(Character(**char))

            db.session.commit()

            for planet in data["Planets"]:
                db.session.merge(Planet(**planet))

            db.session.commit()