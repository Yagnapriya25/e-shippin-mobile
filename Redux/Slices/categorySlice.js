import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    loading:true,
    categoryInfo:[],
    error:null
}

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{
        categoryPostRequest(state){
            state.loading = true;
            state.error = null;
        },
        categoryPostSuccess(state,action){
            state.loading = false;
            state.categoryInfo = action.payload
        },
        categoryPostFail(state,action){
            state.loading = false;
            state.error  = action.payload;
        },
        categoryGetAllRequest(state){
            state.loading = true;
            state.error = null;
        },
        categoryGetAllSuccess(state,action){
            state.loading = false;
            state.categoryInfo = action.payload
        },
        categoryGetAllFail(state,action){
            state.loading = false;
            state.error = action.payload
        },
        categoryGetSingleRequest(state){
            state.loading = true;
            state.error = null;
        },
        categoryGetSingleSuccess(state,action){
            state.loading = false;
            state.categoryInfo = action.payload
        },
        categoryGetSingleFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        categoryDeleteRequest(state){
            state.loading = true;
            state.error = null;
        },
        categoryDeleteSuccess(state,action){
            state.loading = false;
            state.categoryInfo = action.payload;
        },
        categoryDeleteFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        categoryProductRequest(state){
            state.loading = true;
            state.error = null;
        },
        categoryProductSuccess(state,action){
            state.loading = false;
            state.categoryInfo = action.payload;
        },
        categoryProductFail(state,action){
            state.loading = false;
            state.error = action.payload;
        }
        
    }
})


export const {
    categoryPostRequest,
    categoryPostSuccess,
    categoryPostFail,
    categoryGetAllRequest,
    categoryGetAllSuccess,
    categoryGetAllFail,
    categoryGetSingleRequest,
    categoryGetSingleSuccess,
    categoryGetSingleFail,
    categoryDeleteRequest,
    categoryDeleteSuccess,
    categoryDeleteFail,
    categoryProductFail,
    categoryProductRequest,
    categoryProductSuccess
} = categorySlice.actions;

export default categorySlice.reducer;