//Code that checks if a device is registered in orchestra device-service microservice
//Code that checks adds a device if its not registered in orchestra device-service microservice
//Code that removes a device if its added in the orchestra device-service microservice.

import axios from "axios";
import { store } from "renderer/store/store";
import { device_type_to_arr, get_device_info } from "../deviceInfo/getDeviceInfo";



//Check Device Registration
async function checkDeviceRegistration(){

    //Pause execution
    const [deviceUUID, platform, hostname] = await get_device_info() //Future?: Move device_info into redux state. non-changing
    const auth_token = store.getState().app_reduce.auth;
    const user_id = auth_token.auth_token?.localId;

    //Device Information.
    console.log(deviceUUID, platform, hostname)
    console.log(auth_token)
    console.log(user_id)

    /*
    const check_device = axios.post("/api/devices/getOneDevice", {
        "userId": user_id,
        "deviceId": deviceUUID
    }).then((res:any) => {
        console.log("Successful Response. Read Device");
        console.log(res);
        if("data" in res){
            console.log(res["data"]);
         //   auth_status =  res["data"]
        }
    }).catch((res_error:any) => {
        console.log(res_error);
    
    })
    const blocker = await check_device;
    console.log("Finished running get checkDeviceRegistration: Returning result to caller");
    */
   
    return;
}


//Register Current Device.
async function registerDevice(){
    //Pause execution
    let [deviceUUID, platform, hostname] = await get_device_info() //Future?: Move device_info into redux state. non-changing
    let auth_token = store.getState().app_reduce.auth;
    let user_id = auth_token.auth_token?.localId;
    platform = device_type_to_arr(platform);

    const payload = {
        bots: [],
        created: Date.now(),
        deviceId: deviceUUID,
        description: "Device added via Cognitavit.",
        platform: platform,
        name: hostname,
        status: true,
        userId: user_id,  
    }

    console.log(payload)

    const add_device = axios.post("http://localhost:8080/api/devices/addDevice", payload)
    .then((res:any /** Promise<AxiosResponse> */) => {
        console.log("Successful Response from addDevice microservice. Service");
        if (res.data.success) {
            console.log(res.data.deviceData);
        }
    }).catch((res_error:any) => {

        console.log(res_error);
    })
    const blocker = await add_device;
    console.log("Finished running get auth status: Returning result to caller");
    return;
}

export {checkDeviceRegistration, registerDevice} 

