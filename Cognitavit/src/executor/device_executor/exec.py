from abc import ABC, abstractclassmethod

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

    @abstractclassmethod
    def bot_exec(self, params:str) ->None:
        '''Executes a bot application from the orchestra webstore'''

    