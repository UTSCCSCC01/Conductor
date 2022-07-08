import { createAction, createReducer} from '@reduxjs/toolkit'
import { DeviceDetails } from 'main/types';




  //Create our actions
  const setDeviceDetails = createAction<DeviceDetails>('setDeviceDetails');
  const removeDeviceDetails = createAction<undefined>('removeDeviceDetails');

  //Define our type
  type deviceDetail = {
    deviceInfo?: DeviceDetails,
  }

  //Set inital state of type deviceDetails to be undefined.
  let init_state: deviceDetail;
  init_state = {deviceInfo: undefined}

  //Create the reducer
  const deviceInfoReducer = createReducer(init_state,(builder) => {
      builder
        .addCase(setDeviceDetails, (state, action) => {
          // action is inferred correctly here
          state.deviceInfo = action.payload
        })
        // You can chain calls, or have separate `builder.addCase()` lines each time
        .addCase(removeDeviceDetails, (state, action) => {
            state.deviceInfo = action.payload;
        })
    }
  )

  export { deviceInfoReducer }