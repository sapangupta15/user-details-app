import os
import json

user_data_file = os.environ.get("USER_DATA")
if not user_data_file:
    user_data_file = os.path.abspath(os.path.join(os.path.abspath(__file__), '../../../files/users.json'))


