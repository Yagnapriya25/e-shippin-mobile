import {Text,View,SafeAreaView, StyleSheet, TextInput} from 'react-native';


export default function EditAddress(){
    return(
        <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>EditAddress</Text>
        <View style={styles.textInputContainer}>
        <TextInput placeholder='name' style={styles.textInput}/>
        <TextInput placeholder='Door no & City' style={styles.textInput}/>
        <TextInput placeholder='landmark' style={styles.textInput}/>
        <TextInput placeholder='district' style={styles.textInput}/>
        <TextInput placeholder='pincode' style={styles.textInput}/>
        <TextInput placeholder='phone Number' style={styles.textInput}/>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display:"flex",
        paddingTop:40,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#B9D9EB",
      },
})