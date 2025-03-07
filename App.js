import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View,Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Screens/Home";
import Category from "./Screens/Category";
import AddPost from "./Screens/AddPost";
import Cart from "./Screens/Cart";
import Profile from "./Screens/Profile";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import ForgetPassword from "./Screens/ForgetPassword";
import ResetPassword from "./Screens/ResetPassword";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <Login/>
    // <Signup/>
    // <ForgetPassword/>
    // <ResetPassword/>
    <NavigationContainer>
      <Tab.Navigator screenOptions={{tabBarShowLabel:false,tabBarActiveTintColor:"blue",}}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown:false,
            title:"E-shippin",
            tabBarLabel: "Home",
            headerStyle:{
              backgroundColor:"purple",
            },
            headerTintColor:"white",
            tabBarIcon: () => <Ionicons name="home-outline" size={23} />,
          }}
        />
        <Tab.Screen
          name="Category"
          component={Category}
          options={{
            headerShown:false,
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
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: "Cart",
            tabBarIcon: () => <Ionicons name="cart-outline" size={25} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: () => <Ionicons name="person-outline" size={22} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    
 },
});
