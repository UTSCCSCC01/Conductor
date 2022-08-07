from abc import ABC, abstractclassmethod
import subprocess
import os, sys
import json

AUTHENiCATION_OBJECT = sys.argv[1]
USER_DATA_PATH = sys.argv[2]
DEVICE_ID = sys.argv[4]
userId = AUTHENiCATION_OBJECT
env_userpath = USER_DATA_PATH
CONFIG_NAME = "installed.json"
config_file = env_userpath + "/" + CONFIG_NAME

class Executor(ABC):
    
    @abstractclassmethod
    def read_native_app_list(self) -> None:
        ''' Returns a list of apps natively installed apps on this machine, alongside the binary location.
        '''
        pass
    
    @abstractclassmethod
    def read_orchestra_app_list(self) -> dict:
        ''' Returns a list of currently installed bots from the orchestra web store on this machine
            along side the binary location. The directory is stored in the userapp storage as a json file.
        '''
        pass

    @abstractclassmethod
    def native_exec(self, name:str, params:str, applist:dict) -> None:
        '''Executes a native application with optional launch params'''

    @abstractclassmethod
    def execute(self, name:str, params:str) ->None:
        '''Wrapper for native_exec'''

    
    def bot_exec(self, buid:str, args:str):
        if (os.path.exists(config_file) == True):
            with open(config_file) as f:
                data = json.load(f)
            
            for bot in data["installed"]:
                if bot["buid"] == buid:
                    path = bot["path"]
                    args = args.split() + [path] 
                    #return {"to_run": args}
                    output = subprocess.Popen(args, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, universal_newlines=True)
                    outdata = output.stdout.read()
                    print(outdata, file=sys.stderr)
                    return {"result": outdata}


    