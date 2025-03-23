import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signup, verifyOtp } from "../Redux/Action/userAction";

export default function Signup({ navigation }) {
  const dispatch = useDispatch();
  const [otpSent, setOtpSent] = useState(false); // Flag to check if OTP is sent
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e, field) => {
    setCredentials({
      ...credentials,
      [field]: e,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions when loading
    setLoading(true); // Set loading state to true when the signup starts
    dispatch(signup(credentials)).finally(() => {
      setLoading(false); // Set loading back to false after the dispatch
      setOtpSent(true); // OTP sent, now change the UI
    });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    dispatch(verifyOtp({ otp, email: credentials.email }))
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error("OTP verification failed", err);
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          navigation.navigate("login");
        }, 1000);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formbox}>
        <Text style={styles.formHead}>E-shippin</Text>

        {/* Before OTP is sent, show Username, Email, and Password */}
        {!otpSent && (
          <>
            <TextInput
              placeholder="Username"
              style={styles.input}
              value={credentials.username}
              onChangeText={(text) => handleChange(text, "username")}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={credentials.email}
              onChangeText={(text) => handleChange(text, "email")}
              keyboardType="email-address"
            />
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassword}
                style={styles.input}
                value={credentials.password}
                onChangeText={(text) => handleChange(text, "password")}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconContainer}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Sending OTP..." : "Signup"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* After OTP is sent, only show Email and OTP */}
        {otpSent && (
          <>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={credentials.email}
              onChangeText={(text) => handleChange(text, "email")}
              keyboardType="email-address"
              editable={false} // Email field should be read-only after OTP is sent
            />
            <TextInput
              placeholder="Enter OTP"
              style={styles.input}
              keyboardType="numeric"
              value={otp}
              onChangeText={(text) => setOtp(text)}
              required
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleOtpSubmit}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.footerContainer}>
          <Text style={styles.footerText1}>Already Have An Account?</Text>
          <Text
            style={styles.footerText2}
            onPress={() => navigation.navigate("login")}
          >
            Login
          </Text>
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
    fontFamily: "CrimsonPro_800ExtraBold",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    marginTop: 12,
    borderRadius: 5,
    flex: 1,
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
    paddingTop: 20,
  },
  footerText2: {
    color: "#007BFF",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
