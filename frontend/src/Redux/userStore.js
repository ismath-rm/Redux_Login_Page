import {configureStore} from '@reduxjs/toolkit'
import authenticationSliceReducer from './authentication/authenticationSlice'
import userBasicDetailsSliceReducer from './userBasicDetailsSlice/userBasicDetailsSlice'

export default configureStore({
  reducer:{
    authentication_user: authenticationSliceReducer,
    user_basic_details: userBasicDetailsSliceReducer 
  }
})