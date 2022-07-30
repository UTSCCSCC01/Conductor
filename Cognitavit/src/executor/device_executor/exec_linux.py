
from device_executor.exec import Executor
import subprocess, os, json
from typing import Tuple

from AppStatus import  AppStatus

ERROR = 0
OUTPUT = 1

# Application Binary classification
APPLICATION_LIST = 0 # Regular program [Assume properly registered to start menu]
FALLBACK_LIST = 1 # Regular program + Windows Store Apps [Hidden]

class LinuxExecutor(Executor):

    def read_native_app_list(self) -> dict:
        ''' Returns a list of apps natively installed apps on this machine, alongside the appid.
        On success returns a list as {"appname1": "appid1", "appname2": "appid2", "appname3", "appid3"}
        Otherwises returns a errorcode
        '''
        fall_back_list = {}
        # echo '"""{' && find /usr/bin -type f -printf '"%P" : "%p"\n' && echo '}"""'
        # echo "\"\"\"{" && find /usr/bin -type f -printf "\"%P\" : \"%p\"\n" && echo "}\"\"\""
        c = 'find /usr/bin -type f -printf \"\\"%P\\" : \\"%p\\", \"'
        rnc = subprocess.check_output(c, shell=True)
        if (len(rnc)): return [json.loads("{" + (rnc.decode('utf-8'))[:-2] + "}"), fall_back_list]
        else: return [{}, fall_back_list]

    def read_orchestra_app_list(self) -> dict:
        ''' Returns a list of currently installed bots from the orchestra web store on this machine
            along side the binary location. The directory is stored in the userapp storage as a json file.
        '''
        return {}





    def locate_binary(self, name:str, exec_app_list:dict[str]):
        '''Returns -1 if binary name cannot be located in app_list. Otherwise return tuple of
        appname, and binary location.
        Works by doing a char match. name is defined from exec_app_list at earlier point in time.
        '''
        print("ran")
        name = name.lower()
        for app in sorted(exec_app_list,key=len):
            application_name = app.lower()
            if (name == application_name):
                return [app, exec_app_list[app]]
        return 0

    def native_exec(self, name:str, params:str, exec_app_list:Tuple[dict,dict], app_type:int) -> AppStatus:
        '''Executes a native application with optional launch params'''
        ar = self.locate_binary(name, exec_app_list[APPLICATION_LIST]) # app rec
        if (not ar):
            ar = self.locate_binary(name, exec_app_list[FALLBACK_LIST])
            if (not ar):
                return -1
        print("Binary located @: " + ar[1])
        try:
            c = ar[0]
            if (len(params)):
                c += " " + params
            subprocess.run(c, shell=True)
            return 1
        except Exception as e:
            return -2


    def execute(self, name:str, params:str) ->None:
        '''Wrapper for native_exec, user does not pass in exec_app_list, but instead the fxn 
        will generate using one of its built in functions'''
        pass


    def bot_exec(self, params) -> None:
        '''Executes a bot application from the orchestra webstore'''
        return {}
