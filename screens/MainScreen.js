import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
  Text,
} from "react-native";
import { MainButton } from "../components/mainButton";
import { ModalLittleWrapper } from "../components/modalLittleWrapper";
import { AuthContext } from "../context/auth/context";

export function MainScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, statusModalAuth, clearModal } = useContext(AuthContext);

  const modalStatus = () => {
    if (statusModalAuth.isError) {
      clearModal();
    }
  };

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
          autoCapitalize="none"
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
        <MainButton
          title="Sign In"
          backgroundColor={{ backgroundColor: "#20B954" }}
          onPress={() => signIn({ username, password })}
        />
        <MainButton
          title="Sign Up"
          backgroundColor={{ backgroundColor: "#FF9A22" }}
          onPress={() => navigation.navigate("Sign Up")}
        />
      </View>
      <ModalLittleWrapper
        modalVisible={statusModalAuth.isVisible}
        buttonClickedHandler={modalStatus}
      >
    <Text
          style={{
            fontSize: 20,
            color: statusModalAuth.isError ? "red" : "black",
            margin: 3,
          }}
        >
          {statusModalAuth.message}
        </Text>
        {!statusModalAuth.isError && (
          <ActivityIndicator size="large" color="#6945f8" />
        )}
      </ModalLittleWrapper>
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
