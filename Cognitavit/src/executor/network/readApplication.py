from platform import platform
from flask import Blueprint, jsonify
from execFactory import FactoryExecutor

read_app = Blueprint("/read", __name__)
sys_platform = 'win'


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
    application_list = []
    orchestra_webapps = []
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
    
