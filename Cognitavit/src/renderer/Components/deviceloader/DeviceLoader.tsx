import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/logo.png'
import { getAuth, verifyAuth } from 'renderer/utils/auth/getAuth';
import { store } from 'renderer/store/store';

import { BarLoader } from 'react-spinners';
import './DeviceLoader.css'
import { get_device_id } from 'main/utils/deviceinfo/deviceInfo';

import { checkDeviceRegistration, registerDevice } from "renderer/utils/deviceRegister/deviceReg";

import {sessionStorage_save, sessionStorage_get} from '../../utils/webstorage/storage'
import { windowsStore } from 'process';
import { sync_application_list } from 'renderer/utils/appSync/AppSync';


const DeviceLoader = () => {

    /* 
        Device Loader States:
        Stage 0: Entry point to device loader is if the user logins, or page is refreshed.
        Regardless of entry point, we have that sessionstorage auth != undefine or != null.

        Stage 1: Clear redux state, send sigkill to python executor if applicable, clear main process state. 
        Stage 2: Pull auth state from session storage, and verify it using verifyAuth. If good proceed to Stage 2,
        o/w clear sessionstorage state and return to login page. 

        Stage 3: Save auth keys into redux store, pull device information and save into redux store. 
        Stage 4: send signal to main via ipc to start python executor

        Stage 5: send ipc signal to main to start socket connection with orchestra dispatcher

        Stage 6: send ipc signal to main which sends ipc signal to python to get list of apps/custom bin and send back.
        Stage 7: send post request to deviceinfo-aggregator with list of apps/custom bin installed

        Stage 8: Pull device information. 

        <inject future stage/feature loading> 
        
        Stage Final: redirect to dashboard
    
    */

    const navigator = useNavigate();


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
                case 1:
                    init_ipc_subsystems();
                    break;
                case 2: 
                    sync_device_application_list();
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

    let init_ipc_subsystems = () => {
        //precondition: user is authenticated, with valid tokens
        setMessage("Starting IPC,Socket with Trigger,Dispatcher")
        let value = window.exec_calls.init_socket(sessionStorage_get("auth"));

        toast.promise(value,{
            pending: "INITIALIZING SOCKET CONNECTION",
            error: "CONNECTION FAILURE",
            success: "CONNECTED"
        })

        //Check
        /**
         * value.then() :TODO FUTURE
         * 
         */

        console.log("Status connection: FINISHED");
        setPreloaderState(preloaderState+2);

        //TODO: 
        //Init flask-python ipc for executing/getting.s

        bootstrap_loader(preloaderState+2); //state variables are updated upon rerender.

    }
    
    let sync_device_application_list = async () => {
         //precondition: user is authenticated, with valid tokens
         setMessage("Syncing application list with Server")
         let value = sync_application_list();
 
         toast.promise(value,{
             pending: "ATTEMPTING APPLICATION SYNC LIST",
             error: "SYNC FAILED",
             success: "SYNC SUCCESS"
         })
 
         //Check
         /**
          * value.then() :TODO FUTURE
          * 
          */
         console.log("Status connection: FINISHED");
         
         await value;

         setPreloaderState(preloaderState+3);
 
         //TODO: 
         //Init flask-python ipc for executing/getting.s
 
         bootstrap_loader(preloaderState+3); //state variables are updated upon rerender.       
    }

    const verify_state_tokens = async () => {
        const token = sessionStorage_get("auth");
        if(token == null || token == undefined || token == ""){
            toast.error("INVALID AUTH TOKENS IN SESSION STORAGE");
            navigator("/");
            return;
        }

        //Check validity of auth tokens.
        let result = await verifyAuth(token);

        if(result == undefined || result == null){
            console.log("verifyAuth returned null??.");
            return false;   
        }

        return result.auth; 
    }
    
    /* Reads the device information and store in the redux store*/
    const device_loader_entry = () => {
        //Preloader: Read device information, and store in redux store.
        setMessage("Reading Device Information");
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
    }

    

    useEffect(() => {
        //Clears the redux store, and terminate any executors via sigkill. 
        toast.info("Clearing app state");
        setMessage("performing init state");
        store.dispatch({
            type: "removeAuth",
            payload: undefined
        })

        store.dispatch({
            type: "removeDeviceDetails",
            payload: undefined
        })

        toast.info("Verifying authentication tokens");
        setTimeout( () =>{
            let result = verify_state_tokens().then((auth_validity:any) => {
                if(!auth_validity){
                    //Remove the auth keys
                    toast.error("Authentication tokens in session storage expired or invalid");
                    sessionStorage_save("auth", undefined);
                    navigator("/");
                }else{
                    toast.success("Authentication tokens are validated");
                    let token_final = sessionStorage_get("auth");
                    store.dispatch({
                        type: "setAuth",
                        payload: token_final
                    });
                    device_loader_entry();
                }

            })
        }, 3000);
    },[]);


    if(finishDeviceLoader){
        navigator("/dashboard/home");
        //return <Navigate to="/dashboard/home"/>
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
