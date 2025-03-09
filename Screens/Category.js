import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import img from "../assets/Images/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from 'react';

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://e-shipin-server.onrender.com/api/category/getall`, {
                    method: "GET"
                });
                const data = await res.json();
                
                // Check if data and categories are available
                if (data && Array.isArray(data.categories)) {
                    setLoading(false);
                    setCategories(data.categories);  // Extract categories from the response
                } else {
                    setError("Error: Categories not found in the response");
                    setLoading(false);
                }
            } catch (error) {
                setError("Error occurred while getting data");
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
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
                </View>
            </ScrollView>
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
