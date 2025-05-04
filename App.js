import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import { Provider } from "react-redux";
import Store from './Redux/Store/Store';

// Import screens
import Home from "./Screens/Home";
import Category from "./Screens/Category";
import AddPost from "./Screens/AddPost";
import Cart from "./Screens/Cart";
import Profile from "./Screens/Profile";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import ForgetPassword from "./Screens/ForgetPassword";
import ProductDetail from "./Screens/ProductDetail";
import CategoryProduct from "./Screens/CategoryProduct";
import BuyPage from "./Screens/BuyPage";
import AddAddress from "./Screens/AddAddress";
import EditAddress from "./Screens/EditAddress";
import AddCategory from "./Screens/AddCategory";
import AddProduct from "./Screens/AddProduct";
import EditProfile from "./Screens/EditProfile";
import SearchProduct from "./Screens/SearchProduct";
import BecomeSeller from "./Screens/BecomeSeller";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// TabNavigator for the main screen flow
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "blue",
        tabBarStyle: {
          backgroundColor: "#FFFFF0"
        },
        headerStyle: {
          backgroundColor: "#FFFFF0",
          height: 90
        }
      }}
    >
      <Tab.Screen
        name="AppHome"
        component={Home}
        options={{
          headerShown: false,
          title: "E-shippin",
          tabBarLabel: "Home",
          tabBarIcon: () => <Ionicons name="home-outline" size={23} />,
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          headerShown: false,
          tabBarLabel: "Category",
          tabBarIcon: () => <Ionicons name="grid-outline" size={23} />,
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPost}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: () => <Ionicons name="add-circle-outline" size={28} />,
          title: "Choose Your Category",
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: "Cart",
          headerShown: false,
          tabBarIcon: () => <Ionicons name="cart-outline" size={25} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarIcon: () => <Ionicons name="person-outline" size={22} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="login">
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen name="forget" component={ForgetPassword} />
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen
            name="category-product"
            component={CategoryProduct}
            options={{ headerShown: true, title: "Product" }}
          />
          <Stack.Screen
            name="product-detail"
            component={ProductDetail}
            options={{ headerShown: true, title: "Product" }}
          />
          <Stack.Screen
            name="Buy"
            component={BuyPage}
            options={{ headerShown: true, title: "E-shippin" }}
          />
          <Stack.Screen
            name="addAddress"
            component={AddAddress}
            options={{ headerShown: true, title: "E-shippin" }}
          />
          <Stack.Screen
            name="editAddress"
            component={EditAddress}
            options={{ headerShown: true, title: "E-shippin" }}
          />
          <Stack.Screen
            name="addCategory"
            component={AddCategory}
            options={{ headerShown: true, title: "E-shippin" }}
          />
          <Stack.Screen
            name="addProduct"
            component={AddProduct}
            options={{ headerShown: true, title: "E-shippin" }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: true, title: "Cart" }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: true, title: "E-shippin" }}
          />
          <Stack.Screen
            name="searchProduct"
            component={SearchProduct}
            options={{ headerShown: true, title: "Products" }}
          />


          <Stack.Screen
            name="userSell"
            component={BecomeSeller}
            options={{ headerShown: true, title: "Products" }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
