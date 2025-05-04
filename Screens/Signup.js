import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { signup, verifyOtp } from "../Redux/Action/userAction";
import { clearError, resetOtpSent } from "../Redux/Slice/userSlice";

export default function Signup({ navigation }) {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { error, otpSent } = useSelector((state) => state.user);
  const [showOtpUI, setShowOtpUI] = useState(false); // Local state to mirror otpSent

  useEffect(() => {
    setErrorMessage(error || "");
  }, [error]);

  useEffect(() => {
    if (otpSent) {
      setShowOtpUI(true);
    }
  }, [otpSent]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (value, field) => {
    setCredentials({
      ...credentials,
      [field]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage("");

    await dispatch(signup(credentials));
    setLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage("");

    try {
      await dispatch(verifyOtp({ otp, email: credentials.email }));
      dispatch(resetOtpSent());
      setTimeout(() => {
        navigation.navigate("login");
      }, 1000);
    } catch (err) {
      setErrorMessage("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    dispatch(clearError());
    setErrorMessage("");
    dispatch(resetOtpSent());
    navigation.navigate("login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formbox}>
        <Text style={styles.formHead}>E-shippin</Text>

        {!showOtpUI ? (
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
              onChangeText={(text) => handleChange(text.toLowerCase(), "email")}
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
        ) : (
          <>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={credentials.email}
              editable={false}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Enter OTP"
              style={styles.input}
              keyboardType="numeric"
              value={otp}
              onChangeText={(text) => setOtp(text)}
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
          <Text style={styles.footerText2} onPress={handleNavigateToLogin}>
            Login
          </Text>
        </View>

        {errorMessage !== "" && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
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
    height: 460,
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
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
  footerText2: {
    color: "#007BFF",
    marginLeft: 5,
  },
  errorText: {
    color: "red",
    fontSize: 10,
    textAlign: "center",
    marginVertical: 10,
  },
});
