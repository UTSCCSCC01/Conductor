from flask import Blueprint, request
import sys, os
from os import path
import requests
import json

AUTHENiCATION_OBJECT = sys.argv[1]
USER_DATA_PATH = sys.argv[2]
DEVICE_ID = sys.argv[4]

userId = AUTHENiCATION_OBJECT
download_app = Blueprint("/download", __name__)
env_userpath = USER_DATA_PATH

CONFIG_NAME = "installed.json"

user_device_getbots = "http://127.0.0.1:3003/api/devices/getInstalledBots"
marketplace_getmetadata = "http://127.0.0.1:5008/get_metadata/"
config_file = path.join(env_userpath, CONFIG_NAME)
downloads_folder = path.join(env_userpath, "downloaded")

@download_app.route('/get_local_bots', methods=['GET'])
def get_local():
    if (os.path.exists(config_file) == True):
            with open(config_file) as f:
                data = json.load(f)
            return {"installed": data["installed"]}

    return {"installed":[]}

@download_app.route('/download_and_install', methods=['POST'])
def download_and_install():
    '''
    Check local config against remote and download and install new bots
    '''

    # Get bots list from remote, compare against local
    payload = {'userId': userId}
    content = requests.get(user_device_getbots, json=payload)
    content = content.json()
    #type(content) == dict

    botsData = content["botsData"]
    r_botslist = []
    for device in botsData:
        if device["deviceId"] == DEVICE_ID:
            for i in range(len(device["bots"])):
                r_botslist.append(device["bots"][i][0])

    data = {}
    to_install = []
    if (os.path.exists(config_file) == True):
        with open(config_file) as f:
            data = json.load(f)
        
        for r_bot in r_botslist:
            flag = True
            for bot in data["installed"]:
                if bot["buid"] == r_bot["buid"]:
                    flag = False
            if(flag):
                to_install.append(r_bot)
    else:
        to_install = r_botslist

    if len(to_install) == 0:
        return "<p> Nothing new to install </p>"

    bot = to_install[0]
    buid = bot["buid"]
    content = requests.get(marketplace_getmetadata + buid)
    content = content.json()

    for bot in to_install:
        buid = bot["buid"]
        name = bot["name"]

        # Get bot metadata from marketplace
        content = requests.get(marketplace_getmetadata + buid)
        content = content.json()
        url = content["url"]
        filename = content["og_filename"]
        
        path = downloads_folder + "/" + filename
        download(url, path)
        install(buid, name, path)
    
    return "<p>installed " + str(len(to_install)) + " bots successfully</p>"

def download(url, path):
    
    if(os.path.exists(downloads_folder) == False):
        os.makedirs(downloads_folder)
    r = requests.get(url, allow_redirects=True)
    open(path, 'wb').write(r.content)

def install(buid, name, path):
    new_bot = {"buid":buid, "name":name, "path":path}
    data = {}
    if (os.path.exists(config_file) == True):
        with open(config_file) as f:
            data = json.load(f)
        data["installed"].append(new_bot)
    else:
        data = {"installed": [new_bot], "custom_binaries": []}
    
    with open(config_file, 'w+') as outfile:
        json.dump(data, outfile)
