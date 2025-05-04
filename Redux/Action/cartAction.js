import { cartDecreaseFail, cartDecreaseRequest, cartDecreaseSuccess, cartIncreaseFail, cartIncreaseRequest, cartIncreaseSuccess, cartPostFail, cartPostRequest, cartPostSuccess, cartRemoveAllFail, cartRemoveAllRequest, cartRemoveAllSuccess, cartRemoveFail, cartRemoveRequest, cartRemoveSuccess, getAllCartFail, getAllCartRequest, getAllCartSuccess } from "../Slice/cartSlice"






const postCart = (userInfo,productInfo)=>async(dispatch)=>{
    try {
        cartPostRequest();
        const res = await fetch(`https://e-shipin-server.onrender.com/api/cart/add/${userInfo}/${productInfo}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(cartPostSuccess(data))
        }
        else{
            dispatch(cartPostFail(data.message))
        }
    } catch (error) {
        dispatch(cartPostFail(error.message))

    }
}

const decreaseCart = (userInfo,productInfo)=>async(dispatch)=>{
    try {
        dispatch(cartDecreaseRequest());
        const res = await fetch(`https://e-shipin-server.onrender.com/api/cart/decrease/${userInfo}/${productInfo}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(cartDecreaseSuccess(data));
        }
        else{
            dispatch(cartDecreaseFail(data.message))
        }
    } catch (error) {
        dispatch(cartDecreaseFail(error.message))
  
    }
}
const increaseCart = (userInfo, productInfo) => async (dispatch) => {
    try {
        dispatch(cartIncreaseRequest());
        const res = await fetch(`https://e-shipin-server.onrender.com/api/cart/increase/${userInfo}/${productInfo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        console.log("API URL:", `https://e-shipin-server.onrender.com/api/cart/increase/${userInfo}/${productInfo}`);
        console.log("Response status:", res.status);
        
        const data = await res.json();
        if (res.ok) {
            dispatch(cartIncreaseSuccess(data));
        } else {
            dispatch(cartIncreaseFail(data.message));
        }
    } catch (error) {
        dispatch(cartIncreaseFail(error.message));
    }
};


const cartRemove = (userInfo,productInfo)=>async(dispatch)=>{
    try {
        dispatch(cartRemoveRequest());
        const res = await fetch (`https://e-shipin-server.onrender.com/api/cart/remove/${userInfo}/${productInfo}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(cartRemoveSuccess(data))
        }
        else{
            dispatch(cartRemoveFail(data.message))
        }
    } catch (error) {
        dispatch(cartRemoveFail(error.message))
    }
}

const getCart = (userInfo)=>async(dispatch)=>{
    try {
        dispatch(getAllCartRequest());
        const res = await fetch(`https://e-shipin-server.onrender.com/api/cart/get/${userInfo}`,{
            method:"GET",
        })
        const data = await res.json();
        if(res.ok){
            dispatch(getAllCartSuccess(data))
        }
        else{
            dispatch(getAllCartFail(data.message))
        }
    } catch (error) {
        dispatch(getAllCartFail(error.message))

    }
}

const emptyCart = (userInfo)=>async(dispatch)=>{
    try {
        dispatch(cartRemoveAllRequest());
        const res = await fetch(`https://e-shipin-server.onrender.com/api/cart/removeAll/${userInfo}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(cartRemoveAllSuccess(data));
        }
        else{
            dispatch(cartRemoveAllFail(data.message))
        }
    } catch (error) {
        dispatch(cartRemoveAllFail(error.message))

    }
}

export {
    postCart,
    decreaseCart,
    cartRemove,
    getCart,
    increaseCart,
    emptyCart
}