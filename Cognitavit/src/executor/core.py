'''
python-electron executor
A tool used to read applet list and execute applications based on name or applet id. 

-
This app lifecycle is managed by electron.
Upon startup the follow enviroment variables are set.

APPDATA = "path_to_save_data/<userid>/
ie: the path will look like this  -> C:/path_to_shared_secret/cognitavit/userid/

inside the userid folder we have the following 

Folder content:
/orchestra_webapps: A folder which consists of shortcuts to the actual binaries. [Located in the download folder] 
/custom_binaries: A folder which consits of shortcut to bots detail. [Located in random place in drive. (which is why its a shortcut)]
/downloads: A place where downloaded items are stored.  
web_app.config: config file of what orchestra web bots are installed.

You may assume that you are already inside the userid/ folder

'''

from platform import platform
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit

import json, os, signal

from engineio.async_drivers import threading



import requests

#Import Routes from network 
from network.readApplication import read_app as readApplication
from network.execApplication import exec_app as execApplication
from network.downloadApplication import download_app as downloadApplication
# To read the enviroment variables
import sys

port_start = 5000

AUTHENiCATION_OBJECT = None
USER_DATA_PATH = None
PlATFORM_START = None




if sys.argv.__len__() > 1:
    try:
        AUTHENiCATION_OBJECT = sys.argv[1]
    except:
        print("failed to read json object")
    USER_DATA_PATH = sys.argv[2]
    PlATFORM_START = sys.argv[3]


app = Flask(__name__)
socketio = SocketIO(
            app,
            async_mode="threading"
        )


app.register_blueprint(readApplication)
app.register_blueprint(execApplication)
app.register_blueprint(downloadApplication)

# Import Application flags

@app.route('/is_alive', methods=['POST'])
def alive():
    return {"status": True}


@app.route('/kill', methods=['POST'])
def kill():
    os.kill(os.getpid(), signal.SIGINT)

@app.route('/enviroment', methods=['POST'])
def enviroment():
    return str([AUTHENiCATION_OBJECT, USER_DATA_PATH, PlATFORM_START])
 
@socketio.event
def connect():
    print("I'm connected!")

@socketio.event
def disconnect():
    print("Cognitavit disconnected. Im gonna die now.")
    os.kill(os.getpid(), signal.SIGINT)

if __name__ == '__main__':
    socketio.run(app,host="0.0.0.0", port=port_start,debug=True)
