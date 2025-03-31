import { useEffect, useState } from "react";
import { Image, SafeAreaView,Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../Redux/Action/productAction";



export default function ProductDetail({navigation,route}){
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  const{singleProduct,error}=useSelector((state)=>state.product || []);
   
  const product = singleProduct?.product || {};
  const {p_id}= route.params;
  console.log(singleProduct);

  useEffect(()=>{
    const fetchData = async()=>{
      await dispatch(getSingleProduct(p_id)).finally(()=>{
        setLoading(false);
      })
    }
    fetchData();
  },[dispatch])
   

    return(
        <SafeAreaView style={styles.container}>
         <View style={styles.imageContainer}>
         <Image source={""}/>
         </View>
         <View style={styles.nameContainer}>
         <Text style={styles.productName}>{product.name}</Text>
         <Text style={styles.productPrice}>435450297</Text>
         </View>
         <View style={styles.btnContainer}>
         <TouchableOpacity style={styles.addToCartBtn}>
         <Text> Add to cart</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.buyNowBtn}>
         <Text>Buy Now</Text>
         </TouchableOpacity>
         </View>
         <View style={styles.productDetailContainer}>
         <Text style={styles.heading}>Product Detail :</Text>
         <Text style={styles.description1}>⁕ {product.description1}</Text>
         <Text style={styles.description2}>⁕ {product.description2}</Text>
         <Text style={styles.description3}>⁕ {product.description3}</Text>
         </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
  loadingcontainer:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flex:1,
    backgroundColor:"#B9D9EB"
  },
  container: {
    flex: 1,
    padding:20,
    backgroundColor: "#B9D9EB",
  },
})