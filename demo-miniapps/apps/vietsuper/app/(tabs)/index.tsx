import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

type Service = {
  id: string;
  label: string;
  emoji: string;
  route?: '/food' | '/wallet' | '/promo' | '/cinema' | '/booking' | '/topup';
};

const services: Service[] = [
  { id: 'food', label: 'Đồ ăn', emoji: '🍜', route: '/food' },
  { id: 'wallet', label: 'Ví tiền', emoji: '💰', route: '/wallet' },
  { id: 'promo', label: 'Ưu đãi', emoji: '🎁', route: '/promo' },
  { id: 'ride', label: 'Đặt xe', emoji: '🛵', route: '/booking' },
  { id: 'movie', label: 'Xem phim', emoji: '🎬', route: '/cinema' },
  { id: 'topup', label: 'Nạp thẻ', emoji: '📱', route: '/topup' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Chào bạn 👋</Text>
      <Text style={styles.question}>Hôm nay bạn cần gì?</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) =>
          item.route ? (
            <Link href={item.route} asChild>
              <Pressable style={styles.card}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                <Text style={styles.label}>{item.label}</Text>
              </Pressable>
            </Link>
          ) : (
            <Pressable style={[styles.card, styles.disabled]} disabled>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={styles.label}>{item.label}</Text>
            </Pressable>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  greeting: { fontSize: 20, color: '#0f172a' },
  question: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 20 },
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
  },
  disabled: { opacity: 0.4 },
  emoji: { fontSize: 28 },
  label: { fontSize: 13, color: '#0f172a', fontWeight: '600' },
});
