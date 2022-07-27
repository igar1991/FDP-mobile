import React, { useState, useContext } from "react";
import { View, StyleSheet, Button, Image, TextInput } from "react-native";
import { MainButton } from "../components/mainButton";
import { AuthContext } from "../context/auth/context";

export function MainScreen({ navigation }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);

 return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/logoMain.png")}
        />
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.containerButtons}>
        <MainButton title="Sign In" backgroundColor={{backgroundColor:"#20B954"}} onPress={() => signIn({ username, password })}/>
        <MainButton title="Sign Up" backgroundColor={{backgroundColor:"#FF9A22"}} onPress={() => navigation.navigate("Sign Up")}/>
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
    flex: 0.4,
    justifyContent: "center",
  },
  containerButtons: {
    flex: 0.3,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  containerInput: {
    flex: 0.3,
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
