import React, { useContext } from "react";
import { View, TextInput, Button, StyleSheet, Image } from "react-native";
import { AuthContext } from "../context/context";

export function SignUpScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signUp, userToken } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/logoMain.png")}
        />
      </View>
      {userToken === null ? (
        <View style={styles.containerButtons}>
          <Button
            color="#FF9A22"
            title="Sign un"
            onPress={() => signUp({ username, password })}
          />
        </View>
      ) : (
        <>
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
            <Button
              color="#FF9A22"
              title="Sign un"
              onPress={() => signUp({ username, password })}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerInput: {
    flex: 0.4,
    justifyContent: "center",
  },
  containerButtons: {
    flex: 0.2,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  tinyLogo: {
    width: 250,
    height: 50,
    marginStart: "auto",
    marginEnd: "auto",
  },
  containerLogo: {
    flex: 0.3,
    justifyContent: "flex-end",
  },
});
