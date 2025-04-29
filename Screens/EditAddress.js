import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { editAddress } from "../Redux/Action/addressAction";

export default function EditAddress({ navigation }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);

  const [credential, setCredential] = useState({
    name: "",
    district: "",
    city: "",
    state: "",
    country: "",
    landmark: "",
    pincode: "",
    phoneNumber: "",
    user: "",  // initially empty
  });

  // 🛠 Load userInfo when screen opens
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem("id");
        if (userId) {
          setUserInfo(userId);
          setCredential((prev) => ({
            ...prev,
            user: userId,
          }));
        }
      } catch (error) {
        console.log("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const id = await AsyncStorage.getItem("id");
      console.log("Address ID:", id);

      dispatch(editAddress(credential, id))
        .then(() => {
          setTimeout(() => {
            navigation.navigate("Home");
          }, 2000);
        })
        .catch((err) => {
          console.log("error", err);
          setLoading(false);
        });
    } catch (err) {
      console.log("error submitting form", err);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Edit Address</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Name"
          style={styles.textInput}
          value={credential.name}
          onChangeText={(text) => setCredential({ ...credential, name: text })}
        />
        <TextInput
          placeholder="Door no & City"
          style={styles.textInput}
          value={credential.city}
          onChangeText={(text) => setCredential({ ...credential, city: text })}
        />
        <TextInput
          placeholder="Landmark"
          style={styles.textInput}
          value={credential.landmark}
          onChangeText={(text) => setCredential({ ...credential, landmark: text })}
        />
        <TextInput
          placeholder="District"
          style={styles.textInput}
          value={credential.district}
          onChangeText={(text) => setCredential({ ...credential, district: text })}
        />
        <TextInput
          placeholder="Pincode"
          style={styles.textInput}
          keyboardType="numeric"
          inputMode="numeric"
          value={credential.pincode}
          onChangeText={(text) =>
            setCredential({ ...credential, pincode: text.replace(/[^0-9]/g, "") })
          }
        />
        <TextInput
          placeholder="Phone Number"
          style={styles.textInput}
          keyboardType="numeric"
          inputMode="numeric"
          value={credential.phoneNumber}
          onChangeText={(text) =>
            setCredential({ ...credential, phoneNumber: text.replace(/[^0-9]/g, "") })
          }
        />
      </View>
      <Pressable style={styles.btnContainer} onPress={handleSubmit}>
        <Text style={styles.btn}>{loading ? "Updating..." : "Update"}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B9D9EB",
  },
  heading: {
    fontSize: 25,
    paddingBottom: 15,
  },
  textInputContainer: {
    paddingVertical: 20,
  },
  textInput: {
    width: 300,
    height:40,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  btnContainer: {
    marginTop: 20,
  },
  btn: {
    width: 200,
    backgroundColor: "#8EF3AC",
    textAlign: "center",
    padding: 10,
    color: "black",
    fontSize: 16,
    borderRadius: 20,
    fontWeight: "600",
  },
});
