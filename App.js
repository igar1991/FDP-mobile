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
