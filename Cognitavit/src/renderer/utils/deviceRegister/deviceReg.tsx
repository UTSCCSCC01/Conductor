//Code that checks if a device is registered in orchestra device-service microservice
//Code that checks adds a device if its not registered in orchestra device-service microservice
//Code that removes a device if its added in the orchestra device-service microservice.

import axios from "axios";

//Check Device Registration
async function checkDeviceRegistration(userid:string, machineid:string, auth_token: string){
    let auth_status = null;
    const auth_req = axios.post("/api/devices/addDevice", {
        "bots": userid,
        "created": machineid,
        "deviceId":true,
        "description": "",
        "name": "",
        "platform": [0,0,0,0],
        "status": 'true',
        "userID": "",

    }).then((res:any /** Promise<AxiosResponse> */) => {
        console.log("Successful Response from Authentication Service");
        if("data" in res){
            console.log(res["data"]);
            auth_status =  res["data"]
        }
    }).catch((res_error:any) => {
        console.log(res_error);
        auth_status = null;
    })
    const blocker = await auth_req;
    console.log("Finished running get auth status: Returning result to caller");
    return auth_status;
}

//Register Current Device.
async function registerDevice(userid:string, machineid:string, auth_token: string){


    //get DeviceInfo
    //get ReadDeviceApps
    //get authTokens

    
    const auth_req = axios.post("/api/devices/addDevice", {
        "bots": userid,
        "created": machineid,
        "deviceId":true,
        "description": "",
        "name": "",
        "platform": [0,0,0,0],
        "status": 'true',
        "userID": "",

    }).then((res:any /** Promise<AxiosResponse> */) => {
        console.log("Successful Response from Authentication Service");
        if("data" in res){
            console.log(res["data"]);
        }
    }).catch((res_error:any) => {
        console.log(res_error);
    })
    const blocker = await auth_req;
    console.log("Finished running get auth status: Returning result to caller");
    return "finish"
}
