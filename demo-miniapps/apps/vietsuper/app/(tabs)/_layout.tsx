import { Tabs } from 'expo-router';
import { Text } from 'react-native';

function tabIcon(emoji: string) {
  return () => <Text style={{ fontSize: 22 }}>{emoji}</Text>;
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#ea2845' }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Trang chủ', tabBarIcon: tabIcon('🏠') }}
      />
      <Tabs.Screen
        name="food"
        options={{ title: 'Đồ ăn', tabBarIcon: tabIcon('🍜') }}
      />
      <Tabs.Screen
        name="wallet"
        options={{ title: 'Ví', tabBarIcon: tabIcon('💰') }}
      />
      <Tabs.Screen
        name="promo"
        options={{ title: 'Ưu đãi', tabBarIcon: tabIcon('🎁') }}
      />
      <Tabs.Screen
        name="cinema"
        options={{ title: 'Xem phim', tabBarIcon: tabIcon('🎬') }}
      />
    </Tabs>
  );
}
