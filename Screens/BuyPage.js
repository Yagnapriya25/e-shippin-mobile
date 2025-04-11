import { useEffect, useState } from "react";
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

export default function BuyPage({ navigation,route }) {
   const [loading,setLoading]=useState(true);
   const [paymentLoading, setPaymentLoading] = useState(false);
   const [razorpayLoaded, setRazorpayLoaded] = useState(false);
   const dispatch = useDispatch();
   const { singleProduct } = useSelector((state) => state.product);
  const {addressInfo} = useSelector((state)=>state.address)
   const {p_id} = route.params;

   useEffect(() => {
      const fetchProduct = async () => {
          setLoading(true);
          await dispatch(getSingleProduct(p_id));
          setLoading(false);
      };
      fetchProduct();
  }, [dispatch, p_id]);


  useEffect(()=>{
    const fetchAddress = (async()=>{
      const id =await AsyncStorage.getItem("id");
      setLoading(true);
      await dispatch(getAddress(id));
      setLoading(false);
      
    })
      fetchAddress();
  },[dispatch])
 
  const wrapText = (text) => text.replace(/(.{10})/g, '$1\u200B');

  const formatePrice=(price)=>{
    const roundPrice = Math.round(price);
    return new Intl.NumberFormat('en-IN',{
      style:"currency",
      currency:"INR",
      maximumFractionDigits:0,

    }).format(roundPrice)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addressContainer}>
        <View style={styles.addressSide}>
        {
          addressInfo?.address ? (
            <View>
              <Text style={{fontWeight:"700"}}>Address :</Text>
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
          )
        }
        </View>
        {
        addressInfo?.address?(
        <TouchableOpacity onPress={() => handleAddAddress()} style={styles.addAdressContainer}>
          <Text style={styles.addAdress}>Edit</Text>
        </TouchableOpacity>
        ) : (
         <TouchableOpacity onPress={() => handleAddAddress()} style={styles.addAdressContainer}>
          <Text style={styles.addAdress}>Add</Text>
        </TouchableOpacity>
        )
        }
        
      </View>
      <View style={styles.productContainer}>
      <View style={styles.imageContainer}>
      <Image source={{uri:singleProduct.product?.images[0].image}} style={styles.productImage} height={100} width={100}/>
      </View>
      <View style={styles.productDetailContainer}>
      <Text style={styles.productName}>{singleProduct.product.name}</Text>
      <Text style={styles.productCategoryName}>{singleProduct.product.category.name}</Text>
      <Text style={styles.productDescrition1} > {wrapText(singleProduct.product.description1)}</Text>
      </View>
     <View style={styles.productPriceContainer}>
             <Text style={styles.productPrice}>{formatePrice(singleProduct.product.price)}</Text>
     </View>
      </View>
      <TouchableOpacity style={styles.btnContainer}>
        <Text style={styles.btn}>Buy now</Text>
      </TouchableOpacity>
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
    padding: 20,
    paddingTop:100,
    backgroundColor: "#B9D9EB",
  },
  addressContainer:{
    backgroundColor:"#fff",
    padding:20,
    marginBottom:10,
    display:"flex",
    flexDirection:"row",
    borderRadius:10
  },
  addAdressContainer:{
    display:"flex",
    marginTop:50,
    marginLeft:40
  },
  addAdress:{
   paddingHorizontal:14,
   paddingVertical:5,
   backgroundColor:"#007FFF",
   color:"#fff",
   width:55,
   height:30,
   borderRadius:6,
   fontWeight:"600"
  },
  productContainer:{
   display:"flex",
   flexDirection:"row",
   justifyContent:"space-between",
   backgroundColor:"#fff",
   padding:10,
   borderRadius:10
  },
 productDetailContainer: {
  paddingHorizontal: 8,
  flexShrink: 1,
  flexGrow: 1,  
},
  productName:{
    fontWeight:"600",
    paddingBottom:5
  },
  productCategoryName:{
    color:"grey"
  },
  productDescrition1:{
    paddingVertical:8,
  },
  productPrice:{
    fontWeight:"800"
  },
  btnContainer:{
   marginHorizontal:"40%",
   marginVertical:"20%",
 },
 
});
