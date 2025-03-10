import { useEffect, useState } from 'react';
import {View,Text, SafeAreaView,ScrollView,Image} from 'react-native';
import { StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";


export default function AddPost(){
   
    const [categories,setCategories]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchCategories = async()=>{
            try {
                const res = await fetch(`https://e-shipin-server.onrender.com/api/category/getall`,{
                    method:"GET"
                   })
                   const data = await res.json();
                   
                    if(data && Array.isArray(data.categories)){
                        setCategories(data.categories)
                        setLoading(false);
                    }
                   
            } catch (error) {
                setLoading(true);
            }
          
           
        }
        fetchCategories()
    },[])


    return (
       <SafeAreaView style={styles.container}>
       <ScrollView>
                       <View style={styles.categoryContainer}>
                           {categories.length > 0 ? (
                               categories.map((item) => (
                                   <View key={item._id} style={styles.categoryItem}>
                                       <Image source={{ uri: item.photo }} style={styles.categoryImage} resizeMode='contain'/>
                                       <Text style={styles.categoryName}>{item.name}</Text>
                                   </View>
                                  
                               ))
                           ) : (
                               <Text>No categories available</Text>
                           )}
                           <View style={styles.categoryItem}>
                                   <Ionicons name="add" size={50} style={styles.searchIcon} />
                           </View>
                       </View>
                   </ScrollView>
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        backgroundColor: "#B9D9EB",
    },
    categoryContainer: {
        paddingTop: 0,
        display:"flex",
        flexWrap:"wrap",
        flexDirection:"row",
        padding:20,
        alignItems:"center",
        justifyContent:"center"
    },
    categoryItem: {
        marginBottom: 15,
        margin:5,
        backgroundColor:"#FFFFFf",
        borderRadius:10,
        height:150,
        width:150,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
        
    },
    categoryImage: {
        width: 150,
        height: 100,
    },
    categoryName: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "500",
        
    }
});