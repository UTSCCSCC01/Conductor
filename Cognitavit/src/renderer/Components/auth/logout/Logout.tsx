import { Navigate } from 'react-router-dom'
import { store } from '../../../store/store'
import {sessionStorage_save, sessionStorage_get} from '../../../utils/webstorage/storage';


const Logout = () => {
    //Additional code that erases the state.
    store.dispatch({
        type: "removeAuth",
        payload: undefined
    })

    sessionStorage_save("auth", undefined);
    window.exec_calls.destroy_socket();
    
    return <Navigate to="/" />
}

export {Logout}