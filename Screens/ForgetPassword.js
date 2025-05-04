import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../Redux/Action/userAction";
import { clearError } from "../Redux/Slice/userSlice";

export default function ForgetPassword({ navigation }) {
  const [credential, setCredential] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Accessing the error and otpSent states from Redux store
  const { error, otpSent } = useSelector((state) => state.user);

  const handleChange = (e, field) => {
    setCredential({
      ...credential,
      [field]: e.toLowerCase(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    dispatch(clearError()); // Clear previous error messages

    // Trigger the forget password action
    await dispatch(forgetPassword({ email: credential.email }));

    setLoading(false);
    console.log("error"+error);
    console.log("Success"+otpSent)
  };

  const handleNavigateToLogin = () => {
    dispatch(clearError());
    navigation.navigate("login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formbox}>
        <Text style={styles.formHead}>E-shippin</Text>

        <TextInput
          placeholder="Email"
          style={styles.email}
          keyboardType="email-address"
          value={credential.email}
          onChangeText={(text) => handleChange(text, "email")}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />
        )}

        {/* Display success or error message based on Redux state */}
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : otpSent ? (
          <Text style={styles.success}>
            Password reset link has been sent to your email. Please check your inbox.
          </Text>
        ) : null}

        <Text style={styles.footerText} onPress={handleNavigateToLogin}>
          Login
        </Text>
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
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 10,
  },
  formbox: {
    height: 380,
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
    marginBottom: 10,
    color: "#007BFF",
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
  success: {
    textAlign: "center",
    color: "green",
    marginTop: 10,
  },
});
