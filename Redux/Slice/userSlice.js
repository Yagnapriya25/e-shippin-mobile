import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    userInfo:null,
    loading:true,
    error:null,
    otpSent:false,
    passwordResetSuccess:false
}


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
      loginRequest(state){
        state.loading=true
      },
      loginSuccess(state,action){
        state.loading=false;
        state.userInfo = action.payload;

      },
      loginFail(state,action){
        state.loading=false;
        state.error=action.payload
      },
      signupRequest(state){
        state.loading = true
      },
      signupSuccess(state,action){
        state.loading = false;
        state.userInfo=action.payload;
      },
      signupFail(state,action){
        state.loading = false;
        state.error = action.payload
      },
      otpRequest(state){
        state.loading = true
      },
      otpSuccess(state,action){
        state.loading = false;
        state.otpSent = action.payload;
      },
      otpFail(state,action){
        state.loading=false;
        state.error = action.payload;
      },
      forgetPasswordRequest(state){
        state.loading = true;
      },
      forgetPasswordSuccess(state,action){
        state.loading = false;
        state.userInfo = action.payload;

      },
      forgetPasswordFail(state,action){
        state.loading = false;
        state.error = action.payload;
      },
      resetRequest(state){
        state.loading = true;
      },
      resetSuccess(state,action){
        state.loading = false;
        state.userInfo = action.payload;
      },
      resetFail(state,action){
        state.loading = false;
        state.error = action.payload;
      },
      logout(state){
        state.userInfo = null;
      },
      deleteUserRequest(state){
        state.loading = true;
      },
      deleteUserSuccess(state,action){
        state.loading = false;
        state.userInfo = action.payload;
      },
      deleteUserFail(state,action){
        state.loading = false;
        state.error = action.payload;
      },
      getAllUserRequest(state){
        state.loading=true;
      },
      getAllUserSuccess(state,action){
        state.loading = false;
        state.userInfo = action.payload;
      },
      getAllUserFail(state,action){
        state.loading = false;
        state.error = action.payload;
      },
      getUserRequest(state){
        state.loading = true;
      },
      getUserSuccess(state,action){
        state.loading = false;
        state.userInfo = action.payload;
      },
      getUserFail(state,action){
        state.loading = false;
        state.error = action.payload;
      },
      editUserRequest(state){
        state.loading = true;
      },
      editUserSuccess(state,action){
        state.loading = false;
        state.userInfo = action.payload;
      },
      editUserFail(state,action){
         state.loading = false;
         state.error = action.payload;
      }
    }
}) 


export {
   loginRequest,
   loginSuccess,
   loginFail,
   signupRequest,
   signupSuccess,
   signupFail,
   otpRequest,
   otpSuccess,
   otpFail,
   forgetPasswordRequest,
   forgetPasswordSuccess,
   forgetPasswordFail,
   resetRequest,
   resetSuccess,
   resetFail,
   forgetPasswordRequest,
   forgetPasswordSuccess,
   forgetPasswordFail,
   editUserRequest,
   editUserSuccess,
   editUserFail,
   deleteUserRequest,
   deleteUserSuccess,
   deleteUserFail,
   getAllUserRequest,
   getAllUserSuccess,
   getAllUserFail,
   getUserRequest,
   getUserSuccess,
   getUserFail
}