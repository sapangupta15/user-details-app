import os
import json
import pytest

# hack to set env vars before importing app module
os.environ["USER_DATA"] = os.path.abspath(os.path.join(os.path.abspath(__name__), '../test.json'))
os.environ["PATH_TO_API_SPEC"] = os.path.abspath(
    os.path.join(os.path.abspath(__name__),
                 '../../user_details_api/api_docs/updated-users-oas-spec.yaml'))

from user_details_api.app import app

user_data = [{
    "id": "e4a598abe19844cba100b69349838066",
    "username": "test",
    "firstName": "test",
    "lastName": "test",
    "email": "test",
    "password": "56923hsvsdvdsh",
    "phone": "12345",
    "userStatus": True,
    "showPassword": False
}]


@pytest.fixture()
def setup():
    # setup test data
    with open(os.environ["USER_DATA"], 'w') as data_file:
        data_file.write(json.dumps(user_data))
    yield app.test_client()

    # remove after execution
    os.remove(os.environ["USER_DATA"])


def test_get_all_users_returns_list_of_users(setup):
    data = setup.get('/user/all', follow_redirects=True)
    response_body = json.loads(data.data)
    print(response_body)
    assert len(response_body) == 1
    assert response_body[0]["id"] == user_data[0]["id"]


def test_get_user_by_username(setup):
    username = user_data[0]["username"]
    data = setup.get('/user/' + username, follow_redirects=True)
    response_body = json.loads(data.data)
    print(response_body)
    assert response_body == user_data[0]


def test_get_user_by_username_returns_404_when_username_does_not_exist(setup):
    username = "abc"
    data = setup.get('/user/' + username, follow_redirects=True)
    status = data.status
    assert status == "404 NOT FOUND"


def test_delete_user_deletes_data_in_file(setup):
    username = user_data[0]["username"]
    response = setup.delete('/user/' + username, follow_redirects=True)
    assert response.status == "200 OK"
    with open(os.environ["USER_DATA"], 'r') as modified_file:
        updated_data = json.loads(modified_file.read())
    assert len(updated_data) == 0


def test_update_user_updates_user_data_in_file(setup):
    user_to_update = user_data[0]
    user_to_update["phone"] = "123"

    response = setup.put('/user/' + user_to_update["username"], data=json.dumps(user_to_update), follow_redirects=True)
    assert response.status == '200 OK'
    with open(os.environ["USER_DATA"], 'r') as modified_file:
        updated_data = json.loads(modified_file.read())
    assert len(updated_data) == 1
    assert updated_data[0]["phone"] == "123"


def test_create_user_creates_new_user_data_in_file(setup):
    new_user = {
        "username": "test2",
        "firstName": "test2",
        "lastName": "test2",
        "email": "test2",
        "password": "56923hsvsdvdsh",
        "phone": "12345",
        "userStatus": True,
        "showPassword": False
    }

    response = setup.post('/user', data=json.dumps(new_user), follow_redirects=True)
    print(response.data)
    assert response.status == '200 OK'
    with open(os.environ["USER_DATA"], 'r') as modified_file:
        updated_data = json.loads(modified_file.read())
    assert len(updated_data) == 2
