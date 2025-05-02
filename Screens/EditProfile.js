import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mime from "mime";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { editUser } from "../Redux/Action/userAction"; // Assuming `editUser` is your action to handle user editing.

export default function EditProfile({ navigation }) {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem("id");
      if (id) setUserId(id);
    };
    getUserId();
  }, []);

  const handleChange = (field, value) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const pickAvatar = async () => {
    Alert.alert(
      "Select Avatar",
      "Choose an option",
      [
        {
          text: "Camera",
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
              Alert.alert("Permission required", "Camera access is needed.");
              return;
            }

            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
            });

            if (!result.canceled) {
              const asset = result.assets[0];
              const avatarFile = {
                uri: asset.uri,
                name: asset.fileName || `avatar-${Date.now()}.jpg`,
                type: mime.getType(asset.uri),
              };

              setCredentials((prev) => ({ ...prev, avatar: avatarFile }));
            }
          },
        },
        {
          text: "Gallery",
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
              Alert.alert("Permission required", "Media library access is needed.");
              return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
            });

            if (!result.canceled) {
              const asset = result.assets[0];
              const avatarFile = {
                uri: asset.uri,
                name: asset.fileName || `avatar-${Date.now()}.jpg`,
                type: mime.getType(asset.uri),
              };

              setCredentials((prev) => ({ ...prev, avatar: avatarFile }));
            }
          },
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const handleSubmit = async () => {
    if (loading) return;

    const { username, email, phoneNumber, avatar } = credentials;

    if (!username || !email || !phoneNumber) {
      Alert.alert("Missing Fields", "All fields are required.");
      return;
    }

    setLoading(true);

    try {
      let avatarUrl = null;

      // Prepare the formData
      const formData = new FormData();
      formData.append("username", username.trim());
      formData.append("email", email.trim());
      formData.append("phoneNumber", phoneNumber.trim());

      // If there is a new avatar, upload it to Cloudinary via the backend
      if (avatar) {
        formData.append("avatar", {
          uri: avatar.uri,
          name: avatar.name || `avatar-${Date.now()}.jpg`,
          type: avatar.type || mime.getType(avatar.uri),
        });
      }

     const response = await fetch(`https://e-shipin-server.onrender.com/api/user/edit/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const result = await response.json();
      setLoading(false);

      if (result?.message === "User updated successfully") {
        Alert.alert("Success", "Profile updated successfully!");
        setTimeout(() => {
          navigation.goBack(); 
        }, 1000);
      } else {
        Alert.alert("Update Failed", result?.message || "Please try again.");
      }
    } catch (err) {
      console.error("Update Error:", err);
      setLoading(false);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
        <Text style={styles.header}>Edit Profile</Text>
          <TouchableOpacity onPress={pickAvatar} style={styles.imagePicker}>
            <Text style={styles.pickText}>
              {credentials.avatar ? "Change Avatar" : "Pick Avatar Image"}
            </Text>
          </TouchableOpacity>

          {credentials.avatar && (
            <Image source={{ uri: credentials.avatar.uri }} style={styles.avatar} />
          )}

          <TextInput
            placeholder="Name"
            style={styles.input}
            value={credentials.username}
            onChangeText={(text) => handleChange("username", text)}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={credentials.email}
            keyboardType="email-address"
            onChangeText={(text) => handleChange("email", text)}
          />
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            value={credentials.phoneNumber}
            keyboardType="phone-pad"
            onChangeText={(text) => handleChange("phoneNumber", text)}
          />

          <Button title="Update Profile" onPress={handleSubmit} color="#6C63FF" />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B9D9EB",
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  header:{
   textAlign:"center",
   marginBottom:25,
   fontSize:20,
   fontWeight:600,

  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 20,
  },
  pickText: {
    fontSize: 16,
    color: "#007bff",
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
});
