import React from "react";
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
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
export default function ForgetPassword(){
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
    
  
    
     
    
      // If fonts are not loaded, show loading state
      if (!fontsLoaded) {
        return <Text>Loading...</Text>;
      }
    
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.formbox}>
          <Text style={styles.formHead}>E-shippin</Text>
          <TextInput placeholder="Email" style={styles.email} />
          <View style={styles.button}>
            <Button onPress={() => {}} title="Reset" />
            <Text style={styles.footerText}>Login</Text>
            <Text style={styles.success}>Email sent successfully</Text>
          </View>
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9D9EB",
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom:10,
    color: "#007BFF", // Blue color for links
  },
  button: {
    paddingTop: 20,
  },
 success:{
    textAlign:"center",
    color:"green"
 }
  
});