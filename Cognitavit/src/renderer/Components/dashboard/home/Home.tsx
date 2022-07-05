import { Context, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Home.css'

import { useNavigate } from "react-router-dom";


const Home = () => {
    //const [userToken, setUserToken] = useContext(AuthContext)
    const logoutNotice = () => {toast.info("User has been logged out.")}
    let navigate = useNavigate();

    //Move this into a Auth util in future?
    function revokeUserToken(){ 
        logoutNotice();
        navigate("/logout");
    }

   // if(!userToken){ return <Navigate to="/" /> }
    
    return (
        <div className="homepage-container">
            <button onClick={revokeUserToken}>Signout</button>
            <p>Current User Token State test</p>
            {//<p>{(userToken) ? userToken.localId : "null"}</p>
            }
        </div>
    )
};

export default Home;

