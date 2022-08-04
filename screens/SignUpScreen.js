import React, { useContext, useState } from "react";
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import * as Clipboard from 'expo-clipboard';
import { AuthContext } from "../context/auth/context";
import { AntDesign } from '@expo/vector-icons'; 
import { MainButton } from "../components/mainButton";
import { ModalLittleWrapper } from "../components/modalLittleWrapper";

export function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, userWallet, userBalance, createWallet, getBalance, statusModalAuth, clearModal } = useContext(AuthContext);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(userWallet);
    };

  const createCurrentWallet =()=>{
    createWallet();
  };
  
  const signCurrentUP=()=>{
    signUp({ username, password })
  };

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
      {userWallet === null && (
        <View style={styles.containerText}>
          <Text style={styles.text}>
            To create an account, you need to create a wallet and top up it with
            0.1 xDai.
          </Text>
          <MainButton title="Create Wallet" backgroundColor={{backgroundColor:"#FF9A22"}} onPress={createCurrentWallet}/>
        </View>
      )}
            {userWallet && userBalance < 0.1 && (
        <View style={styles.containerText}>
          <Text style={styles.text}>
            To create an account, you need top up wallet with
            0.1 xDai.
          </Text>
          <TouchableOpacity onPress={() => copyToClipboard()}>
          <Text style={styles.text}>{userWallet}<AntDesign name="copy1" size={16} color="black" /></Text>
          </TouchableOpacity>
          <MainButton title="Update balance" backgroundColor={{backgroundColor:"#20B954"}} onPress={() => getBalance(userWallet)}/>
        </View>
      )}
      {userWallet && userBalance >= 0.1 && (
        <>
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
            <MainButton title="Sign Up" backgroundColor={{backgroundColor:"#FF9A22"}} onPress={signCurrentUP}/>
          </View>
        </>
      )}
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
    padding: 20,
    backgroundColor: "white"
  },
  containerInput: {
    flex: 0.3,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
  containerButtons: {
    flex: 0.2,
  },
  containerText: {
    flex: 0.4,
    justifyContent: "space-around",
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
    flex: 0.4,
    justifyContent: "center",
  },
});
