import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import { StyleSheet } from "react-native";
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
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../Redux/Action/userAction";

export default function ForgetPassword({ navigation }) {
  const [credential, setCredential] = useState({
    email: "",
  });
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error, userInfo } = useSelector((state) => state.user);

  const handleChange = (e, field) => {
    setCredential({
      ...credential,
      [field]: e,
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    dispatch(forgetPassword({ email: credential.email })).finally(() => {
      setLoading(false);
      setSuccess("Email sent successfully");
      // Clear success message after 5 seconds (optional)
      setTimeout(() => setSuccess(""), 5000);
    });
  };

  // If fonts are not loaded, show loading state
  if (!fontsLoaded) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

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
        {success ? <Text style={styles.success}>{success}</Text> : null}
        <Text style={styles.footerText} onPress={() => navigation.navigate("login")}>
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
  },
  formbox: {
    height: 300,
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
});
