import { SafeAreaView,StyleSheet,Text } from "react-native";


export default function BuyPage({navigation}){
   return(

    <SafeAreaView style={styles.container}>
       <Text>Buy page</Text>
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
        paddingTop: 40,
        backgroundColor: "#B9D9EB",
      },
})