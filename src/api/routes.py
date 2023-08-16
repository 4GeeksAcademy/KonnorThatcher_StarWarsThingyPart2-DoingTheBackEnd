"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from api.models import db, User, Character, Planet, Favorites
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.json
    print(data)
    user = User.query.filter_by(email=data.get("email", None)).first()

    if user:
        return jsonify(message="This user already exists. Get outta here!"), 400
    
    user = User(
        email=data["email"],
        password=data["password"],
        name=data["username"],
        is_active=True
    )
    db.session.add(user)
    db.session.commit()
    return '', 204

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    print(data)
    user = User.query.filter_by(email=data.get("email", None)).first()

    if not user or user.password != data.get("password", None):
        return jsonify(message="Invalid Credentials"), 401

    token = create_access_token(user.email)
    return jsonify(token=token), 200

@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify(Users=[user.serialize() for user in users])

@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites_of_user():
    user = User.query.filter_by(email=get_jwt_identity()).first()
    favorites = Favorites.query.filter_by(user_id=user.id).all()
    print(favorites)
    return jsonify([favorite.serialize() for favorite in favorites]), 200
    
@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    '''
    POST: {
        "name": Name of item,
        "type": 'character' or 'planet',
        "og_id": id of item in it's original table
    }
    '''
    post_req = request.json
    print(post_req)
    
    user = User.query.filter_by(email=get_jwt_identity()).first()
    favorites = Favorites.query.filter_by(user_id=user.id).all()

    favs_list = [fav.serialize() for fav in favorites]
    for fav in favs_list:
        if post_req["name"] == fav["name"]:
            return jsonify(msg="You already have this item favorited, you goober!"), 400

    if post_req["type"] == "character":
        character = Character.query.filter_by(id=post_req["og_id"]).first()
        if not character:
            return jsonify(msg="This character doesn't exist"), 400
        elif character.name != post_req["name"]:
            return jsonify(msg="The og_id and the character's name doesn't match what's in our database"), 400
        else:
            new_fav = Favorites(
                name=post_req["name"],
                user_id=user.id,
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
                user_id=user.id,
                type=post_req["type"],
                og_id=post_req["og_id"]
            )
            db.session.merge(new_fav)
            db.session.commit()
            return '', 204
        
    else:
        return jsonify(msg="Data type doesn't exist"), 400

@api.route('/favorites/<fav_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(fav_id):
    user = User.query.filter_by(email=get_jwt_identity()).first()
    favorite = Favorites.query.get(fav_id)

    if favorite.user_id == user.id:
        db.session.delete(favorite)
        db.session.commit()
        return '', 204
    else:
        return jsonify(message="You are not authorized to remove this item from favorites"), 400

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
        return jsonify(character.serialize()), 200
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
        return jsonify(planet.serialize()), 200
    else:
        return jsonify(
            message="This planet does not exist",
            planet=None
        ), 451