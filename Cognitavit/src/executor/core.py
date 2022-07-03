from time import sleep
from execFactory import FactoryExecutor


def print_list(list):
    for item in list:
        print(item + " " + list[item])


#Create factory executor
execute_factory = FactoryExecutor()
#Return an executor object
platform_exec = execute_factory.create('win')
dev = platform_exec.read_native_app_list()
#  def native_exec(self, name:str, params:str, exec_app_list:Tuple[dict,dict], app_type:int) -> AppStatus:

print_list(dev[0])
print("End of dev0 list")

print_list(dev[1])
print("End of dev1 list")



#test a system command
#ps = platform_exec.native_exec("terminal", r" 'shutdown', '/s' ", dev, 0)
#sleep(3)

#Regular App
ps = platform_exec.native_exec("chrome", r"https://www.youtube.com/watch?v=dQw4w9WgXcQ", dev, 0)
sleep(3)

#Windows Store App

ps = platform_exec.native_exec("notepad", r"C:\Users\Seron\Desktop\test.txt", dev, 0)
sleep(3)
#Windows Store App
ps = platform_exec.native_exec("player", r"C:\Users\Seron\Desktop\pro_battles.177886dc.mp3", dev, 0)
sleep(3)

#Windows Store App
ps = platform_exec.native_exec("clock", r"", dev, 0)
sleep(3)

#Installed App
ps = platform_exec.native_exec("discord", r"", dev, 0)
sleep(3)


#Installed App
ps = platform_exec.native_exec("edge", r"", dev, 0)
sleep(3)

#test a system command
ps = platform_exec.native_exec("terminal", r" 'shutdown', '/s' ", dev, 0)
sleep(3)

#cancel the restart
ps = platform_exec.native_exec("terminal", r" 'shutdown', '-a' ", dev, 0)


print(ps)

