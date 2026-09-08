import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'RN Perf QA' }} />
      <Stack.Screen name="n1" options={{ title: 'N1 · ScrollView vs FlatList' }} />
      <Stack.Screen name="n2" options={{ title: 'N2 · getItemLayout' }} />
      <Stack.Screen name="n3" options={{ title: 'N3 · React.memo' }} />
      <Stack.Screen name="n4" options={{ title: 'N4 · onEndReached' }} />
      <Stack.Screen name="n5" options={{ title: 'N5 · expo-image' }} />
      <Stack.Screen name="n6" options={{ title: 'N6 · JS thread' }} />
    </Stack>
  );
}
