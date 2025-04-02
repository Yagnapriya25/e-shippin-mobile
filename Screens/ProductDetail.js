import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  CrimsonPro_800ExtraBold,
} from "@expo-google-fonts/crimson-pro";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../Redux/Action/productAction";
import { ScrollView } from "react-native-gesture-handler";

export default function ProductDetail({ navigation, route }) {

  let [fontsLoaded] = useFonts({
      CrimsonPro_800ExtraBold,
    });
  const [loading, setLoading] = useState(true);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const dispatch = useDispatch();
  const { singleProduct, error } = useSelector((state) => state.product || []);

  const product = singleProduct?.product || {};
  const { p_id } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getSingleProduct(p_id)).finally(() => {
        setLoading(false);
      });
    };
    fetchData();
  }, [dispatch]);

  const renderItem = ({ item }) => {
    const imageUrl = item.image;

    if (!imageUrl) {
      console.error("Invalid image URL", item);
      return null;
    }

    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
    );
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const index = viewableItems[0].index; // Get the index of the visible image
      setActiveDotIndex(index); // Update the active dot index
    }
  };

  const formatPrice = (price) => {
    const roundedPrice = Math.round(price);
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(roundedPrice);
  };

  if(loading && !fontsLoaded){
    return(
      <View>
      <ActivityIndicator size={"large"}/>
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}  
        showsHorizontalScrollIndicator={false} >
        <View style={styles.imageSliderContainer}>
          <FlatList
            data={product.images}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          />
        </View>

        <View style={styles.dotsContainer}>
          {product.images?.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeDotIndex === index && styles.activeDot, // Highlight active dot
              ]}
            />
          ))}
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
        </View>
        <View style={styles.productDetailContainer}>
          <Text style={styles.heading}>Product Detail:</Text>
          <Text style={styles.description1}>⁕ {product.description1}</Text>
          <Text style={styles.description2}>⁕ {product.description2}</Text>
          <Text style={styles.description3}>⁕ {product.description3}</Text>
          <Text style={styles.description1}>⁕ {product.description1}</Text>
          <Text style={styles.description2}>⁕ {product.description2}</Text>
          <Text style={styles.description3}>⁕ {product.description3}</Text>
          <Text style={styles.description1}>⁕ {product.description1}</Text>
          <Text style={styles.description2}>⁕ {product.description2}</Text>
          <Text style={styles.description3}>⁕ {product.description3}</Text>
          <Text style={styles.description1}>⁕ {product.description1}</Text>
          <Text style={styles.description2}>⁕ {product.description2}</Text>
          <Text style={styles.description3}>⁕ {product.description3}</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.addToCartBtn}>
            <Text style={styles.btn}>Add to cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowBtn}>
            <Text style={styles.btn}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight:10,
    backgroundColor: "#B9D9EB",
  },
  imageSliderContainer: {
    height: 350,
    marginBottom: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  image: {
    width: 300,
    height: 350,
    resizeMode: "cover",
    borderRadius: 6,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#bbb",
    margin: 3,
  },
  activeDot: {
    backgroundColor: "gray",
  },
  nameContainer: {
    marginBottom: 20,
  },
  productName: {
    fontSize: 25,
    marginBottom: 10,
    fontFamily: "CrimsonPro_800ExtraBold",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",

  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  addToCartBtn: {
    backgroundColor: "#FFA500",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buyNowBtn: {
    backgroundColor: "#568203",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    color: "#fff",
    fontFamily: "CrimsonPro_800ExtraBold",
     fontSize:18,
  },
  productDetailContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "CrimsonPro_800ExtraBold",

  },
  description1: {
    fontSize: 16,
    marginBottom: 5,
  },
  description2: {
    fontSize: 16,
    marginBottom: 5,
  },
  description3: {
    fontSize: 16,
    marginBottom: 5,
  },
});
