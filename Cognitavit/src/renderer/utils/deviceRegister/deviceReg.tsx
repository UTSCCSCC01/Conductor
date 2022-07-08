//Code that checks if a device is registered in orchestra device-service microservice
//Code that checks adds a device if its not registered in orchestra device-service microservice
//Code that removes a device if its added in the orchestra device-service microservice.

import axios from "axios";
import { store } from "renderer/store/store";
import { get_device_info } from "../deviceInfo/getDeviceInfo";



//Check Device Registration
//Todo: Add types for expected recieve type from database.


async function checkDeviceRegistration(){
    let status: string;
    status = 'none';
   
    const payload = {
        userId: store.getState().app_reduce.auth.auth_token?.localId,
        deviceId: store.getState().app_reduce.devinfo.deviceInfo?.deviceUUID,
    }

    //Send post request to device microservice
    const check_reg = axios.post('http://localhost:8080/api/devices/getOneDevice',payload)
    .then((res:any)=>{
        status = res["data"]["status"];
    }).catch((err:any) => {
        if(err.response.data == undefined){ //server not responded
            status = 'none'
        }else if("status" in err.response["data"]){
            status = err.response["data"]['status'];
        }else{
            console.log("Undefined behavior has occured!");
        }
    })

    const blocker = await check_reg;
    //console.log(status);
    return status;
}


//Register Current Device.
async function registerDevice(){
    //Pause execution
    let [deviceUUID, platform, hostname] = await get_device_info() //Future?: Move device_info into redux state. non-changing
    let auth_token = store.getState().app_reduce.auth;
    let user_id = auth_token.auth_token?.localId;

    let status_reg: boolean;
    status_reg = false;

    const payload = {
        deviceId: deviceUUID,
        description: "Device added via Cognitavit.",
        platform: platform,
        name: hostname,
        userId: user_id,          
    };

    console.log(payload)

    const add_device = axios.post("http://localhost:8080/api/devices/addDevice", payload)
    .then((res:any /** Promise<AxiosResponse> */) => {
        console.log("Successful Response from addDevice microservice. Service");
        if (res.data.success) {
            console.log(res.data.deviceData);
            status_reg = true;
        }
    }).catch((res_error:any) => {
        console.log(res_error);
    })
    const blocker = await add_device;

    return status_reg;
}

export {checkDeviceRegistration, registerDevice} 

