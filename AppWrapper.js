import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { AuthContext } from "./context/auth/context";
import { SignUpScreen } from "./screens/SignUpScreen";
import { MainScreen } from "./screens/MainScreen";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { CurrentDirectoryScreen } from "./screens/currentDirectoryScreen";
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();

export function AppWrapper({ navigation }) {
  const { isAuth, signOut, updateWallet, getBalance } = useContext(AuthContext);

  useEffect(() => {
    const bootstrapAsync = async () => {
      //await SecureStore.setItemAsync("userWallet", '');
      const userAddress = await SecureStore.getItemAsync("userWallet");
      if (userAddress) {
        updateWallet(userAddress);
        getBalance(userAddress);
      }
    };
    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        {!isAuth ? (
          <>
            <Stack.Screen
              name="Sign Up"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerRight: () => (
                  <TouchableOpacity onPress={() => signOut()}>
                    <Entypo name="log-out" size={24} color="#ad535f" />
                  </TouchableOpacity>
                ),
                title: "Pods",
              }}
            />
            <Stack.Screen
              name="Directory"
              component={CurrentDirectoryScreen}
              options={{
                title: "Pod",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
