import { View,SafeAreaView,Text, ScrollView, StyleSheet } from "react-native";



export default function searchProduct({navigation,route}){
    const {query} = route.params;


    return(
        <SafeAreaView>
            <ScrollView>
                <View style={styles.productContainer}>
                          <Text style={styles.productHeader}>Explore now</Text>
                          <View style={styles.productGrid}>
                            {product.map((item) => (
                              <TouchableOpacity
                                key={item._id}
                                style={styles.productItemContainer}
                                onPress={() => navigation.navigate("product-detail", { p_id: item._id })}
                              >
                                <Image
                                  source={{
                                    uri: item.images && item.images.length > 0 ? item.images[0].image : 'https://path/to/default/image.png',
                                  }}
                                  style={styles.productImage}
                                />
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productPrice}>₹{item.price}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
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
      paddingTop: 40,
      backgroundColor: "#B9D9EB",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 30,
    },
    logo: {
      height: 30,
      width: 30,
    },
    logotext: {
      padding: 5,
      fontSize: 20,
      paddingLeft: 10,
      fontWeight: "600",
      fontFamily: "CrimsonPro_800ExtraBold",
    },
    searchContainer: {
      display: "flex",
      flexDirection: "row",
      paddingTop: 10,
      paddingHorizontal: 30,
    },
    searchInput: {
      width: 280,
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingLeft: 10,
    },
    searchIcon: {
      padding: 5,
      paddingTop: 10,
    },
    categoryContainer: {
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    categoryHeader: {
      fontSize: 16,
      fontWeight: "bold",
      fontFamily: "CrimsonPro_800ExtraBold",
    },
    categoryItemContainer: {
      flex: 1,
      alignItems: "center",
      margin: 10,
      borderRadius: 10,
    },
    categoryImage: {
      width: 60,
      height: 60,
      borderRadius: 50,
      marginBottom: 10,
    },
    categoryName: {
      fontSize: 14,
      fontWeight: "500",
      textAlign: "center",
      fontFamily: "CrimsonPro_800ExtraBold",
    },
    offerContainer: {
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    offerHeader: {
      fontSize: 16,
      fontWeight: "bold",
      paddingBottom: 10,
      fontFamily: "CrimsonPro_800ExtraBold",
    },
   
  
    productContainer: {
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    productHeader: {
      fontSize: 16,
      fontWeight: "bold",
      paddingBottom: 10,
      fontFamily: "CrimsonPro_800ExtraBold",
    },
    productGrid: {
      flexDirection: "row", // Items in a row
      flexWrap: "wrap", // Allow wrapping to the next line
      justifyContent: "space-between", // Add space between items
    },
    productItemContainer: {
      width: "32%", // 2 items per row
      marginBottom: 10, // Add space between items
      alignItems: "center",
      backgroundColor: "#fff",
      padding: 10,
      borderRadius: 8,
    },
    productImage: {
      width: 80,
      height: 80,
      backgroundColor: "#F5F5DC",
      borderRadius: 10,
    },
    productName: {
      fontSize: 12,
      textAlign: "center",
      marginTop: 10,
    },
    productPrice: {
      fontWeight: 600,
    },
  });