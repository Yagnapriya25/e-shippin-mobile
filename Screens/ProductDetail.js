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
  
console.log(singleProduct);

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
          <View style={styles.bigImageContainer}>
          <Image source={{uri:selectedImage}}
          alt="product" resizeMode="contain" style={styles.bigImage}/>
          </View>
          <View style={styles.ImageListContainer}>
  {singleProduct?.product.images &&singleProduct.product.images.length > 0 ? (
   singleProduct.product.images.map((image, index) => (
      <Image
        source={{ uri: image.image }} 
        key={index}
        style={styles.ImageList}
        resizeMode="contain"
      />
    ))
  ) : (
    <Image
      source={{ uri:singleProduct.product.images[0]?.image }} 
     
    />
  )}
</View>
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{singleProduct.product.name}</Text>
          <Text style={styles.description1}>{singleProduct.product.description1}</Text>
          <Text style={styles.description2}>{singleProduct.product.description2}</Text>
          <Text style={styles.description3}>{singleProduct.product.description3}</Text>
          <Text style={styles.productPrice}>{formatPrice(singleProduct.product.price)}</Text>
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
  imageContainer:{
    display:"flex",
    flexDirection:"row",
    gap:2
  },
  bigImage:{
  height:200,
  position:"absolute",
  bottom:100,
  width:250,
  
  },
  bigImageContainer:{
  height:300,
  width:250,
  // backgroundColor:"#fff",
  },
  ImageListContainer:{
  height:300,
  width:100,
  display:"flex",
  gap:10,
  },
  ImageList:{
  height:65,
  width:100,
  
  },
});
