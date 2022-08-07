
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
import internal from 'stream';
import { AuthenticationToken } from '../../types'
import { app } from 'electron';
import { exec, execFile } from 'child_process';
import axios from 'axios';

import process, { kill } from 'node:process';
import { data } from 'autoprefixer';
import { io, Socket } from 'socket.io-client';


class execManager{

    private static instance: execManager;


    //Enviroment Variables
    private static authKeys: AuthenticationToken | undefined;
    public static appData?: string;
    public static platform: string | undefined;
    public static machineID: string;

    //Trigger Process Information
    public static pid: number | undefined;
    public static port: number | undefined;
    private static socket: Socket | undefined;

    //Trigger Status information
    public static WATCHDOG_VIOlATION_BIT: boolean; //Bit will be flipped to true if trigger becomes unresponsive or has been terminated unexpectidly :TODO 
    public static READY: boolean; // Connected=1; Disconnected=0


    //singleton; prevent new operator.
    private constructor() {}

    public static getInstance(): execManager{
        if(!execManager.instance){
            execManager.instance = new execManager();
        }
        return execManager.instance;
    }

    /*
        Set the necessary information for ipc between electron and python
        It also sets the required information for which the python executable
        needs such as saved data etc.
    */
    private static setEnviromentVariables(authKey: any, appdata_folder: string, platform: string, port:number, machineID:string){
        execManager.authKeys = authKey;
        execManager.appData = appdata_folder + "\\" + authKey.localId;
        execManager.platform = platform;
        execManager.port = port;
        execManager.machineID = machineID
    }


    //Sends a signal to the executor to perform a task. 
    public sendSignal(signal: string, buffer: string){
        if(execManager.socket == undefined){
            return -1;
        }
        execManager.socket?.emit(signal,buffer);
        return 1;
    }


    //Returns a <Promise> for a requests, which will propogate to the render process. 
    public async sendRequest(route: string, body: any){
        //Assume all methods are posts
        let result;

        let url = "http://localhost:5000/" + route;
        console.log(url, " BODY: ", body)
        try{
            result = await axios.post(url, body);
            result = result.data;
        }catch{
            //out of range. 
            result = undefined;
            console.log("error fetching information.");
        }

        return await result;
    }

    /*
        Set the necessary information for ipc between electron and python
        It starts the trigger process, and connects to it via socket.io ipc.
        Failure event managements needs to be done: TODO:
    */
    public start(auth_token:any /*AuthenticationToken*/, appdata_folder: string, platform: string, executable:string, machineID:string){
        if(auth_token == undefined|| appdata_folder == undefined || executable == undefined){
            console.log("Set the authentication keys/data_path before starting");
            return;
        } 
        // Clear state before starting.
        this.resetConfigs();
        // Set authentication keys
        execManager.setEnviromentVariables(auth_token.localId, appdata_folder, platform, 5000, machineID);
        const child = execFile(executable, [auth_token.localId ,String(execManager.appData), platform, machineID]);
        if(!child.pid){
            ; // nop operator


            //;return false;
        }
        // Start the socket server. The cognitavit client will connect to the trigger server 
        //
        execManager.socket = io("http://localhost:5000", {
            autoConnect: false
        });
        // Starts the socket
        execManager.socket.connect();
        // Add the event listeners
        execManager.socket.on("connect", () => {
            execManager.READY = true;
        });
        //PID set; 
        execManager.pid = child.pid;
        console.log(execManager.pid);
        return true
    }



    public resetConfigs(){
        //This kills the trigger service, since the trigger service will self distruct.
        if(execManager.socket != undefined){
            try{
                execManager.socket.disconnect();
                execManager.socket.close();
            }catch{
                execManager.socket.close();
            }
        }

        execManager.socket = undefined;
        execManager.READY = false;
        execManager.WATCHDOG_VIOlATION_BIT = false;

        execManager.pid = undefined
        execManager.port =  undefined

        execManager.authKeys = undefined;
        execManager.appData = undefined;
        execManager.platform = undefined;
        execManager.machineID = "";

        console.log("Trigger Socket has kill signal")
    }
}

export { execManager }
