import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    addressInfo:null,
    error:null,
    loading:true
}

const addressSlice = createSlice({
    name:"address",
    initialState,
    reducers:{
        addressPostRequest(state){
            state.loading = true
        },
        addressPostSuccess(state,action){
            state.loading = false;
            state.addressInfo = action.payload
        },
        addressPostFail(state,action){
            state.loading = false;
            state.error = action.payload
        },
        addressGetRequest(state){
            state.loading = true
        },
        addressGetSuccess(state,action){
            state.loading = false;
            state.addressInfo = action.payload
        },
        addressGetFail(state,action){
            state.loading = false;
            state.error = action.payload
        },
        addressEditRequest(state){
            state.loading = true
        },
        addressEditSuccess(state,action){
            state.loading = false;
            state.addressInfo = action.payload
        },
        addressEditFail(state,action){
            state.loading = false;
            state.error = action.payload
        },
        addressRemoveRequest(state){
            state.loading = true
        },
        addressRemoveSuccess(state,action){
            state.loading = false;
            state.addressInfo = action.payload;
        },
        addressRemoveFail(state,action){
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const {
   addressPostRequest,
   addressPostSuccess,
   addressPostFail,
   addressGetRequest,
   addressGetSuccess,
   addressGetFail,
   addressEditRequest,
   addressEditSuccess,
   addressEditFail,
   addressRemoveRequest,
   addressRemoveSuccess,
   addressRemoveFail
} = addressSlice.actions;


 export default addressSlice.reducer