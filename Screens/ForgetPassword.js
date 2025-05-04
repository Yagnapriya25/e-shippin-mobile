import React, { useState, useEffect } from "react";
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
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

  const { error, userInfo } = useSelector((state) => state.user);

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
    setSuccess("");
    dispatch(clearError());
  
    const action = await dispatch(forgetPassword({ email: credential.email }));
    
    if (action.type.endsWith("Success")) {
      setSuccess("Please check your mail (including spam folder).");
    } else {
      setSuccess(""); // fallback (error will display from Redux)
    }
  
    setLoading(false);
  };
  

  useEffect(() => {
    if (!error && credential.email) {
      setSuccess("Please check your mail (including spam folder).");
    } else {
      setSuccess(""); // Reset if there's an error
    }
  }, [error]);

  
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

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          success && <Text style={styles.success}>{success}</Text>
        )}

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
    height: 330,
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
    color: "#007BFF", // Blue color for links
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


