import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

type Ride = { id: string; name: string; emoji: string; pricePerKm: number };

const rides: Ride[] = [
  { id: 'bike', name: 'Xe máy', emoji: '🛵', pricePerKm: 15000 },
  { id: 'car4', name: 'Ô tô 4 chỗ', emoji: '🚗', pricePerKm: 25000 },
  { id: 'car7', name: 'Ô tô 7 chỗ', emoji: '🚐', pricePerKm: 32000 },
];

export function BookingScreen() {
  const [ride, setRide] = useState<string | null>(null);
  const [km, setKm] = useState(5);

  const selectedRide = rides.find((r) => r.id === ride);
  const total = selectedRide ? selectedRide.pricePerKm * km : 0;

  return (
    <View style={styles.container}>
      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = ride === item.id;
          return (
            <View style={styles.row}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <View style={styles.info}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>{item.pricePerKm.toLocaleString('vi')}đ/km</Text>
              </View>
              <Pressable
                style={[styles.rideButton, isSelected && styles.rideButtonSelected]}
                onPress={() => setRide(item.id)}
              >
                <Text style={styles.rideButtonText}>
                  {isSelected ? 'Đang chọn ✓' : 'Chọn'}
                </Text>
              </Pressable>
            </View>
          );
        }}
        ListFooterComponent={
          <View style={styles.stepperRow}>
            <Text style={styles.stepperLabel}>Quãng đường</Text>
            <View style={styles.stepper}>
              <Pressable
                style={styles.stepperButton}
                onPress={() => setKm((k) => Math.max(1, Math.min(20, k - 1)))}
              >
                <Text style={styles.stepperButtonText}>−</Text>
              </Pressable>
              <Text style={styles.stepperValue}>{km} km</Text>
              <Pressable
                style={styles.stepperButton}
                onPress={() => setKm((k) => Math.max(1, Math.min(20, k + 1)))}
              >
                <Text style={styles.stepperButtonText}>+</Text>
              </Pressable>
            </View>
          </View>
        }
      />
      <View style={styles.bottomBar}>
        {selectedRide ? (
          <>
            <Text style={styles.bottomText}>
              {selectedRide.emoji} {selectedRide.name} · {km} km
            </Text>
            <Text style={styles.bottomTotal}>{total.toLocaleString('vi')}đ</Text>
          </>
        ) : (
          <Text style={styles.bottomText}>Chọn xe để xem giá ước tính</Text>
        )}
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
  rideButton: { backgroundColor: '#ea2845', borderRadius: 999, paddingVertical: 8, paddingHorizontal: 14 },
  rideButtonSelected: { backgroundColor: '#16a34a' },
  rideButtonText: { color: '#ffffff', fontWeight: '600' },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  stepperLabel: { fontSize: 16, fontWeight: '600', color: '#0f172a' },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepperButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: { fontSize: 18, fontWeight: '600', color: '#0f172a' },
  stepperValue: { fontSize: 16, fontWeight: '600', color: '#0f172a', minWidth: 48, textAlign: 'center' },
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
