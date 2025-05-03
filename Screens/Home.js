import React, { useState, useEffect, useRef } from "react";
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
import {
  useFonts,
  CrimsonPro_800ExtraBold,
} from "@expo-google-fonts/crimson-pro";
import { useFocusEffect } from '@react-navigation/native';
import img from "../assets/Images/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { data } from "../assets/Data/offers";
import { useDispatch, useSelector } from "react-redux";
import { categoryGetAll } from "../Redux/Action/categoryAction";
import { getAllProduct } from "../Redux/Action/productAction";

export default function Home({ navigation }) {
  let [fontsLoaded] = useFonts({
    CrimsonPro_800ExtraBold,
  });

  const dispatch = useDispatch();
  const [offer, setOffer] = useState(data);
  const [loading, setLoading] = useState(true);
  const { categoryInfo, error, loading: categoryLoading } = useSelector((state) => state.category || {});
  const categories = categoryInfo?.categories || [];

  const offerListRef = useRef(null);

  const { productInfo } = useSelector((state) => state.product);
  const product = productInfo?.products
    ? [...productInfo.products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await dispatch(categoryGetAll()).finally(() => {
          setLoading(false);
        });
      };
      fetchData();
    }, [dispatch])
  );

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      await dispatch(getAllProduct());
      setLoading(false);
    };
    fetchProduct();
  }, [dispatch]);

  const autoScrollFlatList = (ref, dataLength, delay = 3000) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.scrollToIndex({
          animated: true,
          index: currentIndex,
        });
        currentIndex = (currentIndex + 1) % dataLength;
      }
    }, delay);

    return () => clearInterval(interval);
  };

  const handleSearch = async () => {
    navigation.navigate("searchProduct", { query: searchText });
    setSearchText("");
  };

  useEffect(() => {
    const stopAutoScroll = autoScrollFlatList(offerListRef, offer.length);
    return stopAutoScroll;
  }, [offer]);

  if (loading && !fontsLoaded) {
    return (
      <SafeAreaView style={styles.loadingcontainer}>
        <ActivityIndicator size={"large"} />
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
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleSearchTextChange}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleSearch}>
            <Ionicons name="search" size={20} style={styles.searchIcon} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryHeader}>Category</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryItemContainer}
                onPress={() => navigation.navigate("category-product", { cat_id: item._id })}
              >
                <Image
                  source={{ uri: item.photo }}
                  style={styles.categoryImage}
                  resizeMode="contain"
                />
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.offerContainer}>
          <Text style={styles.offerHeader}>Trending offers</Text>
          <FlatList
            ref={offerListRef}
            data={offer}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.offerItemContainer}
                onPress={() => navigation.navigate("category-product", { cat_id: item.id })}
              >
                <Image
                  source={item.image}
                  style={styles.offerImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.productContainer}>
          <Text style={styles.productHeader}>Explore now</Text>
          <View style={styles.productGrid}>
            {product.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={styles.productItemContainer}
                onPress={() => navigation.navigate("product-detail", { p_id: item._id })}
              >
                <Image
                  source={{
                    uri: item.images && item.images.length > 0 ? item.images[0].image : 'https://path/to/default/image.png',
                  }}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>₹{item.price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#B9D9EB",
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
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: "600",
    fontFamily: "CrimsonPro_800ExtraBold",
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
    fontFamily: "CrimsonPro_800ExtraBold",
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
    fontFamily: "CrimsonPro_800ExtraBold",
  },
  offerContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  offerHeader: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
    fontFamily: "CrimsonPro_800ExtraBold",
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
    fontFamily: "CrimsonPro_800ExtraBold",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productItemContainer: {
    width: "32%",
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    backgroundColor: "#F5F5DC",
    borderRadius: 10,
  },
  productName: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
  productPrice: {
    fontWeight: "600",
  },
});
