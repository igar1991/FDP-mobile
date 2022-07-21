import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInScreen } from "./screens/SignInScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { AuthContext } from "./context/context";
import { SignUpScreen } from "./screens/SignUpScreen";
import { MainScreen } from "./screens/MainScreen";
import { FavoriteScreen } from "./screens/FavoriteScreen";
import { CreateWalletScreen } from "./screens/CreateWalletScreen";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export function AppWrapper({ navigation }) {
  const { isAuth, signOut } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userWallet;

      try {
        userWallet = await SecureStore.getItemAsync("userWallet");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      //restoreToken()
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        {!isAuth ? (
          <>
            <Stack.Screen name="Sign In" component={SignInScreen} />
            <Stack.Screen name="Sign Up" component={SignUpScreen} />
            <Stack.Screen name="Create Wallet" component={CreateWalletScreen} />
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
                    <Entypo name="log-out" size={24} color="red" />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen name="Favorite" component={FavoriteScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
