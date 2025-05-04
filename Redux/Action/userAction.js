import { editUserFail, editUserRequest, editUserSuccess, forgetPasswordFail, forgetPasswordRequest, forgetPasswordSuccess, getAllUserFail, getAllUserRequest, getAllUserSuccess, getUserRequest, getUserSuccess, loginFail, loginRequest, loginSuccess, otpFail, otpRequest, otpSuccess, resetFail, resetRequest, resetSuccess, signupFail, signupRequest, signupSuccess } from "../Slice/userSlice"
import AsyncStorage from "@react-native-async-storage/async-storage";




const login = (credentials)=>async(dispatch)=>{
   try {
      dispatch(loginRequest());

      const res = await fetch (`https://e-shipin-server.onrender.com/api/user/login`,{
        method:"POST",
        body:JSON.stringify(credentials),
        headers:{
            "Content-Type":"application/json"
        }
      })
      const data = await res.json();
      dispatch(loginSuccess(data));
      if(data.user && data.user._id && data.token){
       await AsyncStorage.setItem("id",data.user._id);
       await AsyncStorage.setItem("token",data.token) 
      }
      return data
   } catch (error) {
      dispatch(loginFail(error.message || "Network Error"))
   }
}


const signup = (credentials) => async (dispatch) => {
    try {
        dispatch(signupRequest());
        const { email, password, username } = credentials;
        const res = await fetch(`https://e-shipin-server.onrender.com/api/user/register`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          dispatch(signupSuccess(data));
        } else {
          dispatch(signupFail(data.message));
        }
      } catch (error) {
        dispatch(signupFail(error.message));
      }
};

const verifyOtp = (credentials) => async (dispatch) => {
    try {
        dispatch(otpRequest());
        const { otp } = credentials;
        const res = await fetch(`https://e-shipin-server.onrender.com/api/user/verify-otp`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          dispatch(otpSuccess(data));
          AsyncStorage.setItem("token",data.token);
          AsyncStorage.setItem("id",data.user._id);
          
        } else {
          dispatch(otpFail(data.message));
        }
      } catch (error) {
        dispatch(otpFail(error.message));
      }
};


const forgetPassword = (credentials)=>async(dispatch)=>{
  try {
    dispatch(forgetPasswordRequest());
    const res = await fetch(`https://e-shipin-server.onrender.com/api/user/forget`,{
        method:"POST",
        body:JSON.stringify(credentials),
        headers:{
            "Content-Type":"application/json"
        }

    })
    const data = await res.json();
    console.log(data);
    if(res.ok){
        dispatch(forgetPasswordSuccess(data))
    }
    else{
        dispatch(forgetPasswordFail(data.message))
    }
  } catch (error) {
    dispatch(forgetPasswordFail(error.message || "Network Error"))
  }
}


const resetPassword = (credentials,userData)=>async(dispatch)=>{
    try {
        dispatch(resetRequest());
        const {id,token}=userData;
        const res = await fetch (`https://e-shipin-server.onrender.com/api/user/reset-password/${id}/${token}`,{
            method:"POST",
            body:JSON.stringify(credentials),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(resetSuccess(data))
        }
        else{
            dispatch(resetFail(data.message))
        }
    } catch (error) {
        dispatch(resetFail(error.message))
    }
}

const getAllUser = ()=>async(dispatch)=>{
    try {
       dispatch(getAllUserRequest());
       const res= await fetch(`https://e-shipin-server.onrender.com/api/user/allusers`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
       }) 
       const data = await res.json();
       console.log(data);
       if(res.ok){
        dispatch(getAllUserSuccess(data))
       }
       else{
        dispatch(getAllUserFail(data.message))
       }
    } catch (error) {
        dispatch(getAllUserFail(error.message || "Network Error"))
    }
}

const getSingleUser = (userData)=>async(dispatch)=>{
    try {
        dispatch(getUserRequest());
        const res = await fetch (`https://e-shipin-server.onrender.com/api/user/getuser/${userData}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        if(res.ok){
            dispatch(getUserSuccess(data))
        }
        else{
            dispatch(getUserFail(data.message))
        }
    } catch (error) {
        dispatch(getUserFail(error.message || "Network Error"))
    }
}

const editUser = (credentials,userInfo)=>async(dispatch)=>{
    try {
        dispatch(editUserRequest());
        const formData  = new FormData();
        formData.append("username",credentials.username);
        formData.append("email",credentials.email);
        formData.append("phoneNumber",credentials.phoneNumber);
        if(credentials.avatar){
            formData.append("avatar",credentials.avatar)
        }
        const res = await fetch(`https://e-shipin-server.onrender.com/api/user/edit/${userInfo}`,{
            method:"PUT",
            body:formData
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(editUserSuccess(data))
        }
        else{
            dispatch(editUserFail(data.message))
        }

    } catch (error) {
        dispatch(editUserFail(error.message || "Network Error"))
    }
}

export {
    login,
    signup,
    verifyOtp,
    resetPassword,
    forgetPassword,
    getAllUser,
    getSingleUser,
    editUser,
}