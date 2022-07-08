import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { deviceInfoReducer } from './deviceinfoReducer';

const appReducer = combineReducers({
        auth: authReducer,
        devinfo: deviceInfoReducer
    }
)
export { appReducer }