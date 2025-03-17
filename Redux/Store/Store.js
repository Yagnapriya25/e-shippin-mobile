import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Slice/userSlice';
import categoryReducer from "../Slice/categorySlice";
import productReducer from '../Slice/productSlice';
import cartReducer from '../Slice/cartSlice';
import addressReducer from '../Slice/addressSlice'


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