import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

type MenuItem = { id: string; name: string; emoji: string; price: number };

const menu: MenuItem[] = [
  { id: 'pho-bo', name: 'Phở bò', emoji: '🍜', price: 45000 },
  { id: 'com-tam', name: 'Cơm tấm', emoji: '🍚', price: 40000 },
  { id: 'banh-mi', name: 'Bánh mì', emoji: '🥖', price: 25000 },
  { id: 'tra-sua', name: 'Trà sữa', emoji: '🧋', price: 30000 },
];

export default function FoodScreen() {
  const [cart, setCart] = useState<string[]>([]);

  const total = cart.reduce((sum, id) => {
    const item = menu.find((m) => m.id === id);
    return sum + (item?.price ?? 0);
  }, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price.toLocaleString('vi')}đ</Text>
            </View>
            <Pressable style={styles.addButton} onPress={() => setCart((c) => [...c, item.id])}>
              <Text style={styles.addButtonText}>+ Thêm</Text>
            </Pressable>
          </View>
        )}
      />
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>🛒 {cart.length} món</Text>
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
  name: { fontSize: 16, fontWeight: '600', color: '#0f172a' },
  price: { fontSize: 14, color: '#64748b' },
  addButton: { backgroundColor: '#ea2845', borderRadius: 999, paddingVertical: 8, paddingHorizontal: 14 },
  addButtonText: { color: '#ffffff', fontWeight: '600' },
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
