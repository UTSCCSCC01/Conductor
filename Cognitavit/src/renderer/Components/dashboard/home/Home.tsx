import { Context, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from 'renderer/AuthContext';
import './Home.css'

const Home = () => {
    const [userToken, setUserToken] = useContext(AuthContext)
    const logoutNotice = () => {toast.info("User has been logged out.")}

    //Move this into a Auth util in future?
    function revokeUserToken(){ 
        logoutNotice();
        setUserToken(null);
    }

    if(!userToken){ return <Navigate to="/" /> }
    
    return (
        <div className="homepage-container">
            <button onClick={revokeUserToken}>Signout</button>
            <p>Current User Token State test</p>
            <p>{(userToken) ? userToken.localId : "null"}</p>
        </div>
    )
};

export default Home;

