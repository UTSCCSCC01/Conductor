
from ast import arguments
from ctypes import sizeof
from pydoc import locate
from re import A
from shutil import ExecError
from typing import Tuple

import subprocess, os, json

from os import path as os_path
from xmlrpc.client import boolean
from AppStatus import  AppStatus

from device_executor.exec import Executor

ERROR = 0
OUTPUT = 1

#Application Binary classification 
APPLICATION_LIST = 0 #Regular program [Assume properly registered to start menu]
FALLBACK_LIST = 1 #Regular program + Windows Store Apps [Hidden]

ORCHESTRA_STORE_APP = 2 #Orchestra Web Apps
CUSTOM_BINARY_APP = 3 # .lnk files found in CUSTOM_BINARY folder. 


NAME = 0
BINARY_PATH = 1

class WinExecutor(Executor):
    
    #Helper 
    def __fallback_app_list(self)->dict:
        ''''Uses shell:AppFolder to search and execute a program. Unlike default, contains windows store applications.
        Certain Apps that are in this list and not from the windows stores may have execution arguments disabled.
        Use if default method cannot find a specific app
        '''
        ps_script = 'powershell -ExecutionPolicy Bypass "Get-StartApps|convertto-json"'
        exec_ps =  subprocess.getstatusoutput(ps_script)
        app_list = json.loads(exec_ps[OUTPUT])

        #Merge the array of dict elements into a single dictionary. 
        app_list_cleaned = {}
        for app in app_list:
            app_info = {app["Name"]:app["AppID"]}
            app_list_cleaned.update(app_info)

        return app_list_cleaned

    #Helper
    def __default_list_reader(self, path_name:str) -> dict:
        '''helper function that finds all .lnk files in a specific path, and returns a dictionary
        with name and binary path.  
        '''
        application_list = {}
        expanded_path_name =  os_path.expandvars(path_name)

        for path_dir, dirs, files in os.walk(expanded_path_name):
            for app in files:
                if(app.endswith('lnk')):
                    application_name = os.path.splitext(app)[0]
                    binary_path_link = os.path.join(path_dir, app)
                    application_list[str(application_name)] = str(binary_path_link)

        return application_list

    #Helper
    def __startmenu_app_list_reader(self)->dict:
        '''Returns a list of registered installed apps that are shown in the start menu. This does 
        not include apps instlled through the windows store. 
        Redirect and use __fallback_app_list() if execution of windowstore app is required.
        '''
        
        local_path = r'%ProgramData%\Microsoft\Windows\Start Menu\Programs'
        global_path =  r"%AppData%\Microsoft\Windows\Start Menu\Programs"
        local_application = self.__default_list_reader(local_path)
        global_application = self.__default_list_reader(global_path)
        application_list = local_application | global_application

        return application_list


    def read_native_app_list(self) -> dict[dict,dict]:
        ''' Returns a tuple of app_lists that are installed on this machine. The first entry in the 
        tuple is a list of all applications registered with the startmenu. 
        As a fallback, we can refer to the shell:AppFolder, which includes window store applications. 
        '''
        application_list = self.__startmenu_app_list_reader()
        fall_back_list = self.__fallback_app_list()
        return [application_list, fall_back_list]
        

    def read_orchestra_app_list(self) -> dict:
        ''' Returns a list of currently installed bots from the orchestra web store on this machine
            along side the binary location. The directory is stored in the userapp storage as a json file.
        '''
        return {}


    def locate_binary(self,name:str, exec_app_list:dict[str]):
        '''Returns -1 if binary name cannot be located in app_list. Otherwise return tuple of
        appname, and binary location. 
        Works by doing a char match. name is defined from exec_app_list at earlier point in time. 
        '''
        print("ran")
        for app in sorted(exec_app_list,key=len):
            application_name = app.lower()
            name = name.lower()
            if(name in application_name):
                return [app, exec_app_list[app]]
        return None



    def native_exec(self, name:str, params:str, exec_app_list:Tuple[dict,dict], app_type:int) -> AppStatus:
        '''
        '''
        ps_cmd = 'powershell -ExecutionPolicy Bypass Start-Process '
        ps_cmd_arg = ' -ArgumentList '
        binary_location = None
        arguments = params

        if(app_type == APPLICATION_LIST): 
            #Locate from start menu
            binary_location = self.locate_binary(name, exec_app_list[APPLICATION_LIST])
            #If app cannot be found in startmenu, check shell:AppFolder. o/w return -1
            if(binary_location == None):
                binary_location_fallback = self.locate_binary(name, exec_app_list[FALLBACK_LIST])
                if(binary_location_fallback == None):
                    return -1
                else:
                    binary_location = f'shell:AppsFolder\{binary_location_fallback[1]}' 
            else:
                binary_location = f"'{binary_location[1]}'"
      
        #State: application is found, binary path is normalized.
        print("Binary located @: " + binary_location) 

        execution_string = ps_cmd + binary_location + ps_cmd_arg + arguments
        if(len(str(params)) == 0):
            execution_string = ps_cmd + binary_location

        print(execution_string)
        try:
            subprocess.getstatusoutput(execution_string) #memory leak fix
            #subprocess.Popen(execution_string, shell=True)
            return 1
        except Exception as e:
            return -2

    def execute(self, name:str, params:str) ->boolean:
        '''Wrapper for native_exec, user does not pass in exec_app_list, but instead the fxn 
        will generate using one of its built in functions'''
        applist = self.read_native_app_list()
        try:
            self.native_exec(name, params, applist, APPLICATION_LIST)
        except:
            return False
        
        return True
