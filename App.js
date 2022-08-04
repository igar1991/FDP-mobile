import 'react-native-url-polyfill/auto' // for bee-js. URL polyfill
import 'react-native-get-random-values' // for ethers.js cryptography
import '@ethersproject/shims' // commong shims for ethers.js
import 'text-encoding' // for fdp-storage to make TextEncoding work
import React from "react";
import { AuthState } from "./context/auth/AuthState";
import { AppWrapper } from "./AppWrapper";
import { PodsState } from "./context/pods/PodsState";

export default function App() {
  return (
    <AuthState>
      <PodsState>
        <AppWrapper />
      </PodsState>
    </AuthState>
  );
}
