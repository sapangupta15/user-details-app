import json
from flask import Flask, request, make_response, Response
from flasgger import Swagger, swag_from
from werkzeug.exceptions import abort
from flask_cors import CORS, cross_origin

from user_details_api import PATH_TO_API_SPEC
from user_details_api.service.user_service import add_user, add_users, get_user_data, update_user_data, \
    delete_user_data, user_login, get_user_datas
from user_details_api.exceptions.missing_user_exception import MissingUserException
from user_details_api.exceptions.bad_request_exception import BadRequestException


def validation_error_inform_error(err, data, schema):
    """
    Custom validation error handler which produces 404 Bad Request
    response in case validation fails and returns the error
    """
    abort(Response(
        json.dumps({'error': str(err), 'data': data, 'schema': schema}),
        status=400))


app = Flask(__name__)
swagger = Swagger(app, template_file=PATH_TO_API_SPEC, validation_error_handler=validation_error_inform_error)
cors = CORS(app)


def create_api_response(message, status_code):
    api_response = {
        "code": status_code,
        "type": "unknown",
        "message": message
    }
    return make_response(api_response, 200)


@app.route('/user', methods=['POST'])
@swag_from(PATH_TO_API_SPEC)
def create_user():
    request_body = request.get_json(force=True)
    try:
        user_id = add_user(request_body)
        return create_api_response(user_id, 200)
    except BadRequestException as bad_request:
        return create_api_response(str(bad_request), 400)


@app.route('/user/createWithArray', methods=['POST'])
@swag_from(PATH_TO_API_SPEC, validation=True)
def create_user_with_array():
    request_body = request.get_json(force=True)
    add_users(request_body)
    return create_api_response("ok", 200)


@app.route('/user/createWithList', methods=['POST'])
@swag_from(PATH_TO_API_SPEC, validation=True)
def create_user_with_list():
    request_body = request.get_json(force=True)
    add_users(request_body)
    return create_api_response("ok", 200)


@app.route('/user/login', methods=['GET'])
@swag_from(PATH_TO_API_SPEC)
def login_user():
    username = request.args.get('username')
    password = request.args.get("password")
    try:
        session = user_login(username, password)
        return create_api_response(f"logged in user session:{session}", 200)
    except BadRequestException as bad_request:
        return create_api_response(str(bad_request), 400)


@app.route('/user/<username>', methods=['GET'])
@swag_from(PATH_TO_API_SPEC)
def get_user(username):
    try:
        user = get_user_data(username)
        return make_response(json.dumps(user), 200)
    except MissingUserException as missing_data:
        return make_response(str(missing_data), 404)


@app.route('/user/<username>', methods=['PUT'])
@swag_from(PATH_TO_API_SPEC)
def update_user(username):
    try:
        user_details = request.get_json(force=True)
        updated_user_id = update_user_data(username=username, updated_user=user_details)
        return create_api_response(updated_user_id, 200)
    except MissingUserException as missing_data:
        return make_response(str(missing_data), 404)


@app.route('/user/<username>', methods=['DELETE'])
@swag_from(PATH_TO_API_SPEC)
def delete_user(username):
    print(username)
    try:
        delete_user_data(username)
        return create_api_response(username, 200)
    except MissingUserException as missing_data:
        return make_response(str(missing_data), 404)


@app.route('/user/all', methods=['GET'])
def get_all_users():
    return make_response(json.dumps(get_user_datas()), 200)


if __name__ == '__main__':
    app.run()
