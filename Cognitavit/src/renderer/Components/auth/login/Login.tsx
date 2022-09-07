import { useContext, useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom'; 

import { toast } from 'react-toastify';


import './Login.css'
import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/logo.png'

import { store } from '../../../store/store'
import { getAuth } from 'renderer/utils/auth/getAuth';

import {sessionStorage_save, sessionStorage_get} from '../../../utils/webstorage/storage';



const Login = () => {
    
    //console.log(store);
    //console.log(store.getState().app_reduce.auth)
    //UI related states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [signedIn, setSignedIn] = useState(false);
    
    //User Toast Notifications
    const serverOffline = () => {toast.error("Authentication service is not avaliable.")}
    const authFailure = () => {toast.error("Incorrect Username or password.")}
    const authSuccess = () => {toast.success("Authentication was Successful")}


    async function handleAuthFromSubmission(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log(email, password);
        //Call logic that checks for authentication. 
        let result =  await getAuth(email, password); //result will block until getAuth completes its value. 
        console.log("Inside handleAuthFromSubmission Results:" + result);
        
        if(!result){
            setError('Incorrect Username or password');
            authFailure()
            console.log("Fauilure: " + result);

            store.dispatch({
                type: "removeAuth",
                payload: undefined
            })

            store.dispatch({
                type: "removeDeviceDetails",
                payload: undefined
            })

        }else{
            console.log(result);
            sessionStorage_save("auth", result);
            authSuccess(); //set the toast notification
            setSignedIn(true);    
        }
    }
    
    useEffect(() => {
        window.exec_calls.destroy_socket();
    },[])

    //when page gets refreshed/or logged in via rerender
    if(signedIn || sessionStorage_get("auth") != undefined){
        return <Navigate to="/deviceloader" />
    }

    return (
        <div className="login-container">
            <div className="logo">
                <img src={logo} alt="Orchestra Logo" />
            </div>
            
            <div className="login-header">
                    <h1>Sign in</h1>
                    <p>Enter your email and password below</p>
            </div>

            <p className="error-code"> {error} </p>
            <form onSubmit={handleAuthFromSubmission} >

                <div className="auth-input-container">
                    <p>Email</p>
                    <input type="text" name="email" onChange = {(e) => {setEmail(e.target.value)}} required placeholder="Email" />
                </div>
                <div className="auth-input-container">
                    <p>Password</p>
                    <input type="text" name="password" onChange = {(e) => {setPassword(e.target.value)}} required placeholder="Password" />
                </div>

                <div className="auth-button-container">
                    <button type="submit"  value="Submit">Sign in</button>
                </div>
            </form>
        {/* <p className="debug">Current User Token State</p> */}
        {/* <p>{(userToken) ? userToken.localId : "null"}</p>*/}
        </div>
    )
};

export default Login;
