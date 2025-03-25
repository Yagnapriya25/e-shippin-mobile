import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import img from "../assets/Images/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { data } from "../assets/Data/offers";
import { useDispatch, useSelector } from "react-redux";
import { categoryGetAll, categoryGetSingle } from "../Redux/Action/categoryAction";
import { getAllProduct } from "../Redux/Action/productAction";

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const [offer, setOffer] = useState(data);
  const [loading, setLoading] = useState(true);
  const { categoryInfo, error, loading: categoryLoading } = useSelector((state) => state.category || {});
  const categories = categoryInfo?.categories || [];

  const {productInfo}  = useSelector((state) => state.product);
  const product = productInfo?.products || [];
   
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(categoryGetAll()).finally(()=>{
        setLoading(false)
      });
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      await dispatch(getAllProduct());
      setLoading(false);
    };
    fetchProduct();
  }, [dispatch]);






  if (loading) {
    return (
      <SafeAreaView style={styles.loadingcontainer}>
        <ActivityIndicator size={"large"}/>
      </SafeAreaView>
    );
  }

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
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryHeader}>Category</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity 
              style={styles.categoryItemContainer} 
              onPress={()=>navigation.navigate("category-product",{cat_id:item._id})}
            >
              <Image source={{ uri: item.photo }} style={styles.categoryImage} resizeMode="contain"/>
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.offerContainer}>
          <Text style={styles.offerHeader}>Trending offers</Text>
          <FlatList
            data={offer}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.offerItemContainer}>
                <Image
                  source={item.image}
                  style={styles.offerImage}
                  resizeMode="contain"
                />
              </View>
            )}
          />
        </View>

        <View style={styles.productContainer}>
          <Text style={styles.productHeader}>Explore now</Text>
          <View style={styles.productGrid}>
            {product.map((item) => (
              <View key={item._id} style={styles.productItemContainer}>
                <Image
                  source={{
                    uri: item.images && item.images.length > 0 ? item.images[0].image : 'https://path/to/default/image.png'
                  }}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>₹{item.price}</Text>
                
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingcontainer:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flex:1,
    backgroundColor:"#B9D9EB"
  },
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
  offerContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  offerHeader: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  offerItemContainer: {
    flex: 1,
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
    height: 150,
  },
  offerImage: {
    borderRadius: 10,
    marginBottom: 10,
  },
  productContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  productHeader: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  productGrid: {
    flexDirection: 'row',  // Items in a row
    flexWrap: 'wrap',      // Allow wrapping to the next line
    justifyContent: 'space-between',  // Add space between items
  },
  productItemContainer: {
    width: '32%',          // 2 items per row
    marginBottom: 10,      // Add space between items
    alignItems: 'center',
    backgroundColor:"#fff",
    padding:10,
    borderRadius:8,
  },
  productImage: {
    width: 80,
    height: 80,
    backgroundColor:"#F5F5DC",
    borderRadius: 10,
  },
  productName: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
  productPrice:{
    fontWeight:600
  }
});
