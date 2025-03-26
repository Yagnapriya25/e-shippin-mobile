import { View,Text, StyleSheet, SafeAreaView, Image, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ProductDetail({navigation,route}){
    const {p_id} = route.params;
    console.log(p_id);
    return(
        <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.imageContainer}>
        <View style={styles.bigImage}>
        
        </View>
        <View style={styles.ImageList}>
        
        </View>
        </View>
        <View style={styles.productDetails}>
        <Text style={styles.productName}>ahvaoiudvhad</Text>
        <Text style={styles.description1}></Text>
        <Text style={styles.description2}></Text>
        <Text style={styles.description3}></Text>
        <Text style={styles.productPrice}></Text>
        </View>
        <View style={styles.btnContainer}>
        <Button title="Add to cart"/>
        <Button title="Buy now"/>
        </View>
        </ScrollView>
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
})