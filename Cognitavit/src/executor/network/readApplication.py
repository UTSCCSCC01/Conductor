import json
import os
from platform import platform
from flask import Blueprint, jsonify, request
from Cognitavit.src.executor.core import USER_DATA_PATH
from execFactory import FactoryExecutor

read_app = Blueprint("/read", __name__)
sys_platform = 'win'
path_to_config_file = USER_DATA_PATH + '/installed.json'

@read_app.route('/get_custombin', methods=['GET'])
def get_custombin():
    '''
    Returns list of custom binaries from config

    json format:
    {custom_binaries:
        [{
            name: string
            path: string
        }
        ]
    }
    '''

    with open(path_to_config_file) as f:
        data = json.load(f)

    return jsonify({"custom_binaries": data["custom_binaries"]})

@read_app.route('/add_custombin', methods=['POST'])
def add_custombin():
    '''
    Saves name and binary location into config folder

    json format:
    {
        name: string
        path: string
    }
    '''
    content = request.get_json(force=True)
    name = content["name"]
    path = content["path"]
    new_custom_binary = {"name":name, "path":path}
    data = {}
    
    if (os.path.exists(config_file) == True):
        with open(path_to_config_file) as f:
            data = json.load(f)
        data["custom_binaries"].append(new_custom_binary)
    else:
        data = {"installed": [], "custom_binaries": [new_custom_binary]}

    with open(path_to_config_file, 'w') as outfile:
        json.dump(data, outfile)


@read_app.route('/getApplist', methods=['POST'])
def read_list():
    '''
    Returns a list of applications installed
    Returns a list of custom binaries installed.

    json format:
    {
        application_list: {names:string}
        custom_binaries: {names:string}
    }

    '''

    with open(path_to_config_file) as f:
        data = json.load(f)
    
    application_list = []
    orchestra_webapps = data["installed"]
    execute_factory = FactoryExecutor()
    platform_exec = execute_factory.create(sys_platform)
      
    try:
        dev = platform_exec.read_native_app_list()
        for applist in dev:
             application_list = application_list + list(applist.keys())        
            # To remove duplicates
        application_list = list(set(application_list))
            #todo:
            #Add code which reads custom binaries and add to list
    except:
        return {"status": False, "message": "Failed to read app list", "applets": []}

    payload = {
        "application_list": application_list,
        "orchestra_apps": orchestra_webapps
    }

    return jsonify(payload)
    
