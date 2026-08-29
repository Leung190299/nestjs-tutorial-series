import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

type Movie = { id: string; title: string; emoji: string; price: number };

const movies: Movie[] = [
  { id: 'dao-pho', title: 'Đào, Phở và Piano', emoji: '🎹', price: 90000 },
  { id: 'mat-biec', title: 'Mắt Biếc', emoji: '👁️', price: 85000 },
  { id: 'bo-gia', title: 'Bố Già', emoji: '👨', price: 95000 },
];

export function CinemaScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  const total = selected.reduce((sum, id) => {
    const movie = movies.find((m) => m.id === id);
    return sum + (movie?.price ?? 0);
  }, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item.id);
          return (
            <View style={styles.row}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>{item.price.toLocaleString('vi')}đ</Text>
              </View>
              <Pressable
                style={[styles.ticketButton, isSelected && styles.ticketButtonSelected]}
                onPress={() =>
                  setSelected((s) =>
                    isSelected ? s.filter((id) => id !== item.id) : [...s, item.id]
                  )
                }
              >
                <Text style={styles.ticketButtonText}>
                  {isSelected ? 'Đã đặt ✓' : 'Đặt vé'}
                </Text>
              </Pressable>
            </View>
          );
        }}
      />
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>🎟️ {selected.length} vé</Text>
        <Text style={styles.bottomTotal}>{total.toLocaleString('vi')}đ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    gap: 12,
  },
  emoji: { fontSize: 28 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: '#0f172a' },
  price: { fontSize: 14, color: '#64748b' },
  ticketButton: { backgroundColor: '#ea2845', borderRadius: 999, paddingVertical: 8, paddingHorizontal: 14 },
  ticketButtonSelected: { backgroundColor: '#16a34a' },
  ticketButtonText: { color: '#ffffff', fontWeight: '600' },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0f172a',
  },
  bottomText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  bottomTotal: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
});
