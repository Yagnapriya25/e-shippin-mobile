import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, ScrollView, ActivityIndicator, Pressable, RefreshControl } from 'react-native';
import img from "../assets/Images/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryGetAll } from '../Redux/Action/categoryAction';
import { useFocusEffect } from '@react-navigation/native';

export default function Category({ navigation }) {
    const dispatch = useDispatch();
    const { categoryInfo, error, loading: categoryLoading } = useSelector((state) => state.category || {});
    const categories = categoryInfo?.categories || [];
    const [refreshing, setRefreshing] = useState(false);

    // Fetch categories whenever screen comes into focus
    useFocusEffect(
        useCallback(() => {
            dispatch(categoryGetAll());
        }, [dispatch])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await dispatch(categoryGetAll());
        setRefreshing(false);
    };

    if (categoryLoading && !categories.length) {
        // Only show loader if loading and no data yet
        return (
            <SafeAreaView style={styles.loadingcontainer}>
                <ActivityIndicator size="large" />
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

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.categoryContainer}>
                    {categories.length > 0 ? (
                        categories.map((item) => (
                            <Pressable 
                                key={item._id} 
                                style={styles.categoryItem} 
                                onPress={() => navigation.navigate("category-product", { cat_id: item._id })}
                            >
                                <Image source={{ uri: item.photo }} style={styles.categoryImage} resizeMode="contain" />
                                <Text style={styles.categoryName}>{item.name}</Text>
                            </Pressable>
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
    loadingcontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#B9D9EB"
    },
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: "#B9D9EB",
    },
    header: {
        flexDirection: "row",
        paddingHorizontal: 30,
        alignItems: "center",
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
        flexDirection: "row",
        paddingTop: 10,
        paddingHorizontal: 30,
        alignItems: "center",
    },
    searchInput: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingLeft: 10,
        height: 40,
    },
    searchIcon: {
        marginLeft: 10,
        marginTop: 5,
    },
    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 20,
        justifyContent: "center",
    },
    categoryItem: {
        margin: 5,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        height: 150,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    categoryImage: {
        width: 120,
        height: 80,
    },
    categoryName: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    }
});
