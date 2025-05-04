import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  CrimsonPro_800ExtraBold,
} from "@expo-google-fonts/crimson-pro";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Action/userAction";
import { loginRequest } from "../Redux/Slice/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  let [fontsLoaded] = useFonts({
    CrimsonPro_800ExtraBold,
  });

  const moveTo = (screen, payload) => {
    navigation.navigate(screen, { ...payload });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const { error } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Auto login check
  useEffect(() => {
    const checkAutoLogin = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const loginTime = await AsyncStorage.getItem('loginTime');

      if (token && loginTime) {
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        if (now - parseInt(loginTime) < oneDay) {
          moveTo("Home");
        } else {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('id');
          await AsyncStorage.removeItem('loginTime');
        }
      }
    };

    checkAutoLogin();
  }, []);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      dispatch(loginRequest());
      const result = await dispatch(login(credentials));

      if (result && result.user && result.token) {
        await AsyncStorage.setItem('userToken', result.token);
        await AsyncStorage.setItem('id', result.user._id);
        await AsyncStorage.setItem('loginTime', Date.now().toString());

        const id = await AsyncStorage.getItem("id");
        const token = await AsyncStorage.getItem("userToken");

        if (token && id) {
          moveTo("Home");
        } else {
          setErrorMessage("Login failed. Please check your credentials.");
        }
      } else {
        setErrorMessage("Invalid login credentials.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMessage("Something went wrong. Try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formbox}>
        <Text style={styles.formHead}>E-shippin</Text>
        <TextInput
          placeholder="Email"
          style={styles.email}
          value={credentials.email}
          onChangeText={(text) => {
            setCredentials({
              ...credentials,
              email: text.toLowerCase(), // Automatically convert to lowercase
            });
            setErrorMessage('');
          }}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={credentials.password}
            onChangeText={(text) => {
              setCredentials({ ...credentials, password: text });
              setErrorMessage('');
            }}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLoginSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.footerText} onPress={() => navigation.navigate("forget")}>Forget Password?</Text>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText1}>Don't Have An Account?</Text>
          <Text style={styles.footerText2} onPress={() => navigation.navigate("signup")}>
            SignUp
          </Text>
        </View>

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
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
    height: 400,
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
    fontFamily: "CrimsonPro_800ExtraBold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    marginTop: 12,
    borderRadius: 5,
    width: 280
  },
  email: {
    height: 40,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#007BFF",
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
    height: 40,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#8EF3AC",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "CrimsonPro_800ExtraBold",
    fontWeight: "500",
  },
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
  },
  footerText2: {
    color: "#007BFF",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
