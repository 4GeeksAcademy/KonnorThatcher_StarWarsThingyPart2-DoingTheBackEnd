"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Character, Planet, Favorites
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

@api.route('/users/<int:id>/favorites', methods=['GET'])
def get_favorites(id):
    favorites = Favorites.query.filter_by(user_id=id).all()
    print(favorites)
    if favorites:
        return jsonify([favorite.serialize() for favorite in favorites]), 200
    else:
        return jsonify(
            message="User not found",
            User=None
        ), 401
    
@api.route('/users/<int:id>/favorites', methods=['POST'])
def add_favorite(id):
    '''
    POST: {
        "name": Name of item,
        "type": 'character' or 'planet',
        "og_id": id of item in it's original table
    }
    '''

    post_req = request.json

    if post_req["type"] == "character":
        character = Character.query.filter_by(id=post_req["og_id"]).first()
        if not character:
            return jsonify(msg="This character doesn't exist"), 400
        elif character.name != post_req["name"]:
            return jsonify(msg="The og_id and the character's name doesn't match what's in our database"), 400
        else:
            new_fav = Favorites(
                name=post_req["name"],
                user_id=id,
                type=post_req["type"],
                og_id=post_req["og_id"]
            )
            db.session.merge(new_fav)
            db.session.commit()
            return '', 204
        
    elif post_req["type"] == "planet":
        planet = Planet.query.filter_by(id=post_req["og_id"]).first()
        if not planet:
            return jsonify(msg="This planet doesn't exist"), 400
        elif planet.name != post_req["name"]:
            return jsonify(msg="The og_id and the planet's name doesn't match what's in our database"), 400
        else:
            new_fav = Favorites(
                name=post_req["name"],
                user_id=id,
                type=post_req["type"],
                og_id=post_req["og_id"]
            )
            db.session.merge(new_fav)
            db.session.commit()
            return '', 204
        
    else:
        return jsonify(msg="Data type doesn't exist"), 400


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