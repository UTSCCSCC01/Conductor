from array import array


class AppStatus():
    def __init__(self, status:int, debugCode:int, message:str, moduleLocation: str, exceptionNotice: str, date:str, functionArgs: list[str]) -> None:
        '''When a procedure fails. Used for debugging purposes. '''
        self.functionArgs = functionArgs
        self.status = status
        self.debugCode = debugCode
        self.message= message
        self.moduleLocation = moduleLocation
        self.exceptionNotice = exceptionNotice
        self.date = date
       