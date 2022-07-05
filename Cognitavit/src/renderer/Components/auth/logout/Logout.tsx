import { Navigate } from 'react-router-dom'
import { store } from '../../../store/store'


const Logout = () => {
    //Additional code that erases the state.
    store.dispatch({
        type: "removeAuth",
        payload: undefined
    })

    return <Navigate to="/" />
}

export {Logout}