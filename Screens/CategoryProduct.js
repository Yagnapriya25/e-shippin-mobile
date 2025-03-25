import { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet,View,Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryProducts } from "../Redux/Action/categoryAction";


export default function CategoryProduct({navigation,route}){
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();
    const {categoryInfo,error,loading:categoryLoading}=useSelector((state)=>state.category || {});
    const product = categoryInfo?.products || [];
    const {cat_id} = route.params;
    
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            await dispatch(getCategoryProducts({ cat_id }));
            setLoading(false);
        };

        fetchCategories();
    }, [dispatch, cat_id]);
   


    return(
        <SafeAreaView  style={styles.container}>
          <View style={styles.productContainer}>
                  <View style={styles.productGrid}>
                    {product.map((item) => (
                      <View key={item._id} style={styles.productItemContainer}>
                        <Image
                          source={{
                            uri: item.images && item.images.length > 0 ? item.images[0].image : 'https://path/to/default/image.png'
                          }}
                          style={styles.productImage}
                        />
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>₹{item.price}</Text>
                        
                      </View>
                    ))}
                  </View>
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
        backgroundColor: "#B9D9EB",
        padding:20
      },
  productGrid: {
    flexDirection: 'row',  // Items in a row
    flexWrap: 'wrap',      // Allow wrapping to the next line
    justifyContent: 'space-around',  // Add space between items
  },
  productItemContainer: {
    width: '45%',          // 2 items per row
    marginBottom: 10,      // Add space between items
    alignItems: 'center',
    backgroundColor:"#fff",
    padding:10,
    borderRadius:8,
  },
  productImage: {
    width: 100,
    height: 100,
    backgroundColor:"#F5F5DC",
    borderRadius: 10,
  },
  productName: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
  },
  productPrice:{
    fontWeight:600
  }
})