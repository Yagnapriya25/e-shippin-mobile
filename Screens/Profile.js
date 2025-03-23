import { View, Text, SafeAreaView, Button, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import img from "../assets/Images/logo.png";
import { useEffect, useState } from "react";

export default function Profile() {

  const  [userData,setUserData]= useState();
  const [loading,setLoading]=useState(true);
  
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const res = await fetch(`https://e-shipin-server.onrender.com/api/user/getuser/6713954b6844b323f1c31530`,{
          method:"GET"
         })
         const data = await res.json();
         console.log(data.user.avatar);
        setUserData(data.user)
        setLoading(false)
      } catch (error) {
        
        setLoading(true)

      }
      
    }
    fetchData()
  },[])

  if(loading){
    return(
      <View style={styles.loading}>
      <ActivityIndicator/>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={img} style={styles.logo} />
        <Text style={styles.logotext}>E-shippin</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image source={{uri:userData.avatar}} style={styles.profileImage}/>
        <Text style={styles.normalText1}>{userData.username}</Text>
        <Text style={styles.normalText}>{userData.email}</Text>
        <Text style={styles.navigate}>Cart</Text>
        <Text style={styles.navigate}>Become a seller</Text>
        <Text style={styles.navigate}>Edit Profile</Text>
        <Text style={styles.logout}>Logout</Text>
     </View>
    </SafeAreaView>
  );
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
  profileContainer:{
    display:"flex",
    alignItems:"center",
    marginVertical:150
  },
  profileImage:{
    height:150,
    width:150,
    borderRadius:70
  },
  normalText1:{
    paddingTop:40,
    fontSize:18,
    fontWeight:500
  },
  normalText:{
    paddingTop:10,
    fontSize:18,
    fontWeight:500
  },
  navigate:{
    fontSize:18,
    paddingTop:10,
    fontWeight:500,
    color:"blue"
  },
  logout:{
    color:"red",
    fontWeight:500,
    fontSize:18,
    paddingTop:20
  }
});
