import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { categoryGetAll } from "../Redux/Action/categoryAction";

export default function AddPost({ navigation }) {
  const dispatch = useDispatch();
  // const [categories,setCategories]=useState([]);
  const [loading, setLoading] = useState(true);
  const {
    categoryInfo,
    error,
    loading: categoryLoading,
  } = useSelector((state) => state.category || {});
  const categories = categoryInfo?.categories || [];

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(categoryGetAll()).finally(() => {
        setLoading(false);
      });
    };
    fetchCategories();
  }, [dispatch]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingcontainer}>
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.categoryContainer}>
          {categories.length > 0 ? (
            categories.map((item) => (
              <Pressable key={item._id} style={styles.categoryItem} onPress={()=>navigation.navigate("addProduct",{c_id:item._id})}>
                <Image
                  source={{ uri: item.photo }}
                  style={styles.categoryImage}
                  resizeMode="contain"
                />
                <Text style={styles.categoryName}>{item.name}</Text>
              </Pressable>
            ))
          ) : (
            <Text>No categories available</Text>
          )}
          <Pressable style={styles.categoryItem} onPress={()=>navigation.navigate("addCategory")}>
            <Ionicons name="add" size={50} style={styles.searchIcon} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#B9D9EB",
  },
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#B9D9EB",
  },
  categoryContainer: {
    paddingTop: 0,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryItem: {
    marginBottom: 15,
    margin: 5,
    backgroundColor: "#FFFFFf",
    borderRadius: 10,
    height: 150,
    width: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryImage: {
    width: 150,
    height: 100,
  },
  categoryName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
});
