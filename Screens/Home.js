import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { StyleSheet } from "react-native";
import img from "../assets/Images/logo.png";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
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
          <Text style={styles.categoryHeader}>Category</Text>
       {/*  <FlatList data={""} />*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 30,
    backgroundColor: "#B9D9EB",
  },
  header: {
    display: "flex",
    flexDirection: "row",
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
  },
  categoryHeader: {
    fontSize: 16,
  },
});
