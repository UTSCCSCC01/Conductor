from flask import Blueprint, request
import os
import requests
import json
from Cognitavit.src.executor.core import USER_DATA_PATH 

download_app = Blueprint("/download", __name__)
env_userpath = USER_DATA_PATH

CONFIG_NAME = "installed.json"

@download_app.route('/download_and_install', methods=['POST'])
def download_and_install():
    '''
    Given url, filename, bot_name, and buid,
    download binaries from url to userpath/downloads,
    and update userpath/installed.json

    json format:
    {
        url: string
        buid: string
        name: string
        filename: string
    }

    '''
    content = request.get_json(force=True)
    url = content["url"]
    buid = content["buid"]
    name = content["name"]
    filename = content["filename"]
    path = env_userpath + "/downloaded/" + filename
    download(url, filename, env_userpath)
    install(buid, name, path, env_userpath)

def download(url, filename, userpath):
    downloads_folder = userpath + "/downloaded"
    if(os.path.exists(downloads_folder) == False):
        os.makedirs(downloads_folder)
    r = requests.get(url, allow_redirects=True)
    open(downloads_folder + "/" + filename, 'wb').write(r.content)

def install(buid, name, path, userpath):
    new_bot = {"buid":buid, "name":name, "path":path}
    config_file = userpath + "/" + CONFIG_NAME
    data = {}
    if (os.path.exists(config_file) == True):
        with open(config_file) as f:
            data = json.load(f)
        data["installed"].append(new_bot)
    else:
        data = {"installed": [new_bot], "custom_binaries": []}
    
    with open(config_file, 'w+') as outfile:
        json.dump(data, outfile)
