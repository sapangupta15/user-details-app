## Installation Instructions
Checkout code using git clone: 
### Backend
1. Backend uses Python and flask to expose endpoints mentioned in the openapi spec. Itrequires Python 3.6+ and pip to be installed on the system.
2. Navigate to the backend directory in the project.
3. The Api app expects that the path to users file and api specification file will be set in environment variables: "USER_DATA" and "PATH_TO_API_SPEC" respectively. 
4. To install dependencies and run server, run  commands:
- Windows
```
cd <BACKEND_DIR>
python -m venv venv
venv\Scripts\activate
python -m pip install -r requirements.txt
set PYTHONPATH=<PATH_TO_BACKEND_DIR>
set USER_DATA=<PATH_TO_USERS_FILE>
set PATH_TO_API_SPEC=<PATH_TO_API_SPEC>
cd user_details_api
python app.py
```

- Linux
```
cd <BACKEND_DIR>
python -m venv venv
source venv/bin/activate
python -m pip install -r requirements.txt
export PYTHONPATH=<PATH_TO_BACKEND_DIR>
export USER_DATA=<PATH_TO_USERS_FILE>
export PATH_TO_API_SPEC=<PATH_TO_API_SPEC>
cd user_details_api
python app.py
```
5. The API is available at http://localhost:5000
6. To Run unit tests, run the following:
```
cd <BACKEND_DIR>\tests
pytest
```


### Frontend
1. The front end has been developed in react, and requires nodejs and npm to be installed on the system.
2. To run the app, navigate to frontend directory and run the following commands:
```
cd <FRONTEND_DIR>
npm install package.json
npm start
```
If the api server is not running, then an error message will load on UI: "We are experiencing issues right now, please try again in some time
"

To run tests, run the command: 
```
npm test
```
3. The front end is avalilable at http://localhost:3000
----------------

## Features, assumtions and enhancements
### Frontend
1. The front end is built on React and uses material UI for styling and components.
2. On load, it fetches and renders all data from api server.
3. It has functionality to add new users, edit existing users and delete users.
4. Pagination is implemented on client side.
5. Search is done on client side as well, and can be run in 2 ways:
- if search is of type <fieldName>: <value> (e.f. username: myName), it searches for specific field.
- if search is free text, then it matches data in username, firstName, lastName and email fields.
6. For state management, UserContainer is used, as the interactions are relatively simple and relies 
on "lifting the state" for pure stateless components.

#### Assumptions
- No login is required, and the app can be directly used on user management page.
- Dev server is sufficient for this assignment. For prod, nginx or something similar should be used.

#### Enhancements
- Modify to use redux, as UserContainer seems to be doing too much.
- Refactor components like table and user form to be created dynamically from input data.
- Enhance test cases to include more interaction tests
- improve and standardize styling

### Backend
1. Backend uses python, flask for API, and flassger for API spec and documentation.
The swagger docs are available at: http://localhost:5000/apidocs
2. Changes made to OpenAPI spec:
- remove all support for application/xml, as application is going to use json only.
- add a method to get all users with API path: /user/all. This doesn't support pagination yet, as we are working for only 100 users currently.
- Change method names to use snake case, instead of camel case, to be more pythonic
- Remove https from schemes
- Change host to localhost:5000
- change datatype for "id" field to be string, to support GUIDs, as they work well for json data

#### Assumptions
- For this assignment, dev server is okay. For prod, gunicorn or similar server libraries should be used.
- Add, update, delete methods aren't thread-safe in this implementation. For prod like environments, locks should be used and in case of multiple instances, use locks in database.
- Since we're not maintaining user sessions, logout functionality hasn't been implemented.

#### Enhancements
- Refactor code to break down into functional modules i.e. create a module specific for users rather than all controllers present in app.py
- Create data access layer, view layers as well as models for request and response

