import React, { useEffect, useState } from "react";
import RazorpayCheckout from 'react-native-razorpay';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  cartRemove,
  decreaseCart,
  emptyCart,
  getCart,
  increaseCart,
} from "../Redux/Action/cartAction";
import { useDispatch, useSelector } from "react-redux";
import img from "../assets/Images/logo.png"; // Local fallback image

export default function Cart({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const dispatch = useDispatch();
  const { cartInfo } = useSelector((state) => state.cart);

  const items = cartInfo?.cart?.items || [];
  const totalPrice = cartInfo?.totalPrice?.totalPrice || 0;
  const { addressInfo } = useSelector((state) => state.address);

  useEffect(() => {
    const fetchUser = async () => {
      const id = await AsyncStorage.getItem("id");
      setUserInfo(id);
      setLoadingUser(false);
    };
    fetchUser();
  }, []);

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

  useEffect(() => {
    if (!RazorpayCheckout) {
      console.error('RazorpayCheckout is not initialized.');
    } else {
      console.log('RazorpayCheckout is initialized.');
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (!userInfo) return;
      try {
        setLoadingCart(true);
        await dispatch(getCart(userInfo));
      } catch (error) {
        console.log("Error fetching cart:", error);
      } finally {
        setLoadingCart(false);
      }
    };
    fetchCart();
  }, [userInfo]);

  // Use setInterval to refresh cart every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userInfo) {
        dispatch(getCart(userInfo)); // Re-fetch cart data
      }
    }, 5000); // 10 seconds interval

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [userInfo, dispatch]);

  const handleRemoveCart = async () => {
    if (loadingCart || !userInfo) return;
    setLoadingCart(true);
    try {
      await dispatch(emptyCart(userInfo));
    } catch (error) {
      console.log("Error removing all cart items:", error);
    } finally {
      setLoadingCart(false);
    }
  };

  const handleRemoveProduct = async (productId) => {
    if (loadingUpdate || !userInfo) return;
    setLoadingUpdate(true);
    try {
      await dispatch(cartRemove(userInfo, productId));
      await dispatch(getCart(userInfo));
    } catch (error) {
      console.error("Error removing product:", error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleQuantityDecrease = async (productId) => {
    if (loadingUpdate || !userInfo) return;
    setLoadingUpdate(true);
    try {
      await dispatch(decreaseCart(userInfo, productId));
      await dispatch(getCart(userInfo));
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleQuantityIncrease = async (productId) => {
    if (loadingUpdate || !userInfo) return;
    setLoadingUpdate(true);
    try {
      await dispatch(increaseCart(userInfo, productId));
      await dispatch(getCart(userInfo));
    } catch (error) {
      console.error("Error increasing quantity:", error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const formatPrice = (price) => {
    const roundedPrice = Math.round(price);
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(roundedPrice);
  };


  const handleBuyNow = async (p_id) => {
    setPaymentLoading(true);
    try {
      const id = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`https://e-shipin-server.onrender.com/api/order/purchase/${id}`, {
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
          amount: data.order.amount, // Amount should be in paise
          name: 'E-Shippin',
          order_id: data.order.id,
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
        console.log("Verified Payment: ", verificationData);
        setTimeout(()=>{
          handleRemoveCart()
        },2000)
      } else {
        alert("Payment verification failed!");
        console.error("Verification failed:", verificationData);
      }
    } catch (error) {
      alert("Error verifying payment");
      console.error("Verification error: ", error);
    }
  };



  // Check if cart data is still loading
  if (loadingUser || loadingCart) {
    return (
      <SafeAreaView style={styles.loadingcontainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={img} style={styles.logo} />
        <Text style={styles.logotext}>E-shippin</Text>
      </View>

      <ScrollView style={styles.cartContainer}>
        <View style={styles.cartHeader}>
          <Text style={styles.cartCount}>Cart: {items.length}</Text>
          <Ionicons
            name="trash"
            size={20}
            style={styles.cartEmpty}
            onPress={handleRemoveCart}
          />
        </View>

        {/* Loop over cart items */}
        {items.map((p) => {
          const rawUrl = p.product?.images?.[0]?.image;
          // Check if rawUrl is valid, otherwise use fallback image
          const imageUrl =
            rawUrl && typeof rawUrl === "string" && rawUrl.trim() !== ""
              ? { uri: rawUrl }
              : img;

          return (
            <View style={styles.cartItemContainer} key={p._id}>
              <Image
                source={imageUrl}
                style={styles.cartItemImages}
                resizeMode="contain"
              />
              <View style={styles.cartItemNameSite}>
                <Text style={styles.cartProductName}>{p.product.name}</Text>
                <Text style={styles.cartProductPrice}>
                  {formatPrice(p.product.price)}
                </Text>
              </View>
              <View style={styles.cartQuantity}>
                <View style={{ flexDirection: "row"}}>
                  <TouchableOpacity
                    onPress={() => handleQuantityIncrease(p.product._id)}
                  >
                    <Text style={styles.operator}>+</Text>
                  </TouchableOpacity>
                  <Text style={styles.operatorValue}>{p.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => handleQuantityDecrease(p.product._id)}
                  >
                    <Text style={styles.operator}>-</Text>
                  </TouchableOpacity>
                </View>
                <Ionicons
                  name="trash"
                  size={16}
                  color="red"
                  style={styles.productRemove}
                  onPress={() => handleRemoveProduct(p.product._id)}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.cartPayment}>
        <Text style={styles.cartPaymentText}>
          Total Price: {formatPrice(totalPrice)}
        </Text>
        <Text style={styles.cartPaymentBtn} onPress={handleBuyNow}>Buy Now</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B9D9EB",
  },
  container: {
    flex: 1,
    backgroundColor: "#B9D9EB",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingTop: 50,
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
  cartContainer: {
    padding: 15,
  },
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  cartCount: {
    fontSize: 18,
  },
  cartEmpty: {
    color: "red",
  },
  cartItemContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  cartItemImages: {
    height: 80,
    width: 80,
    marginRight: 10,
  },
  cartItemNameSite: {
    flex: 1,
    justifyContent: "center",
  },
  cartProductName: {
    fontSize: 14,
    fontWeight: "500",
    flexWrap: "wrap",
    flexShrink: 1,
  },
  cartProductPrice: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 6,
  },
  cartQuantity: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  operator: {
    fontSize: 18,
    paddingHorizontal: 6,
    fontWeight: "bold",
  },
  operatorValue: {
    fontSize: 18,
    minWidth: 25,
    textAlign: "center",
  },
  productRemove:{
   paddingTop:10
  },
  cartPayment: {
    backgroundColor: "#D0F0C0",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cartPaymentText: {
    paddingTop: 10,
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  cartPaymentBtn: {
    backgroundColor: "orange",
    width: 120,
    textAlign: "center",
    paddingTop: 10,
    borderRadius: 20,
    fontWeight: "800",
    color: "#fff",
  },
});

