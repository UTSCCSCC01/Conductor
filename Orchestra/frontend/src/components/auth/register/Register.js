import { useContext, useEffect, useState } from 'react';

import { Navigate, useNavigate } from 'react-router-dom'; 


import { toast } from 'react-toastify';


import './Register.css'
import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/logo.png'

import {sessionStorage_get, sessionStorage_save} from '../../../utils/store/store'

import { getAuth } from '../../../utils/auth/getAuth';

const Register = () => {

    //console.log(store);
    //console.log(store.getState().app_reduce.auth)

    //UI related states
    const [email, setEmail] = useState('');
    
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [signedIn, setSignedIn] = useState(false);
    
    //User Toast Notifications
    const confirmFail = () => {toast.error("Password and confirm password do not match.")}
    const confirmSuccess = () => {toast.success("Excellent! Enter your full name, and phone number")}

    const navigator = useNavigate();

    async function HandleRegStage1(event){
        event.preventDefault();
        if(confirmpassword != password){
            setError("Passwords do not match");
            confirmFail();
            return;
        }
        console.log(email, password, confirmpassword);

        //Move to stage 2 of register. 
        let register_details = {
            email: email,
            password: password,
            confirmpassword: confirmpassword,
        }

        confirmSuccess();
        sessionStorage_save("register", register_details)
        navigator("/register/2")
    }

    useEffect(() =>{
        let pulled_reg_info = sessionStorage_get("register");
        if(pulled_reg_info != undefined){
            console.log(pulled_reg_info);
            setEmail(pulled_reg_info.email)
            setPassword(pulled_reg_info.password)
            setConfirmPassword(pulled_reg_info.confirmpassword)
        }
    }, []);

    if(signedIn || sessionStorage_get("auth") != undefined){
        return <Navigate to="/dashboard" />
    }

    //On pageload. 


    return (
        <div className="reg-container">
            <div className="logo">
                <img src={logo} alt="Orchestra Logo" />
            </div>
            
            <div className="login-header">
                    <h1>Sign up</h1>
                    <p>Enter your email and password below</p>
            </div>

            <p className="error-code"> {error} </p>
            <form onSubmit={ event => HandleRegStage1(event)} >

                <div className="auth-input-container">
                    <p>Email</p>
                    <input minlength="6" value = {email} type="email" name="email" onChange = {(e) => {setEmail(e.target.value);}} required placeholder="Email" />
                </div>
                <div className="auth-input-container">
                    <p>Password</p>
                    <input minlength="6" value = {password} type="text" id = "password" name="password" onChange = {(e) => {setPassword(e.target.value)}} required placeholder="Password" />
                </div>
                <div className="auth-input-container">
                    <p>Confirm Password</p>
                    <input minlength="6" value = {confirmpassword} type="text" id = "passwordconfirm" name="confirm_password" onChange = {(e) => { setConfirmPassword(e.target.value)}} required placeholder="Confirm Password" />
                </div>

                <div className="auth-button-container">
                    <button type="submit"  value="Submit">Next</button>
                </div>
            </form>

            <div onClick={() => {navigator("/")}} className='login-bk'>
                <div>Registered? </div>
                <div className='login-bold'> Sign in</div>
            </div>
        {/* <p className="debug">Current User Token State</p> */}
        {/* <p>{(userToken) ? userToken.localId : "null"}</p>*/}
        </div>
    )
};

export default Register;
