import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryProducts } from "../Redux/Action/categoryAction";
import {
  useFonts,
  CrimsonPro_800ExtraBold,
} from "@expo-google-fonts/crimson-pro";

export default function CategoryProduct({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    CrimsonPro_800ExtraBold,
  });

  const { categoryInfo, error } = useSelector((state) => state.category || {});

  const product = categoryInfo?.products
    ? [...categoryInfo.products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  // const product = categoryInfo?.products || [];

  const { cat_id } = route.params;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      await dispatch(getCategoryProducts({ cat_id }));
      setLoading(false);
    };
    fetchCategories();
  }, [dispatch, cat_id]);

  if (loading || !fontsLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.header}>Products</Text>
        <View style={styles.productGrid}>
          {product.map((item) => (
            <Pressable
              key={item._id}
              style={styles.productItemContainer}
              onPress={() => navigation.navigate("product-detail", { p_id: item._id })}
            >
              <Image
                source={{
                  uri:
                    item.images && item.images.length > 0
                      ? item.images[0].image
                      : "https://path/to/default/image.png",
                }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>₹{item.price}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B9D9EB",
  },
  container: {
    flex: 1,
    backgroundColor: "#B9D9EB",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "CrimsonPro_800ExtraBold",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productItemContainer: {
    width: "48%",
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    backgroundColor: "#F5F5DC",
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    fontFamily: "CrimsonPro_800ExtraBold",
  },
  productPrice: {
    fontWeight: "600",
    textAlign: "center",
    marginTop: 5,
  },
});
