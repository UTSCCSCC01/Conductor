import { useState } from "react";
import { store } from "renderer/store/store";

import { registerDevice } from "renderer/utils/deviceRegister/deviceReg";



const Setting = () => {

    const [deviceUUID, setDeviceUUID] = useState("Loading")
    const [platform, setPlatform] = useState("Loading")
    const [hostname, setHostname] = useState("Loading")

    const authToken = store.getState().app_reduce.auth;
    const localid = authToken.auth_token?.localId

    Promise.all([window.registration_device.get_device_id(), window.registration_device.get_platform(), window.registration_device.get_hostname()])
    .then(([device_id, device_plat, deivce_hostname]) => {
        setDeviceUUID(device_id);
        setPlatform(device_plat);
        setHostname(deivce_hostname);
    })
    

    return (
        <div className="homepage-container">
            <p>I am the Setting page</p>
            
            <h1>Device information</h1>
            <p>Device Platform is {platform}</p>
            <p>Unique Device ID is: {deviceUUID}</p>
            <p>Device Hostname is {hostname}</p>
            <p>Account Userid is {localid}</p>

            <button onClick={registerDevice} >Register Device.</button>
        </div>
    )
}

export default Setting;