import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="booking" options={{ headerShown: true, title: 'Đặt xe' }} />
    </Stack>
  );
}
