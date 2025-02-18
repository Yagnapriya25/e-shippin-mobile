import { Button, SafeAreaView, Text,TextInput,View } from "react-native";
import { StyleSheet } from "react-native";



export default function Login(){
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.formbox}>
        <Text style={styles.formHead}>E-shippin</Text>
        <TextInput placeholder="Email"/>
        <TextInput placeholder="Password" secureTextEntry/>
        <TextInput/>
        <Button onPress="" title="Login"/>
        <Text>Forget Password?</Text>
        <Text>Don't Have An Account?SignUp</Text>
        </View>
        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#B9D9EB",
        justifyContent:"center",
        alignItems:"center"
    },
    formbox:{
       height:400,
       backgroundColor:"#fff",
       width:300,
       borderRadius:15,
       padding:10
    },
    formHead:{
        textAlign:"center",
        paddingTop:15,
        paddingBottom:10,
        fontSize:20,
        fontFamily:"corble"
    }
})