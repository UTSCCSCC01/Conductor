import { createAction, createReducer} from '@reduxjs/toolkit'
import { AuthenticationToken } from 'main/types'

  //Create our actions
  const setAuth = createAction<AuthenticationToken>('setAuth');
  const removeAuth = createAction<undefined>('removeAuth');

  //Define our type
  type authToken = {
    auth_token?: AuthenticationToken,
  }
  let init_state: authToken;
  init_state = {auth_token: undefined}

  //Create the reducer
  const authReducer = createReducer(init_state,(builder) => {
      builder
        .addCase(setAuth, (state, action) => {
          // action is inferred correctly here
          state.auth_token = action.payload
        })
        // You can chain calls, or have separate `builder.addCase()` lines each time
        .addCase(removeAuth, (state, action) => {
            state.auth_token = action.payload;
        })
    }
  )

  export { authReducer }