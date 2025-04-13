import { useEffect, useState } from "react";
import RazorpayCheckout from 'react-native-razorpay';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getSingleProduct } from "../Redux/Action/productAction";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAddress } from "../Redux/Action/addressAction";

export default function BuyPage({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const dispatch = useDispatch();
  const { singleProduct } = useSelector((state) => state.product);
  const { addressInfo } = useSelector((state) => state.address);
  const { p_id } = route.params;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      await dispatch(getSingleProduct(p_id));
      setLoading(false);
    };
    fetchProduct();
  }, [dispatch, p_id]);

  useEffect(() => {
    const fetchAddress = async () => {
      const id = await AsyncStorage.getItem("id");
      setLoading(true);
      await dispatch(getAddress(id));
      setLoading(false);
    };
    fetchAddress();
  }, [dispatch]);

  useEffect(() => {
    if (!RazorpayCheckout) {
      console.error("RazorpayCheckout is not loaded or is null.");
    } else {
      console.log("RazorpayCheckout is loaded and available.");
    }
  }, []);

  const wrapText = (text) => text.replace(/(.{10})/g, '$1\u200B');

  const formatePrice = (price) => {
    const roundPrice = Math.round(price);
    return new Intl.NumberFormat('en-IN', {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(roundPrice);
  };

  useEffect(() => {
    if (!RazorpayCheckout) {
      console.error('RazorpayCheckout is not initialized.');
    } else {
      console.log('RazorpayCheckout is initialized.');
    }
  }, []);

  const handleBuyNow = async (p_id) => {
    setPaymentLoading(true);
    try {
      const id = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`https://e-shipin-server.onrender.com/api/order/payment/${id}/${p_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        const options = {
          description: 'Order Payment',
          image: 'https://i.imgur.com/7yUE6JO.png',
          currency: data.currency,
          key: 'rzp_test_zVUZCNrVjLSv79', // Your test key here
          amount: data.amount, // Amount should be in paise
          name: 'E-Shippin',
          order_id: data.id,
          prefill: {
            name: addressInfo?.address?.name || '',
            email: addressInfo?.address?.email || '',
            contact: addressInfo?.address?.phoneNumber || '',
          },
          theme: { color: '#F37254' },
        };

        console.log("Razorpay Options:", JSON.stringify(options, null, 2));

        if (RazorpayCheckout) {
          RazorpayCheckout.open(options).then((paymentData)=>{
            console.log("Payment Success:", paymentData);
            verifyPayment(paymentData, token);
          }) .catch((error) => {
            console.log(error);
           });
          
           
        } else {
          console.log('RazorpayCheckout is not initialized.');
          alert('RazorpayCheckout is not initialized.');
        }
      } else {
        alert(data.error || "Failed to create Razorpay order!");
      }
    } catch (err) {
      console.error("Payment error: ", err);
      alert("Something went wrong while initiating payment!");
    } finally {
      setPaymentLoading(false);
    }
  };

  const verifyPayment = async (response, token) => {
    try {
      const verificationResponse = await fetch(`https://e-shipin-server.onrender.com/api/order/payment/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }),
      });

      const verificationData = await verificationResponse.json();

      if (verificationResponse.ok) {
        alert("Payment Successful!");
        console.log("Verified Payment: ", verificationData);
      } else {
        alert("Payment verification failed!");
        console.error("Verification failed:", verificationData);
      }
    } catch (error) {
      alert("Error verifying payment");
      console.error("Verification error: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addressContainer}>
        <View style={styles.addressSide}>
          {addressInfo?.address ? (
            <View>
              <Text style={{ fontWeight: "700" }}>Address :</Text>
              <Text style={styles.name}>{addressInfo.address.name}</Text>
              <Text style={styles.city}>{addressInfo.address.city}</Text>
              <Text style={styles.landmark}>{addressInfo.address.landmark}</Text>
              <Text style={styles.district}>{addressInfo.address.district}</Text>
              <Text style={styles.pincode}>{addressInfo.address.pincode}</Text>
              <Text style={styles.phoneNumber}>{addressInfo.address.phoneNumber}</Text>
            </View>
          ) : (
            <View>
              <Text>Address not found</Text>
            </View>
          )}
        </View>
        {addressInfo?.address ? (
          <TouchableOpacity onPress={() => navigation.navigate("editAddress")} style={styles.editAdressContainer}>
            <Text style={styles.addAdress}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("addAddress")} style={styles.addAdressContainer}>
            <Text style={styles.addAdress}>Add</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: singleProduct.product?.images[0].image }} style={styles.productImage} height={100} width={100} />
        </View>
        <View style={styles.productDetailContainer}>
          <Text style={styles.productName}>{singleProduct.product.name}</Text>
          <Text style={styles.productCategoryName}>{singleProduct.product.category.name}</Text>
          <Text style={styles.productDescrition1}>{wrapText(singleProduct.product.description1)}</Text>
        </View>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPrice}>{formatePrice(singleProduct.product.price)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.btnContainer} onPress={() => handleBuyNow(singleProduct.product._id)}>
        <Text style={styles.btn}>Buy now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    backgroundColor: "#B9D9EB",
  },
  addressContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
  },
  editAdressContainer: {
    display: "flex",
    marginTop: 50,
    marginLeft: 40,
  },
  addAdressContainer: {
    marginLeft: 70,
  },
  addAdress: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: "#007FFF",
    color: "#fff",
    width: 55,
    height: 30,
    borderRadius: 6,
    fontWeight: "600",
  },
  productContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  productDetailContainer: {
    paddingHorizontal: 8,
    flexShrink: 1,
    flexGrow: 1,
  },
  productName: {
    fontWeight: "600",
    paddingBottom: 5,
  },
  productCategoryName: {
    color: "grey",
  },
  productDescrition1: {
    paddingVertical: 8,
  },
  productPrice: {
    fontWeight: "800",
  },
  btnContainer: {
    marginHorizontal: "25%",
    marginVertical: "20%",
  },
  btn: {
    backgroundColor: "#3EB489",
    paddingVertical: 9,
    paddingHorizontal: 40,
    width: 150,
    color: "#fff",
    fontSize: 18,
    borderRadius: 10,
  },
});
