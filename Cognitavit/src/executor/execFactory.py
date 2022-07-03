from device_executor.exec_win import WinExecutor
from device_executor.exec_mac import MacExecutor
from device_executor.exec_linux import LinuxExecutor
from device_executor.exec import Executor

class FactoryExecutor():
    def __init__(self) -> None:
        pass

    
    def create(self, platform: str) -> Executor:
        device_type = platform.lower().strip()
        if(device_type == 'win'):
            return WinExecutor()
        elif(device_type == 'linux'):
            return LinuxExecutor()
        elif(device_type == 'mac'):
            return MacExecutor()
        else:
            return -1
    
    