import { Context, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'renderer/AuthContext';

const Home = () => {
    const [userToken, setUserToken] = useContext(AuthContext)

    //Move this into a Auth util in future?
    function revokeUserToken(){ 
        setUserToken(null);
    }

    if(!userToken){ return <Navigate to="/" /> }
    
    return (
        <div className="homepage-container">
            <button onClick={revokeUserToken}>Signout</button>
            <p>Current User Token State</p>
            <p>{(userToken) ? userToken.localId : "null"}</p>
        </div>
    )
};

export default Home;

