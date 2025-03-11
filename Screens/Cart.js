import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
 Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import img from '../assets/Images/offer2.jpeg'

export default function Cart() {

  const [cart,setCart]=useState([]);
  const [loading,setLoading]=useState(true);
  const [cartCount,setcartCount]=useState();
  const [cartTotalPrice,setCartTotalPrice]=useState();
  

  useEffect(()=>{
    const fetchCartData = async()=>{
      try {
        const res = await fetch(`https://e-shipin-server.onrender.com/api/cart/get/671719b5b8de5c597b8e6b51`,{
          method:"GET"
        })
        const data = await res.json();
        console.log(data.totalPrice.totalPrice);
        if(data && Array.isArray(data.cart.items)){
          setCart(data.cart.items)
          setcartCount(data.cart.items.length)
          setCartTotalPrice(data.totalPrice.totalPrice)
          setLoading(false)
        }
      } catch (error) {
        setLoading(true)
      }
    }
    fetchCartData();
  },[])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

   if(loading){
    return(
      <View>
      <Text>Loading...</Text>
      </View>
    )
   }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.cartContainer}>
        <View style={styles.cartHeader}>
          <Text style={styles.cartCount}>Cart : {cartCount}</Text>
          <Ionicons name="trash" size={20} style={styles.cartEmpty} />
        </View>
        {
          cart.map((item)=>(
            <View style={styles.cartItemContainer} key={item._id}>
            <Image
            source={{
              uri: item.product.images && item.product.images.length > 0
                ? item.product.images[0].image
                : img
            }}
            resizeMode="contain"
            style={styles.cartItemImages}
          />
          <View style={styles.cartItemNameSite}>
          <Text style={styles.cartProductName}>{item.product.name}</Text>
          <Text style={styles.cartProductPrice}>{formatPrice(item.product.price)}</Text>
          </View>
          </View>
          ))
        }
        
      
        
      </ScrollView>
      <View style={styles.cartPayment}>
        <Text style={styles.cartPaymentText}>Total Price :{formatPrice(cartTotalPrice)} </Text>
        <Text style={styles.cartPaymentBtn}>Buy Now </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9D9EB",
  },
  cartContainer: {
    padding: 15,
  },
  cartHeader: {
    display: "flex",
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
    width: "100%",
    display: "flex",
    flexDirection:"row",
    padding: 10,
    borderRadius: 10,
    marginBottom:10,
  },
  cartItemImages:{
     height:70,
     width:140
  },
  cartItemNameSite:{
    paddingHorizontal:30,
    paddingVertical:10
  },
  cartProductName:{
    fontSize:15,
    fontWeight:500

  },
  cartProductPrice:{
     fontSize:16,
     paddingTop:10,
     fontWeight:600
  },
  cartPayment: {
    backgroundColor: "#D0F0C0",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cartPaymentText: {
    paddingTop: 10,
    color: "#000",
    fontSize: 20,
    fontWeight: 500,
  },
  cartPaymentBtn: {
    backgroundColor: "orange",
    width: 120,
    textAlign: "center",
    paddingTop: 10,
    borderRadius: 20,
    fontWeight: 800,
    color:"#fff"
  },
});
