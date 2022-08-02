from abc import ABC, abstractclassmethod
import json
import subprocess
from Cognitavit.src.executor.core import USER_DATA_PATH

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

    def bot_exec(self, params:str) ->None:
        '''Executes a bot application from the orchestra webstore.
           Params format is arg1 arg2 buid'''
        params = params.split()
        args = []
        if len(params) > 1:
            args = params[:-1]
        buid = params[-1]
        config_file = USER_DATA_PATH + '/installed.json'
        with open(config_file) as f:
            data = json.load(f)
        
        path = ""
        for entry in data["installed"]:
            if entry["buid"] == buid:
                path = entry["path"]
                break
        args.append(path)
        subprocess.run(args)

    