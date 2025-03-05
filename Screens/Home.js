import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { StyleSheet } from "react-native";
import img from "../assets/Images/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { data } from "../assets/Data/offers";

export default function Home() {
  // Set up state for storing data
  const [offer,setOffer]=useState(data);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [error, setError] = useState(null); // For handling errors

  // Fetch data from the API when the component mounts
  useEffect(() => {
    // Fetch categories data from API
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch(`https://e-shipin-server.onrender.com/api/category/getall`); // Replace with your API URL
        
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch data from API");
        }

        const responseData = await categoriesResponse.json();

        // Extract categories from the response
        const categoriesData = responseData.categories;
        setCategories(categoriesData); // Set categories data
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Stop loading after fetching is done
      }
    };

    fetchData();
  }, []); // Empty dependency array means this will run once on mount

  // If loading, show loading text
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // If there was an error, show error message
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={img} style={styles.logo} />
        <Text style={styles.logotext}>E-shippin</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <Ionicons name="search" size={20} style={styles.searchIcon} />
      </View>
      <ScrollView>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryHeader}>Category</Text>
          {/* Use FlatList to render categories */}
          <FlatList
            data={categories}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.categoryItemContainer}>
                <Image source={{ uri: item.photo }} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{item.name}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.offerContainer}>
          <Text style={styles.offerHeader}>Trending offers</Text>
          {/* Use FlatList to render categories */}
          <FlatList
            data={offer}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.offerItemContainer}>
                <Image source={item.image} style={styles.offerImage} resizeMode="contain"/>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#B9D9EB",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 30,

  },
  logo: {
    height: 30,
    width: 30,
    
  },
  logotext: {
    padding: 5,
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: "600",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 30,

  },
  searchInput: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingLeft: 10,
  },
  searchIcon: {
    padding: 5,
    paddingTop: 10,
  },
  categoryContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,

   
  },
  categoryHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryItemContainer: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  offerContainer:{
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  offerHeader:{
    fontSize: 16,
    fontWeight: "bold",
  },
  offerItemContainer:{
    flex: 1,
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
    height:150
  },
  offerImage:{
    borderRadius: 10,
    marginBottom: 10,
  }
});
