import { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getSingleProduct } from "../Redux/Action/productAction";

export default function BuyPage({ navigation,route }) {
   const [loading,setLoading]=useState(true);
   const [paymentLoading, setPaymentLoading] = useState(false);
   const [razorpayLoaded, setRazorpayLoaded] = useState(false);
   const dispatch = useDispatch();
   const { singleProduct } = useSelector((state) => state.product);
   const { addressInfo } = useSelector((state) => state.address);
   const {p_id} = route.params;

   useEffect(() => {
      const fetchProduct = async () => {
          setLoading(true);
          await dispatch(getSingleProduct(p_id));
          setLoading(false);
      };
      fetchProduct();
  }, [dispatch, p_id, token]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addressContainer}>
        <View style={styles.addressSide}>
          <Text style={styles.name}>ahvaidu</Text>
          <Text style={styles.city}>ahviavu</Text>
          <Text style={styles.landmark}>akhvaiudhf</Text>
          <Text style={styles.district}>akjod</Text>
          <Text style={styles.pincode}>falsdfhioa</Text>
          <Text style={styles.phoneNumber}>asoihf</Text>
        </View>
        <TouchableOpacity onPress={() => handleAddAddress()}>
          <Text style={styles.addAdress}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.productContainer}>
        <Image source={""} style={styles.productImage} />
        <Text style={styles.productName}>adfdag</Text>
        <Text style={styles.productCategoryName}>aoihgoiadg</Text>
        <Text style={styles.productDescrition1}>klahofihad</Text>
        <Text style={styles.productPrice}>686</Text>
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
    backgroundColor: "#B9D9EB",
  },
});
