// Code that reports to the webapp that new applications are installed

import axios from "axios";
import { store } from "renderer/store/store";

//Code that updates list of bots
async function sync_application_list() {
    try{
        //Get the values
        let value:any = window.exec_calls.proc_bus(['getApplist', {}]);
        let blocker = await value;

        // UPDATE PAYLOAD TO INCLUDE BOT APPLICATIONS.

        const authToken = store.getState().app_reduce.auth;
        const localid = authToken.auth_token?.localId
        const deviceUUID = store.getState().app_reduce.devinfo.deviceInfo?.deviceUUID;

        //Push the results to the server.
        let payload = {
            "machineId": deviceUUID,
            "userId" : localid,
            "application_list": blocker["application_list"] ,
            "custom_bin": []
        }

        console.log(payload)
  

        let result = axios.post("http://localhost:8080/api/device/syncApps", payload);
        let status = await result;
        console.log("Success: Gathering and uploading application list");
        return true;
    }catch{
        console.log("Failed to gather and upload application list.");
        throw new Error();
    }
}

export { sync_application_list }
