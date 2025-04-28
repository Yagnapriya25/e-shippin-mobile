import { View, Text, SafeAreaView, StyleSheet, TextInput, Button, ScrollView, Image, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 👈 AsyncStorage import
import { productPost } from "../Redux/Action/productAction";

export default function AddProduct({ navigation, route }) {
  const c_id = route.params;
  console.log('Category ID:', c_id);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.product);

  const [userId, setUserId] = useState(null); // 👈 for user id
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description1, setDescription1] = useState('');
  const [description2, setDescription2] = useState('');
  const [description3, setDescription3] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('id');
        if (id) {
          setUserId(id);
        }
      } catch (err) {
        console.log('Error fetching user ID:', err);
      }
    };

    getUserId();
  }, []);

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets.map(asset => asset.uri));
    }
  };

  const handleSubmit = () => {
    if (!productName || !quantity || !price || images.length === 0) {
      Alert.alert("Error", "Please fill all fields and select images.");
      return;
    }
  
    // Create FormData to send with the request
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('description1', description1);
    formData.append('description2', description2);
    formData.append('description3', description3);
    formData.append('instock', quantity);
  
    // Add images to FormData
    images.forEach((uri) => {
      const fileName = uri.split('/').pop();
      const fileType = fileName.split('.').pop();
      
      formData.append('images', {
        uri,
        name: fileName,
        type: `image/${fileType}`,
      });
    });
  
    // Check if userId exists in AsyncStorage
    if (!userId) {
      Alert.alert('Error', 'User ID not found!');
      return;
    }
  
    // Dispatch Redux action with FormData, categoryInfo, and userInfo
    dispatch(productPost(formData, c_id, userId)); 
  };
  

  useEffect(() => {
    if (success) {
      Alert.alert('Success', 'Product Added Successfully!');
      navigation.goBack(); // or wherever you want to navigate
    }

    if (error) {
      Alert.alert('Error', error);
    }
  }, [success, error]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Add Product</Text>

        <Button title="Pick Images" onPress={pickImages} />

        <ScrollView horizontal style={{ marginVertical: 20 }}>
          {images.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={styles.imagePreview}
            />
          ))}
        </ScrollView>

        <TextInput
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
          style={styles.input}
        />
        <TextInput
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Description 1"
          value={description1}
          onChangeText={setDescription1}
          style={styles.input}
        />
        <TextInput
          placeholder="Description 2"
          value={description2}
          onChangeText={setDescription2}
          style={styles.input}
        />
        <TextInput
          placeholder="Description 3"
          value={description3}
          onChangeText={setDescription3}
          style={styles.input}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#6C63FF" style={{ marginTop: 20 }} />
        ) : (
          <Button title="Submit Product" onPress={handleSubmit} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9D9EB",
    paddingTop: 40,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  imagePreview: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
});
