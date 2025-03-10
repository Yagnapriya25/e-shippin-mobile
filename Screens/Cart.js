import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function Cart() {

  const [cart,setCart]=useState([]);
  const [loading,setLoading]=useState(true);
  

  useEffect(()=>{
    const fetchCartData = async()=>{
      try {
        const res = await fetch(`https://e-shipin-server.onrender.com/api/cart/get/671719b5b8de5c597b8e6b51`,{
          method:"GET"
        })
        const data = await res.json();
        if(data && Array.isArray(data.items)){
          setCart(data.items)
          setLoading(false)
        }
      } catch (error) {
        // setLoading(true)
      }
    }
    fetchCartData();
  },[])

  //  if(loading){
  //   return(
  //     <View>
  //     <Text>Loading...</Text>
  //     </View>
  //   )
  //  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.cartContainer}>
        <View style={styles.cartHeader}>
          <Text style={styles.cartCount}>Cart : </Text>
          <Ionicons name="trash" size={20} style={styles.cartEmpty} />
        </View>
        {
          cart.map((item)=>(
            <View style={styles.cartItemContainer} key={item._id}>
            <Text>{item.product.name}</Text>
          </View>
          ))
        }
        
      
        
      </ScrollView>
      <View style={styles.cartPayment}>
        <Text style={styles.cartPaymentText}>Total Price : </Text>
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
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom:10,
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
  },
});
