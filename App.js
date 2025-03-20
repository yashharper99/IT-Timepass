import 'react-native-gesture-handler';
import React from 'react';
import { AuthProvider } from './src/context/AuthContext';

export default function App({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}