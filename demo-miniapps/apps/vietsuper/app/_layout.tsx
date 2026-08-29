import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="booking" options={{ headerShown: true, title: 'Đặt xe', headerBackTitle: 'Trang chủ' }} />
      <Stack.Screen name="topup" options={{ headerShown: true, title: 'Nạp thẻ', headerBackTitle: 'Trang chủ' }} />
    </Stack>
  );
}
