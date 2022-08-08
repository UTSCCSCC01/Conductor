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

@exec_app.route('/executeBot', methods=['GET', 'POST'])
def execute_bot():
    '''
    Executes an application with params

    request_format:
    {
        buid: ...
        arguments: ...
    }

    returns output if any
    '''
    
    content = request.get_json(force=True)
    buid = content["buid"]
    arguments = content["arguments"]

    execute_factory = FactoryExecutor()
    platform_exec = execute_factory.create(sys_platform)
    result = platform_exec.bot_exec(buid, arguments)

    return result
    

@exec_app.route('/send-event', methods=['GET', 'POST'])
def execute_event():
    '''
    Executes an event

    
    '''
    print("inside send-event")
    execute_factory = FactoryExecutor()
    platform_exec = execute_factory.create(sys_platform)
    #result = platform_exec.bot_exec(buid, arguments)

    content = request.get_json(force=True)
    applet_type = content["appletType"]
    applet_arg = content["appletArg"]
    applet = content["applet"]

    if(applet_type == 0): #Web Bot
        print("running bot event")
        platform_exec.bot_exec(applet, applet_arg)
        pass
    
    if(applet_type == 1): #Application 
        print("running app event")
        platform_exec.execute(applet, applet_arg)
        pass

    return {"status": True}
