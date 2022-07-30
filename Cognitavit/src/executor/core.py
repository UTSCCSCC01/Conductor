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

from flask import Flask, request, jsonify

#Import Routes from network 
from network.readApplication import read_app as readApplication
from network.execApplication import exec_app as execApplication


# To read the enviroment variables
import sys


port = 0
if sys.argv.__len__() > 1:
    port = sys.argv[1]


app = Flask(__name__)

app.register_blueprint(readApplication)
app.register_blueprint(execApplication)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000,debug=True)