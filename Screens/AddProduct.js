import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { productPost } from "../Redux/Action/productAction";
import mime from "mime";

export default function AddProductScreen({ navigation, route }) {
  const [credential, setCredential] = useState({
    name: "",
    description1: "",
    description2: "",
    description3: "",
    price: "",
    instock: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  const { c_id } = route.params;

  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        if (id !== null) {
          setUserId(id);
        } else {
          console.log("No user id found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching user id:", error);
      }
    };

    getUserId();
  }, []);

  const pickImages = async () => {
    Alert.alert(
      "Select Image",
      "Choose an option",
      [
        {
          text: "Camera",
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
              alert("Camera permission is required!");
              return;
            }
  
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
            });
  
            if (!result.canceled) {
              const asset = result.assets[0];
              const newImage = {
                uri: asset.uri,
                name: asset.fileName || `photo-${Date.now()}.jpg`,
                type: mime.getType(asset.uri) || "image/jpeg",
              };
  
              setCredential((prev) => ({
                ...prev,
                images: [...prev.images, newImage],
              }));
            }
          },
        },
        {
          text: "Gallery",
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
              alert("Gallery permission is required!");
              return;
            }
  
            const result = await ImagePicker.launchImageLibraryAsync({
              allowsMultipleSelection: true,
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
            });
  
            if (!result.canceled) {
              let selectedImages = result.assets.map((asset) => ({
                uri: asset.uri,
                name: asset.fileName || `photo-${Date.now()}.jpg`,
                type: mime.getType(asset.uri) || "image/jpeg",
              }));
  
              setCredential((prev) => ({
                ...prev,
                images: [...prev.images, ...selectedImages],
              }));
            }
          },
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };
  

  const handleInputChange = (name, value) => {
    setCredential((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeImage = (index) => {
    Alert.alert("Remove Image", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          setCredential((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
          }));
        },
      },
    ]);
  };

  const handleSubmit = async () => {
    if (loading) return;

    if (!credential.name || !credential.price || !credential.instock) {
      alert("Please fill Name, Price, and Stock.");
      return;
    }

    const formData = new FormData();

    formData.append("name", credential.name);
    formData.append("description1", credential.description1);
    formData.append("description2", credential.description2);
    formData.append("description3", credential.description3);
    formData.append("price", credential.price);
    formData.append("instock", credential.instock);

    credential.images.forEach((img, index) => {
      formData.append("images", {
        uri: img.uri,
        name: img.name,
        type: img.type,
      });
    });

    try {
      setLoading(true);

      const result = await dispatch(productPost(formData, c_id, userId));
      console.log("--- Dispatch Result ---", result);

      setLoading(false);

      if (result?.success) {
        alert("Product added successfully!");
        navigation.navigate("Home");
      } else {
        alert("Failed to add product. See console for details.");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      setLoading(false);
      alert("Failed to add product. Try again.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.indicator}/>
      ) : (
        <>
          <TouchableOpacity onPress={pickImages} style={{ marginBottom: 15 }}>
            <Text style={{ color: "blue", fontSize: 18, textAlign:"center",paddingTop:30 }}>Click to Pick Images</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            {credential.images.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => removeImage(index)}
                style={{ marginRight: 5, marginBottom: 10 }}
              >
                <Image
                  source={{ uri: img.uri }}
                  style={{ width: 70, height: 70, borderRadius: 10 }}
                />
                <Text
                  style={{ textAlign: "center", fontSize: 12, color: "red",paddingTop:5 }}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Product Name"
            value={credential.name}
            onChangeText={(text) => handleInputChange("name", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Stock Quantity"
            value={credential.instock}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange("instock", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Price"
            value={credential.price}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange("price", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Description 1"
            value={credential.description1}
            onChangeText={(text) => handleInputChange("description1", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Description 2"
            value={credential.description2}
            onChangeText={(text) => handleInputChange("description2", text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Description 3"
            value={credential.description3}
            onChangeText={(text) => handleInputChange("description3", text)}
            style={styles.input}
          />
         
          <Button title="Add Product" onPress={handleSubmit} disabled={loading} color={"#3EB489"}/>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#B9D9EB"
  },
  indicator:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },  
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor:"#fff"
  },
});
