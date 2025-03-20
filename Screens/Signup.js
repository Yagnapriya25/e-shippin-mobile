import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  CrimsonPro_200ExtraLight,
  CrimsonPro_300Light,
  CrimsonPro_400Regular,
  CrimsonPro_500Medium,
  CrimsonPro_600SemiBold,
  CrimsonPro_700Bold,
  CrimsonPro_800ExtraBold,
  CrimsonPro_900Black,
  CrimsonPro_200ExtraLight_Italic,
  CrimsonPro_300Light_Italic,
  CrimsonPro_400Regular_Italic,
  CrimsonPro_500Medium_Italic,
  CrimsonPro_600SemiBold_Italic,
  CrimsonPro_700Bold_Italic,
  CrimsonPro_800ExtraBold_Italic,
  CrimsonPro_900Black_Italic,
} from "@expo-google-fonts/crimson-pro";
import { useNavigation } from "@react-navigation/native";
import { signupRequest, signupSuccess } from "../Redux/Slice/userSlice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    CrimsonPro_200ExtraLight,
    CrimsonPro_300Light,
    CrimsonPro_400Regular,
    CrimsonPro_500Medium,
    CrimsonPro_600SemiBold,
    CrimsonPro_700Bold,
    CrimsonPro_800ExtraBold,
    CrimsonPro_900Black,
    CrimsonPro_200ExtraLight_Italic,
    CrimsonPro_300Light_Italic,
    CrimsonPro_400Regular_Italic,
    CrimsonPro_500Medium_Italic,
    CrimsonPro_600SemiBold_Italic,
    CrimsonPro_700Bold_Italic,
    CrimsonPro_800ExtraBold_Italic,
    CrimsonPro_900Black_Italic,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [credentials,setCredentials]=useState({
    username:"",
    email:"",
    password:""
  })
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const handleSignup = async(e)=>{
      e.preventDefault();
      try {
        dispatch(signupRequest());
        const res = await dispatch(signupSuccess(credentials));
        if(res && res.user){
           AsyncStorage.setItem("id",res.user._id);
           AsyncStorage.setItem("userToken",res.token);
           const id = await AsyncStorage.getItem("id");
           const token = await AsyncStorage.getItem("userToken");
           if(token&&id){
            moveTo("Home")
           }
           else{
             moveTo("login")
           }
         }
        }
      } catch (error) {
        
      }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formbox}>
        <Text style={styles.formHead}>E-shippin</Text>
        <TextInput placeholder="Username" style={styles.username} />
        <TextInput placeholder="Email" style={styles.email} />

        {/* Password Input with Toggle Visibility */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconContainer}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"} // Toggle icon based on state
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>
         <TouchableOpacity style={styles.button} onPress={() => console.log('Button Pressed')}>
                       <Text style={styles.buttonText}>Signup</Text>
                     </TouchableOpacity>
        <View style={styles.footerContainer}>
            <Text style={styles.footerText1}>Already Have An Account?</Text>
            <Text style={styles.footerText2} onPress={()=>navigation.navigate("login")}>Login</Text>
          </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9D9EB",
    justifyContent: "center",
    alignItems: "center",
  },
  formbox: {
    height: 450,
    backgroundColor: "#fff",
    width: 300,
    borderRadius: 15,
    padding: 10,
  },
  formHead: {
    textAlign: "center",
    paddingTop: 25,
    paddingBottom: 50,
    fontSize: 30,
    fontFamily: "CrimsonPro_800ExtraBold", // Apply Crimson Pro Bold font
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    marginTop: 12,
    borderRadius: 5,
    flex: 1,
  },
  email: {
    height: 40,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  username: {
    height: 40,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 22,
    paddingLeft: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    position: "absolute",
    right: 15,
  },
  button: {
    paddingTop: 11,
    height:40,
    marginTop:20,
    borderRadius:20,
    backgroundColor:"#8EF3AC"
  },
   buttonText:{
     textAlign:"center",
     fontSize:15,
     fontFamily:"CrimsonPro_800ExtraBold",
     fontWeight:"500"
   },
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
  footerText2: {
    color: "#007BFF",
  },
});
