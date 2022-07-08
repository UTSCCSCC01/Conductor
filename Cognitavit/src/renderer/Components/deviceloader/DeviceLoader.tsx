import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/logo.png'
import { getAuth } from 'renderer/utils/auth/getAuth';
import { store } from 'renderer/store/store';

import { BarLoader } from 'react-spinners';
import './DeviceLoader.css'
import { get_device_id } from 'main/utils/deviceinfo/deviceInfo';

import { checkDeviceRegistration, registerDevice } from "renderer/utils/deviceRegister/deviceReg";



const DeviceLoader = () => {
    const [deviceInfoLoaded, setDeviceInfoLoaded] = useState(false); 
    const [deviceProfileLoaded, setdeviceProfileLoaded] = useState(false); 
    const [message, setMessage] = useState("Preloader Started.")
    const [preloaderState, setPreloaderState] = useState(0);

    const [finishDeviceLoader, setFinishDeviceLoader] = useState(false);  

    //Executes all our loaders. 
    const bootstrap_loader = (state: Number) => {
        //Precondition: Device information has been loaded in redux state.
        setTimeout(() => {
            console.log(state);
            switch(state){
                case -1:
                    //Critical Error Abort.
                    //Navigate to dashboard, but set redux state to auto_recover 
                    //Upon reconnection, refresh the redux state. 
                    break;
                case 0:
                    device_register();
                    break;
                default:
                    setFinishDeviceLoader(true);
                    break;
            }
        },3000)
    }


    let device_register = () => {
         Promise.all([checkDeviceRegistration(), registerDevice()])
        .then(([dev_status,reg_device]: (string|boolean)[]) => {
            console.log(dev_status, reg_device);
            if(dev_status === "none"){
                setMessage("Cannot establish a server connection");
                toast.error("Cannot establish a server connection");
                setPreloaderState(-1);
                //return false;
            }else if(dev_status == "found"){
                toast.success("Device Profile has been loaded");
                //Move to stage 1.
                setPreloaderState(preloaderState+1);
                /*Code that injects device profile into redux.
                    Todo:
                */
            }else if(dev_status == "not found"){
                if(reg_device){
                    toast.success("Device has been registered");
                    /*Code that injects device profile into redux.
                        Todo:
                    */
                    //Move to stage 2.
                    setPreloaderState(preloaderState+1);
                }else{
                    toast.error("Cannot register device");
                    setPreloaderState(-1);
                }
            }else{
                //Undefined behavior
                setPreloaderState(-1);
                console.log("Undefined behavior has somehow been involked. ");
            }
            bootstrap_loader(preloaderState+1); //state variables are updated upon rerender.
        })
    }
    
    
    useEffect(() => {
        //Preloader: Read device information, and store in redux store.
        setMessage("Reading Device Information")
        Promise.all([window.registration_device.get_device_id(), window.registration_device.get_platform(), window.registration_device.get_hostname()])
            .then(([device_id, device_plat, device_hostname]) => {
            store.dispatch({
                type: "setDeviceDetails",
                payload: {
                    platform: device_plat,
                    hostname: device_hostname,
                    deviceUUID: device_id,
                }  
            });
            setDeviceInfoLoaded(true);
            //execute the bootstrap_loader
            bootstrap_loader(preloaderState);
        });
    },[]);


    if(finishDeviceLoader){
        return <Navigate to="/dashboard/home"/>
    }

    return (
        <div className = "device-loader">
            <div className="logo">
                <img src={logo} width="225px" alt="Orchestra Logo" />
            </div>

            <div className='status-container'>
                <BarLoader width={200} />
                <p className='status-message'>{message}</p>
                <p> Preloader State {preloaderState}</p>
            </div>
        </div>
    )
};

export default DeviceLoader;
