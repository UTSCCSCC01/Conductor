import { useContext, useState } from 'react';
import { getAuth } from 'renderer/utils/getAuth';
import { Navigate } from 'react-router-dom'; 

import './Login.css'
import { AuthContext } from 'renderer/AuthContext';

const Login = () => {
    //Global AppStates
    const [userToken, setUserToken] = useContext(AuthContext)

    //UI related states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('Did not do anything yet');
    const [signedIn, setSignedIn] = useState(false);
    
    async function handleAuthFromSubmission(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log(email, password);
        //Call logic that checks for authentication. 
        let result =  await getAuth(email, password); //result will block until getAuth completes its value. 
        console.log("Inside handleAuthFromSubmission Results:" + result);
        
        if(!result){
            setError('Incorrect Username or password');
            console.log("Fauilure: " + result);
            setUserToken(result);
        }else{
            console.log(result);
            setUserToken(result);
            //Redirect to the dashboard. 
            setError('Success')
            setSignedIn(true);    
        }
    }

    if(signedIn){
        return <Navigate to="/dashboard" />
    }

    return (
        <div className="login-container">
            <p> {error} </p>
            <form onSubmit={handleAuthFromSubmission}>
                <div className="auth-input-container">
                    <p>Username</p>
                    <input type="text" name="email" onChange = {(e) => {setEmail(e.target.value)}} required />
                </div>
                <div className="auth-input-container">
                    <p>Password</p>
                    <input type="text" name="password" onChange = {(e) => {setPassword(e.target.value)}} required />
                </div>

                <div className="auth-button-container">
                    <input type="submit" />
                </div>
            </form>

            <p>Current User Token State</p>
            <p>{(userToken) ? userToken.localId : "null"}</p>
        </div>


    )
};

export default Login;
