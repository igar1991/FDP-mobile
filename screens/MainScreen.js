import React, { } from "react";
import { View, StyleSheet, Button, Image } from "react-native";

export function MainScreen({ navigation }) {
 return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/logoMain.png")}
        />
      </View>
      <View style={styles.containerButtons}>
        <Button
          color="#20B954"
          title="Sign in"
          onPress={() => navigation.navigate("Sign In")}
        />
        <Button
          color="#FF9A22"
          title="Sign up"
          onPress={() => navigation.navigate("Sign Up")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  tinyLogo: {
    width: 250,
    height: 50,
    marginStart: "auto",
    marginEnd: "auto",
  },
  containerLogo: {
    flex: 0.5,
    justifyContent: "center"
  },
  containerButtons: {
    flex: 0.2,
    justifyContent: "space-around",
    backgroundColor: "#fff",
  }
});
