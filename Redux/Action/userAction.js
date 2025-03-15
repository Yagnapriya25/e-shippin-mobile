import { loginFail, loginRequest, loginSuccess, otpFail, otpRequest, otpSuccess, signupFail, signupRequest, signupSuccess } from "../Slice/userSlice"
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
      console.log(data);
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


const signup = (credentials)=>async(dispatch)=>{
    try {
        dispatch(signupRequest());
        const res = await fetch(`https://e-shipin-server.onrender.com/api/user/register`,{
            method:"POST",
            body:JSON.stringify(credentials),
            headers:{
                "Content-Type":"application/json"
            }

        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(signupSuccess(data))
        }
        else{
            dispatch(signupFail(data.message))
        }
    } catch (error) {
        dispatch(signupFail(error.message || "Network Error"))
    }
}

const verifyOtp = (credentials)=>async(dispatch)=>{
    try {
        dispatch(otpRequest());
        const res = await fetch (`https://e-shipin-server.onrender.com/api/user/verify-otp`,{
            method:"POST",
            body:JSON.stringify(credentials),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        console.log(data);
        if(res.ok){
            dispatch(otpSuccess(data));
            AsyncStorage.setItem("token",data.token);
            AsyncStorage.setItem("id",data.user._id)
        }
        else{
            dispatch(otpFail.message)
        }
    } catch (error) {
        dispatch(otpFail.error || "Network Error")
    }
}