import { useState } from "react";
import { store } from "renderer/store/store";

import { checkDeviceRegistration, registerDevice } from "renderer/utils/deviceRegister/deviceReg";



const Setting = () => {


    const [isreg, setIsReg] = useState("Loading")

    const authToken = store.getState().app_reduce.auth;
    const localid = authToken.auth_token?.localId
    const deviceUUID = store.getState().app_reduce.devinfo.deviceInfo?.deviceUUID;
    const platform = store.getState().app_reduce.devinfo.deviceInfo?.platform;
    const hostname = store.getState().app_reduce.devinfo.deviceInfo?.hostname;

  
    const test = async () => {
        const value = checkDeviceRegistration();
        value.then((res)=>{
            setIsReg(res);
        })
    }

    return (
        <div className="homepage-container">
            <p>This is a testing Page</p>
            <p>I am the Setting page</p>
            
            <h1>Device information</h1>
            <p>Device Platform is {platform}</p>
            <p>Unique Device ID is: {deviceUUID}</p>
            <p>Device Hostname is {hostname}</p>
            <p>Account Userid is {localid}</p>

            <button onClick={registerDevice} >Register Device.</button>

            <button onClick={test}>Check Status</button>

            <p>{isreg}</p>
        </div>
    )
}

export default Setting;