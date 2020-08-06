import os

PATH_TO_API_SPEC = os.environ.get('PATH_TO_API_SPEC')
if PATH_TO_API_SPEC is None:
    raise Exception("Spec File Path is mandatory")

