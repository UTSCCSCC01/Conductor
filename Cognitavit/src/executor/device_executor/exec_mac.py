
from device_executor.exec import Executor
import subprocess, os, json

ERROR = 0
OUTPUT = 1

class MacExecutor(Executor):
  

    def read_native_app_list(self) -> dict:
        ''' Returns a list of apps natively installed apps on this machine, alongside the appid.

        On success returns a list as {"appname1": "appid1", "appname2": "appid2", "appname3", "appid3"}
        Otherwises returns a errorcode
        '''
        return {}


    def read_orchestra_app_list(self) -> dict:
        ''' Returns a list of currently installed bots from the orchestra web store on this machine
            along side the binary location. The directory is stored in the userapp storage as a json file.
        '''
        return {}

    def native_exec(self, name:str, params:str, applist: dict) -> None:
        '''Executes a native application with optional launch params'''
        return

    def bot_exec(self, params) -> None:
        '''Executes a bot application from the orchestra webstore'''
        return {}
