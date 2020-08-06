import json
import uuid

from user_details_api.service import user_data_file
from user_details_api.exceptions.missing_user_exception import MissingUserException
from user_details_api.exceptions.bad_request_exception import BadRequestException


def get_user_datas():
    with open(user_data_file, 'r') as user_file:
        data = user_file.read()
    return json.loads(data)


def validate_if_user_exists(user_datas, username):
    existing_usernames = [user["username"] for user in user_datas]
    if username in existing_usernames:
        raise BadRequestException(f"username: {username} already exists")


def write_user_datas(user_datas):
    with open(user_data_file, 'w') as user_file:
        user_file.write(json.dumps(user_datas))


def add_user(user_data):
    user_datas = get_user_datas()
    validate_if_user_exists(user_datas, user_data["username"])

    user_id = uuid.uuid4().hex
    user_data["id"] = user_id
    user_datas.append(user_data)
    write_user_datas(user_datas)
    return user_id


def add_users(new_users):
    user_datas = get_user_datas()
    for user in new_users:
        validate_if_user_exists(user_datas, user["username"])
        user["id"] = uuid.uuid4().hex
        user_datas.append(user)
    write_user_datas(user_datas)


def user_login(username, password):
    user_datas = get_user_datas()
    for user in user_datas:
        if user["username"] == username and user["password"] == password:
            return uuid.uuid4().hex
    raise BadRequestException(f"username and/or password are not existing or invalid")


def get_user_data(username):
    user_datas = get_user_datas()
    for user in user_datas:
        if user["username"] == username:
            return user
    raise MissingUserException(f"username: {username} not present in existing data")


def update_user_data(username, updated_user):
    user_datas = get_user_datas()
    user_present = False
    updated_users = []
    for user in user_datas:
        if user["username"] == username:
            updated_users.append(updated_user)
            user_present = True
        else:
            updated_users.append(user)
    if not user_present:
        raise MissingUserException(f"username: {username} not present in existing data")
    write_user_datas(updated_users)
    return updated_user["id"]


def delete_user_data(username):
    user_datas = get_user_datas()
    user_present = False
    updated_users = []
    for user in user_datas:
        if user["username"] == username:
            user_present = True
        else:
            updated_users.append(user)
    if not user_present:
        raise MissingUserException(f"username: {username} not present in existing data")
    write_user_datas(updated_users)
