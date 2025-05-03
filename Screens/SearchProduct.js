import { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../Redux/Action/productAction";

export default function SearchProduct({ navigation, route }) {
  const { query } = route.params;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { products, error } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await dispatch(searchProduct(query));
      setLoading(false);
    };

    if (query) {
      fetchProducts();
    }
  }, [dispatch, query]);

  const productList = Array.isArray(products?.products)
    ? products.products
    : [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        {loading ? (
          <View style={styles.loadingcontainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : productList.length === 0 ? (
          <View style={styles.loadingcontainer}>
            <Text>No products found.</Text>
          </View>
        ) : (
          <View style={styles.productContainer}>
            <View style={styles.productGrid}>
              {productList.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.productItemContainer}
                  onPress={() =>
                    navigation.navigate("product-detail", { p_id: item._id })
                  }
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
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  container: {
    flex:1,
    backgroundColor: "#B9D9EB",
  },
  productContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productItemContainer: {
    width: "48%",
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
