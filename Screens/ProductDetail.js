import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../Redux/Action/productAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductDetail({ navigation, route }) {
  const { p_id } = route.params;
  console.log(p_id);

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();

  const { singleProduct, error } = useSelector((state) => state.product);
  useEffect(() => {
    const fetchProductDetail = async () => {
      await dispatch(getSingleProduct(p_id)).finally(() => {
        setLoading(false);
      });
    };
    fetchProductDetail();
  }, [dispatch, p_id]);

  useEffect(() => {
    if (
     singleProduct &&
     singleProduct.product &&
     singleProduct.product.images &&
     singleProduct.product.images.length > 0
    ) {
      // Assuming the image URL is inside an 'image' key
      setSelectedImage(singleProduct.product.images[0]?.image);
    }
  }, [singleProduct]);
  

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const userInfo = AsyncStorage.getItem("id");

  const handleCart = (p_id) => {
    if (loading) return;
    dispatch(postCart(userInfo, p_id))
      .then(() => {
        setLoading(true);
        // setTimeout(() => {
        //   navigate(`/cart/${token}`);
        // }, 1000);
      })
      .catch(() => {
        console.log(error);
      });
  };

  // const handleBuy = (p_id) => {
  //   navigate(`/buy/${p_id}/${token}`);
  // };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingcontainer}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <View style={styles.bigImage}>
          <Image source={{uri:selectedImage}}   height={100}
          width={200} alt="product"/>
          </View>
          <View style={styles.ImageList}>
  {singleProduct?.product.images &&singleProduct.product.images.length > 0 ? (
   singleProduct.product.images.map((image, index) => (
      <Image
        source={{ uri: image.image }} 
        key={index}
        height={200}
        width={200}
      />
    ))
  ) : (
    <Image
      source={{ uri:singleProduct.product.images[0]?.image }} 
      height={200}
      width={200}
    />
  )}
</View>
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>ahvaoiudvhad</Text>
          <Text style={styles.description1}></Text>
          <Text style={styles.description2}></Text>
          <Text style={styles.description3}></Text>
          <Text style={styles.productPrice}></Text>
        </View>
        <View style={styles.btnContainer}>
          <Button title="Add to cart" />
          <Button title="Buy now" />
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
    backgroundColor: "#B9D9EB",
    padding: 20,
  },
});
