import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { productPost } from "../Redux/Action/productAction";

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

  const { c_id } = route.params; // category ID passed from previous screen

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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
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
        type: asset.type || "image/jpeg",
      }));

      setCredential((prev) => ({
        ...prev,
        images: [...prev.images, ...selectedImages],
      }));
    }
  };

  const handleInputChange = (name, value) => {
    setCredential((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeImage = (index) => {
    Alert.alert(
      "Remove Image",
      "Are you sure you want to remove this image?",
      [
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
      ]
    );
  };

  const handleSubmit = async () => {
    if (loading) return;

    // Check if required fields are filled
    if (!credential.name || !credential.price || !credential.instock) {
      alert("Please fill Name, Price, and Stock properly.");
      return;
    }

    const formData = new FormData();
    formData.append("name", credential.name);
    formData.append("description1", credential.description1);
    formData.append("description2", credential.description2);
    formData.append("description3", credential.description3);
    formData.append("price", credential.price);
    formData.append("instock", credential.instock);

    // Log credential data before appending images
    console.log("Form Data Before Images: ", credential);

    credential.images.forEach((img, index) => {
      formData.append("images", {
        uri: img.uri,
        name: img.name,
        type: img.type,
      });
    });

    // Log the images data after appending
    console.log("Form Data After Images: ");
    for (let pair of formData.entries()) {
      console.log(pair[0], ":", pair[1]);
    }

    console.log("--- cat_id ---", c_id);
    console.log("--- userId ---", userId);

    // Log image URIs to inspect them
    console.log("Image URIs: ", credential.images.map(img => img.uri));

    try {
      setLoading(true);

      // Send the request to the backend
      const result = await dispatch(productPost(formData, c_id, userId)); 

      // Log the result from dispatch
      console.log("--- Dispatch Result ---", result);

      setLoading(false);

      // Check if the product was added successfully
      if (result?.type?.includes("Success")) {
        alert("Product added successfully!");
        navigation.navigate("Home");
      } else {
        alert("Failed to add product. Check details in console.");
      }

    } catch (error) {
      console.error("Error submitting product:", error);
      setLoading(false);
      alert("Failed to add product. Try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity onPress={pickImages} style={{ marginBottom: 15 }}>
            <Text style={{ color: "blue", fontSize: 18 }}>Pick Images</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 20 }}>
            {credential.images.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => removeImage(index)}
                style={{ marginRight: 10, marginBottom: 10 }}
              >
                <Image
                  source={{ uri: img.uri }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
                <Text style={{ textAlign: "center", fontSize: 12, color: "red" }}>Remove</Text>
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

          <Button title="Add Product" onPress={handleSubmit} disabled={loading} />
        </>
      )}
    </ScrollView>
  );
}

const styles = {
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
};
