import { useContext, useEffect, useState } from 'react';

import { Navigate, useNavigate } from 'react-router-dom'; 


import { toast } from 'react-toastify';

import {regUser} from '../../../utils/auth/regUser'
import './Register.css'
import 'react-toastify/dist/ReactToastify.css';
import logo from './assets/logo.png'

import {sessionStorage_get, sessionStorage_save} from '../../../utils/store/store'

import { getAuth } from '../../../utils/auth/getAuth';

const Register2 = () => {

    //console.log(store);
    //console.log(store.getState().app_reduce.auth)

    //UI related states
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');

    const [error, setError] = useState('');

    
    //User Toast Notifications
    const serverOffline = () => {toast.error("Authentication service is not avaliable.")}
    const authFailure = (e) => {toast.error(e)}
    const authSuccess = () => {toast.success("Registration is Successful")}



    const navigator = useNavigate();

    async function handleAuthFromSubmission(event){
        event.preventDefault();

        //By multiple preconditions, we know this state is valid.
        let register_details_payloadA = sessionStorage_get("register");

        let data_send_payload = {
            email: register_details_payloadA.email,
            password: register_details_payloadA.password,
            firstname: firstname,
            lastname: lastname,
            phonenumber: phonenumber
        }

        let result = await regUser(data_send_payload);
 

        if(result == undefined){
            serverOffline();
        }else if(result.hasOwnProperty("idToken")){
            sessionStorage_save("auth", result);
            authSuccess();
            navigator("/dashboard")
        }else{
            authFailure(result);
        }

    }


    useEffect(()=>{
        //Get previous state. 
        let pulled_reg_info = sessionStorage_get("register2");
        if(pulled_reg_info != undefined){
            setFirstName(pulled_reg_info.firstname)
            setLastName(pulled_reg_info.lastname)
            setPhoneNumber(pulled_reg_info.number)
        }
    },[])

    const go_previous = () => {
        let register_details = {
            firstname: firstname,
            lastname: lastname,
            number: phonenumber,
        }
        sessionStorage_save("register2", register_details)
        navigator("/register")
    }

    console.log(sessionStorage_get("register"), sessionStorage_get("register2"))
    if(sessionStorage_get("register") == undefined){
        navigator("/register")
    }

    if(sessionStorage_get("auth") != undefined){
        return <Navigate to="/dashboard" />
    }

    return (
        <div className="reg-container" id = "reg-contain2">
            <button className='previous-page' onClick={() => {go_previous()}}>Previous</button>
            <div className="logo">
                <img src={logo} alt="Orchestra Logo" />
            </div>
            
            <div className="login-header">
                    <h1>Sign up</h1>
                    <p>Enter your email and password below</p>
            </div>

            <p className="error-code"> {error} </p>
        
            <form onSubmit={ event => handleAuthFromSubmission(event)} >

                <div className="auth-input-container">
                    <p>First name</p>
                    <input value ={firstname} type="text" name="firstname" onChange = {(e) => {setFirstName(e.target.value)}} required placeholder="First name" />
                </div>
                <div className="auth-input-container">
                    <p>Last name</p>
                    <input value={lastname} type="text" name="lastname" onChange = {(e) => {setLastName(e.target.value)}} required placeholder="Last name" />
                </div>
                <div className="auth-input-container">
                    <p>Phone Number</p>
                    <input value={phonenumber} type="tel" name="phonenumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange = {(e) => {setPhoneNumber(e.target.value)}} required placeholder="Phone Number" />
                </div>

        
                <div className="auth-button-container">
                    <button type="submit"  value="Submit">Sign up</button>
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

export default Register2;
