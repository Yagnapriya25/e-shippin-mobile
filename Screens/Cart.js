import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import img from '../assets/Images/logo.png'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cartRemove, decreaseCart, emptyCart, getCart, increaseCart } from "../Redux/Action/cartAction";
import { useDispatch, useSelector } from "react-redux";

export default function Cart({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const dispatch = useDispatch();
  const { cartInfo } = useSelector((state) => state.cart);

  const items = cartInfo?.cart?.items || [];
  const totalPrice = cartInfo?.totalPrice?.totalPrice || 0;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        if (id) {
          setUserInfo(id);
        }
      } catch (error) {
        console.log("Error fetching user ID:", error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userInfo) {
      const fetchCart = async () => {
        setLoadingCart(true);
        try {
          await dispatch(getCart(userInfo));
        } catch (error) {
          console.log("Error fetching cart:", error);
        } finally {
          setLoadingCart(false);
        }
      };
      fetchCart();
    }
  }, [userInfo]);

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
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(roundedPrice);
  };

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
          <Ionicons name="trash" size={20} style={styles.cartEmpty} onPress={handleRemoveCart} />
        </View>

        {items.map((p) => (
          <View style={styles.cartItemContainer} key={p._id}>
            <Image
              source={{
                uri: p.product.images && p.product.images.length > 0
                  ? p.product.images[0].image
                  : img
              }}
              resizeMode="contain"
              style={styles.cartItemImages}
            />
            <View style={styles.cartItemNameSite}>
              <Text style={styles.cartProductName}>{p.product.name}</Text>
              <Text style={styles.cartProductPrice}>{formatPrice(p.product.price)}</Text>
            </View>
            <View style={styles.cartQuantity}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.operator} onPress={() => handleQuantityIncrease(p.product._id)}>+</Text>
                <Text style={styles.operatorValue}>{p.quantity}</Text>
                <Text style={styles.operator} onPress={() => handleQuantityDecrease(p.product._id)}>-</Text>
              </View>
              <Ionicons name="trash" size={16} onPress={() => handleRemoveProduct(p.product._id)} />
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.cartPayment}>
        <Text style={styles.cartPaymentText}>Total Price: {formatPrice(totalPrice)}</Text>
        <Text style={styles.cartPaymentBtn}>Buy Now</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B9D9EB"
  },
  container: {
    flex: 1,
    backgroundColor: "#B9D9EB",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingTop: 50
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
    height: 90,
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  cartItemImages: {
    height: 70,
    width: 140
  },
  cartItemNameSite: {
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  cartProductName: {
    fontSize: 15,
    fontWeight: "400"
  },
  cartProductPrice: {
    fontSize: 16,
    paddingTop: 10,
    fontWeight: "500"
  },
  cartQuantity: {
    paddingTop: 10,
  },
  operator: {
    fontSize: 18,
    paddingHorizontal: 10,
    fontWeight: "bold"
  },
  operatorValue: {
    fontSize: 18,
    paddingHorizontal: 5
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
    color: "#fff"
  },
});
