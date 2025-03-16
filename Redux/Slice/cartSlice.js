import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartInfo : [],
    error:null,
    loading:true,
    singleCart:null
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        cartPostRequest(state){
            state.loading = true;
        },
        cartPostSuccess(state,action){
            state.loading = false;
            state.cartInfo = action.payload
        },
        cartPostFail(state,action){
            state.loading = false;
            state.error = action.payload
        },
        getAllCartRequest(state,action){
            state.loading = true;
        },
        getAllCartSuccess(state,action){
            state.loading = false;
            state.cartInfo = action.payload;
        },
        getAllCartFail(state,action){
            state.loading = false;
            state.error = action.payload;

        },
        cartRemoveRequest(state){
            state.loading = true;
        },
        cartRemoveSuccess(state,action){
            state.loading = false;
            state.cartInfo = action.payload
        },
        cartRemoveFail(state,action){
            state.loading = false;
            state.error = action.payload
        },
        cartDecreaseRequest(state){
            state.loading = true
        },
        cartDecreaseSuccess(state,action){
            state.loading = false;
            state.cartInfo = action.payload
        },
        cartDecreaseFail(state,action){
            state.loading = false;
            state.error = action.payload
        },
        cartIncreaseRequest(state){
            state.loading = true
        },
        cartIncreaseSuccess(state,action){
            state.loading = false;
            state.cartInfo = action.payload
        },
        cartIncreaseFail(state,action){
            state.loading = false;
            state.error = action.payload
        },
        cartRemoveAllRequest(state){
            state.loading = true
        },
        cartRemoveAllSuccess(state,action){
            state.loading  = false;
            state.cartInfo = action.payload;
        },
        cartRemoveAllFail(state,action){
            state.loading = false;
            state.error = action.payload
        }
               
    }
})

export const {
    cartPostRequest,
    cartPostSuccess,
    cartPostFail,
    getAllCartRequest,
    getAllCartSuccess,
    getAllCartFail,
    cartRemoveRequest,
    cartRemoveSuccess,
    cartRemoveFail,
    cartDecreaseRequest,
    cartDecreaseSuccess,
    cartDecreaseFail,
    cartIncreaseRequest,
    cartIncreaseSuccess,
    cartIncreaseFail,
    cartRemoveAllRequest,
    cartRemoveAllSuccess,
    cartRemoveAllFail
} = cartSlice.actions;

export default cartSlice.reducer;