import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import img from "../assets/Images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSingleUser } from "../Redux/Action/userAction";

export default function Profile({ navigation }) {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { error, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    let interval;

    const fetchUserData = async () => {
      const id = await AsyncStorage.getItem("id");
      if (!id) return;
      setLoading(true);
      await dispatch(getSingleUser(id));
      setLoading(false);
    };

    fetchUserData(); // Initial fetch on mount

    interval = setInterval(fetchUserData, 5000); // Re-fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [dispatch]);

  useEffect(() => {
    if (userInfo && userInfo.user) {
      setUserData(userInfo.user);
      console.log("Fetched userInfo:", userInfo.user);
    }
  }, [userInfo]);

  const handleLogout = async () => {
    if (loading) return;
    await AsyncStorage.removeItem("id");
    await AsyncStorage.removeItem("token");
    navigation.navigate("login");
  };

  if (loading && !userData) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={img} style={styles.logo} />
        <Text style={styles.logotext}>E-shippin</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={userData?.avatar ? { uri: userData.avatar } : img}
          style={styles.profileImage}
        />
        <Text style={styles.normalText1}>{userData?.username || "N/A"}</Text>
        <Text style={styles.normalText}>{userData?.email || "N/A"}</Text>

        <Text style={styles.navigate} onPress={() => navigation.navigate("Cart")}>Cart</Text>
        <Text style={styles.navigate} onPress={() => navigation.navigate("AddPost")}>Become a seller</Text>
        <Text style={styles.navigate} onPress={() => navigation.navigate("EditProfile")}>Edit Profile</Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
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
  profileContainer: {
    alignItems: "center",
    marginVertical: 150,
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "#ccc",
  },
  normalText1: {
    paddingTop: 40,
    fontSize: 18,
    fontWeight: "500",
  },
  normalText: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: "500",
  },
  navigate: {
    fontSize: 18,
    paddingTop: 10,
    fontWeight: "500",
    color: "blue",
  },
  logout: {
    color: "red",
    fontWeight: "500",
    fontSize: 18,
    paddingTop: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
