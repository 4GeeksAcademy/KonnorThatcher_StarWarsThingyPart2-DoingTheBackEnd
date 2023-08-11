"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Character, Planet
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify(Users=[user.serialize() for user in users])

@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.filter_by(id=id).first()
    if user:
        return jsonify(User=user.serialize()), 200
    else:
        return jsonify(
            message="User not found",
            User=None
        ), 401

@api.route('/characters', methods=['GET'])
def get_all_characters():
    characters = Character.query.all()
    return jsonify(
        Characters=[character.serialize() for character in characters]
    ), 200

@api.route('/characters/<int:id>', methods=['GET'])
def get_character(id):
    character = Character.query.filter_by(id=id).first()
    if character:
        return jsonify(Character=character.serialize()), 200
    else:
        return jsonify(
            message="This character does not exist",
            character=None
        ), 451

@api.route('planets', methods=['GET'])
def get_all_planets():
    planets = Planet.query.all()
    return jsonify(
        Planets=[planet.serialize() for planet in planets]
    ), 200

@api.route('planets/<int:id>', methods=['GET'])
def get_planet(id):
    planet = Planet.query.filter_by(id=id).first()
    if planet:
        return jsonify(Planet=planet.serialize()), 200
    else:
        return jsonify(
            message="This planet does not exist",
            planet=None
        ), 451