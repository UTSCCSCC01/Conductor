import { useContext } from 'react';
import {Route, Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from 'renderer/AuthContext';


const PrivateRoute = () =>{
    const [userToken, setUserToken] = useContext(AuthContext)
    console.log("Inside Private Route Determiner")
    console.log(userToken)
    if(!userToken) { //If not authenticated
        console.log(userToken)
        return <Navigate to="/" />
    }
    console.log("Going to an outlet.")
    return <Outlet /> //Go to the next match ie dashboard.
};

export default PrivateRoute;