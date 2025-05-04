import { useEffect, useState } from "react";
import { View,Text,SafeAreaView, StyleSheet, ActivityIndicator, Pressable, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getSingleUserProduct } from "../Redux/Action/productAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function BecomeSeller({navigation}){
    const dispatch = useDispatch();
  // const [categories,setCategories]=useState([]);
  const [loading, setLoading] = useState(true);
  const { products, error } = useSelector((state) => state.product);
  const categories = products?.products|| [];

  useEffect(() => {
    const fetchProducts = async () => {
      const id = await AsyncStorage.getItem("id");
      await dispatch(getSingleUserProduct(id)).finally(() => {
        setLoading(false);
      });
    };
    fetchProducts();
  }, [dispatch]);

  const handleRemove = async(id) => {
    if (loading) return;
    console.log(id);
    await dispatch(deleteProduct({id})).then(() => {
      setLoading(true)
    
    }).finally(async()=>{
      setLoading(false);
      const id = await AsyncStorage.getItem("id")
      await dispatch(getSingleUserProduct(id))
    }).catch(() => {
      console.log(error);
    });
  };
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingcontainer}>
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );
  }
    return(
        <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.categoryContainer}>
                  {categories.length > 0 ? (
                    categories.map((item) => (
                      <Pressable key={item._id} style={styles.categoryItem}>
                      <Ionicons
                                  name="trash"
                                  size={20}
                                  style={styles.cartEmpty}
                                  onPress={()=>handleRemove(item._id)}
                                />
                        <Image
                          source={{ uri: item.images[0].image }}
                          style={styles.categoryImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.categoryName}>{item.name}</Text>
                      </Pressable>
                    ))
                  ) : (
                    <Text>No categories available</Text>
                  )}
                  <Pressable style={styles.addContainer} onPress={()=>navigation.navigate("addPost")}>
                   <Ionicons name="add" size={60}/>
                  </Pressable>
                </View>
              </ScrollView>
        </SafeAreaView>
    )
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
      paddingTop: 5,
      backgroundColor: "#B9D9EB",
    },
    categoryContainer: {
      paddingTop: 0,
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    categoryItem: {
      marginBottom: 15,
      margin: 5,
      backgroundColor: "#FFFFFf",
      borderRadius: 10,
      height: 180,
      width: 150,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    addContainer:{
     marginBottom: 15,
      margin: 5,
      backgroundColor: "#FFFFFf",
      borderRadius: 10,
      height: 180,
      width: 150,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    categoryImage: {
      width: 150,
      height: 100,
    },
    categoryName: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: "500",
    },
    cartEmpty:{
      color:"red",
      paddingLeft:100,
      paddingBottom:10
    }
  });