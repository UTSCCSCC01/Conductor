import { Navigate } from 'react-router-dom'

import {sessionStorage_get, sessionStorage_save} from '../../../utils/store/store'

const Logout = () => {
    //Additional code that erases the state.
    console.log("here")
    sessionStorage_save("auth", undefined);
    return <Navigate to="/" />
}

export {Logout}