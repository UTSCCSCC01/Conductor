
/* 
    Manages the lifecycle of the executor-python
    
    Requirements:
    -1) Upon succesful authenticaiton, run the executor in the background. 
    -2) Pass in enviroment variables such as auth keys, platform, saved session storage location. 
    -3) When user logs out, disconnect from server and dispose the executor object. 
    
    Operations:
        Must be a singleton. 
*/

//Handles for executor.py

/* 
    These are all routes in the exector.py file
    Getters

    1. get_app_list -> returns a list applications running, and list of custom binaries
    2. get_store_list -> returns a list of installed orchestra web applications [BOTS]
    3. get_status_exec -> returns true [if anything else then python executors not running]

    Execution fxns
    1. execute_app(event) -> executes a event, and sends a status report to the status-aggregator microservice
    2. uninstall_app(event): remove shortcut + any leftover binaries. 
    2. refresh_bot_list(event) -> get list of bots from user-device, compare with internal, and install. (install means adding a shortcut to /cognitavit/userid/storeapps/<shortcut>) 
    3. refresh_appList(event) -> gets list of applications/custom binaries and send a update to orchestra user-device service with new list of apps installed + binaries
    4. execute_app(name) -> executes a app.
 

*/
