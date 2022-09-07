import { useContext } from 'react';
import {Route, Navigate, Outlet} from 'react-router-dom'
import { store } from '../../store/store'

import {sessionStorage_save, sessionStorage_get} from '../../utils/webstorage/storage';


const PrivateRoute = () =>{
    const authToken = sessionStorage_get('auth');
    console.log("Inside Private Route Determiner")
    console.log(authToken)
    if(authToken == undefined) { //If not authenticated
        console.log(authToken)
        return <Navigate to="/" />
    }
    console.log("Going to an outlet.")
    return <Outlet /> //Go to the next match ie dashboard.
};

export default PrivateRoute;