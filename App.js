import React from 'react';
import { AuthState } from './context/auth/AuthState';
import { AppWrapper } from './AppWrapper';


export default function App() {
 return (
    <AuthState>
      <AppWrapper />
    </AuthState>
  );
}