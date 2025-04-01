import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../Redux/Action/productAction";

export default function ProductDetail({ navigation, route }) {
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
    const imageUrl = item.image; // Assuming the 'image' key is used in your data

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageSliderContainer}>
        <FlatList
          data={product.images}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          pagingEnabled={true} // Enables snapping to each image
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged} // Detect visible item
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        />
      </View>

      {/* Bottom Dots */}
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
        <Text style={styles.productPrice}>₹ {product.price}</Text>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.addToCartBtn}>
          <Text>Add to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowBtn}>
          <Text>Buy Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productDetailContainer}>
        <Text style={styles.heading}>Product Detail:</Text>
        <Text style={styles.description1}>⁕ {product.description1}</Text>
        <Text style={styles.description2}>⁕ {product.description2}</Text>
        <Text style={styles.description3}>⁕ {product.description3}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    borderRadius:6
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  dot: {
    width: 4,
    height: 4,
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
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
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buyNowBtn: {
    backgroundColor: "#FF5733",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productDetailContainer: {
    marginTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
