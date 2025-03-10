import {View,Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import { Ionicons } from "@expo/vector-icons";



export default function Cart(){
    return(
      <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.cartHeader}>
      <Text style={styles.cartCount}>Cart : </Text> 
      <Ionicons name='trash' size={20} style={styles.cartEmpty}/>
      </View>
     <View style={styles.cartItemContainer}>
     <Text>kjgkyu</Text>
     </View>
      </ScrollView>
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#B9D9EB",
    padding: 15,

  },
  cartHeader:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    paddingBottom:20
  },
  cartCount:{
    fontSize:18
  },
  cartEmpty:{
    color:"red"
  },
  cartItemContainer:{
    backgroundColor:"#fff",
    height:90,
    width:"100%",
    display:"flex",
    justifyContent:"center",
    padding:20,
    borderRadius:10
  }
})