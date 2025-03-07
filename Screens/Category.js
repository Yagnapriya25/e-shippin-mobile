import {View,Text, SafeAreaView, StyleSheet,Image,TextInput, ScrollView, FlatList} from 'react-native';
import img from "../assets/Images/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from 'react';


export default function Category(){
    const [categories,setCategories]=useState([]);
    const [error,setError]= useState();


  useEffect(()=>{
    const fetchData = async()=>{
        try {
            const res = await fetch(`https://e-shipin-server.onrender.com/api/category/getall`,{
                method:"GET"
               })
               const data =await res.json();
               console.log(data);
               setCategories(data)
        } catch (error) {
            setError("Error occured while getting data")
        }
      

    }
    fetchData();
  },[])

    return(
        <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <Image source={img} style={styles.logo} />
                <Text style={styles.logotext}>E-shippin</Text>
              </View>
              <View style={styles.searchContainer}>
                <TextInput placeholder="Search" style={styles.searchInput} />
                <Ionicons name="search" size={20} style={styles.searchIcon} />
              </View>
              <ScrollView>
              <View style={styles.categoryContainer}>
              {
                categories && categories.map((item, idx) => (
                  <View key={item.id || idx}> {/* If 'item.id' exists, use that as a key */}
                    {/* Add your content here, like item.name or something */}
                    <Text>{item.name}</Text> {/* Example of rendering a property */}
                  </View>
                ))
              }
              
              </View>
              </ScrollView>
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
})