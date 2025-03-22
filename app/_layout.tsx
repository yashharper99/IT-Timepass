import { Stack } from 'expo-router';
import { AuthProvider } from './context/AuthContext';  // Update this line

export default function Layout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthProvider>
  );
}