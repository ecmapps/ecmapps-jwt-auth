"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, get_jti, create_refresh_token

api = Blueprint('api', __name__)
#Agregar al boilerplate
app = Flask(__name__)
bcrypt = Bcrypt(app)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def createUser():
    data = request.get_json(force=True)
    new_user=User()
    secure_password = bcrypt.generate_password_hash((data["password"]), 10).decode("utf-8")
    new_user.email = data["email"]
    new_user.password = secure_password
    new_user.name = data["name"]
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@api.route('/login', methods=["POST"])
def login_user():
    data = request.get_json(force=True)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if user is None:
        print("No user found")
        return jsonify({"msg": "Incorrect user or password"}), 401
    if not bcrypt.check_password_hash(user.password,password):
        print("Wrong password")
        return jsonify({"msg":"Incorrect user or password"}), 401
    access_token = create_access_token(identity = user.id, additional_claims={"role":"admin"})
    access_jti = get_jti(access_token)
    refresh_token = create_refresh_token(identity=user.id, additional_claims={"accessToken":access_jti})
    return jsonify({"msg": "Login successful!", "token":access_token, "refresh_token": refresh_token, "user":User.serialize(user)}),200