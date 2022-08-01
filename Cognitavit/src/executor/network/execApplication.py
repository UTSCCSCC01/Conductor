from platform import platform
from flask import Blueprint, jsonify, request
from execFactory import FactoryExecutor

exec_app = Blueprint("/execute", __name__)
sys_platform = 'win'


@exec_app.route('/executeApp', methods=['GET', 'POST'])
def execute_application():
    '''
    Executes an application with params

    request_format:
    {
        application_name: ...
        argument: ...
    }


    return format: 
    json format:
    {
        success: True/False
        date: CURRENT_DATE
        appname: APPLICATION_NAME
        argz: ARGUMENTS
    }

    '''
    
    #Do error checking later. 
    event = request.json


    applet_name = event["application_name"]
    arguments = event["arguments"]


    execute_factory = FactoryExecutor()
    platform_exec = execute_factory.create(sys_platform)

    platform_exec.execute(applet_name, arguments)


    return {"status": True}
    

@exec_app.route('/send-event', methods=['GET', 'POST'])
def execute_event():
    '''
    Executes an event

    
    '''

    return {"status": True}
