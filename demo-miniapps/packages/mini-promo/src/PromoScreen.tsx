import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

type Promo = { id: number; emoji: string; title: string; detail: string };

export function PromoScreen() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3999/promos')
      .then((res) => res.json())
      .then(setPromos)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#ea2845" size="large" />
        <Text style={styles.loadingText}>Đang tải ưu đãi...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={promos}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.emoji}>{item.emoji}</Text>
          <View style={styles.cardInfo}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.detail}>{item.detail}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: '#f8fafc' },
  loadingText: { color: '#64748b' },
  list: { padding: 16, backgroundColor: '#f8fafc', gap: 12 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
    alignItems: 'center',
  },
  emoji: { fontSize: 32 },
  cardInfo: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  detail: { fontSize: 13, color: '#64748b', marginTop: 4 },
});
