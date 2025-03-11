import {View,Text,SafeAreaView} from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import img from '../assets/Images/logo.png'

export default function Profile(){
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <Image source={img} style={styles.logo} />
        <Text style={styles.logotext}>E-shippin</Text>
      </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
        fontSize: 16,
        paddingLeft: 10,
        fontWeight: "600",
      },
})