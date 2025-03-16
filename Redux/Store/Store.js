import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice';
import categoryReducer from "../slices/categorySlice";
import productReducer from '../slices/productSlice';
import cartReducer from '../slices/cartSlice';
import addressReducer from '../slices/addressSlice'


const store = configureStore({
    reducer:{
        user:userReducer,
        category:categoryReducer,
        product:productReducer,
        cart:cartReducer,
        address:addressReducer
    }
})
export default store;