import { windowsStore } from "process";
import { useState } from "react";
import { store } from "renderer/store/store";

import { checkDeviceRegistration, registerDevice } from "renderer/utils/deviceRegister/deviceReg";



const Setting = () => {


    const [isreg, setIsReg] = useState("Loading")
    const [applist, setAppList] = useState("No Apps installedd") //Remove later

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

        const applist = window.exec_calls.proc_bus(["enviroment", ""])
        applist.then((res) => {
            console.log(res);
            setAppList(res);
        })

    }

    return (
        <div className="homepage-container">

        <div className="device-info-header">
            <h1>Device Information</h1>
        </div>

        <div className="container-information">
            <div className = "header">
                Platform Information
            </div>
            <div className="image">
                <p>image</p>
            </div>
            <div className="platform-info">
                <p>Device Platform is {platform}</p>
                <p>Device Hostname is {hostname}</p>
               {/*  <p>Unique Device ID is: {deviceUUID}</p>*/}
            </div>
        </div>
        <br></br>
        <br></br>
        <div className="container-information">
            <div className = "header">
                Cognitavit Information
            </div>
            <div className="image">
                <p>image</p>
            </div>
            <div className="platform-info">
                <p>Build Number: 3.10</p>
                <p>IPC Connection: Successful</p>
                {/*<p>Unique Device ID is: {localid + '.' + deviceUUID}</p>*/}
            </div>
        </div>


        <br>
        </br>
        <br></br>
        <br></br>


        <div className="container-information">
            <div className = "header">
                Orchestra Dispatcher
            </div>
            <div className="image">
                <p>image</p>
            </div>
            <div className="platform-info">
                <p>Build Number: 3.10</p>
                <p>IPC Connection: Successful</p>
                {/* <p>Unique Device ID is: {localid + '.' + deviceUUID}</p> */}
            </div>
        </div>


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

        <br></br>
        <br></br>
        <div className="container-information">
            <div className = "header">
                Orchestra Dispatcher
            </div>
            <div className="image">
                <p>image</p>
            </div>
            <div className="platform-info">
                <p>Build Number: 3.10</p>
                <p>IPC Connection: Successful</p>
                {/* <p>Unique Device ID is: {localid + '.' + deviceUUID}</p> */}
            </div>
        </div>

    </div>
    )
}

export default Setting;