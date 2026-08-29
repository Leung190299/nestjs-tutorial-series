import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

type Network = { id: string; name: string; emoji: string };

const networks: Network[] = [
  { id: 'viettel', name: 'Viettel', emoji: '🔴' },
  { id: 'vina', name: 'VinaPhone', emoji: '🔵' },
  { id: 'mobi', name: 'MobiFone', emoji: '🟡' },
];

const amounts = [10000, 20000, 50000, 100000, 200000, 500000];

export function TopupScreen() {
  const [network, setNetwork] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const selectedNetwork = networks.find((n) => n.id === network);
  const canPay = network !== null && amount !== null;

  if (done) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successEmoji}>✅</Text>
        <Text style={styles.successTitle}>Nạp thành công!</Text>
        <Text style={styles.successDetail}>
          {amount?.toLocaleString('vi')}đ cho thuê bao {selectedNetwork?.name}
        </Text>
        <Pressable
          style={styles.againButton}
          onPress={() => {
            setNetwork(null);
            setAmount(null);
            setDone(false);
          }}
        >
          <Text style={styles.againButtonText}>Nạp thêm</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={amounts}
        keyExtractor={(item) => String(item)}
        numColumns={3}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <Text style={styles.sectionLabel}>Nhà mạng</Text>
            <View style={styles.networkRow}>
              {networks.map((item) => {
                const isSelected = network === item.id;
                return (
                  <Pressable
                    key={item.id}
                    style={[styles.networkChip, isSelected && styles.networkChipSelected]}
                    onPress={() => setNetwork(item.id)}
                  >
                    <Text style={styles.networkEmoji}>{item.emoji}</Text>
                    <Text style={styles.networkName}>{item.name}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Text style={styles.sectionLabel}>Mệnh giá</Text>
          </>
        }
        renderItem={({ item }) => {
          const isSelected = amount === item;
          return (
            <Pressable
              style={[styles.amountCard, isSelected && styles.amountCardSelected]}
              onPress={() => setAmount(item)}
            >
              <Text style={[styles.amountText, isSelected && styles.amountTextSelected]}>
                {item.toLocaleString('vi')}đ
              </Text>
            </Pressable>
          );
        }}
      />
      <View style={styles.bottomBar}>
        {canPay ? (
          <Pressable style={styles.payButton} onPress={() => setDone(true)}>
            <Text style={styles.payButtonText}>Nạp ngay · {amount.toLocaleString('vi')}đ</Text>
          </Pressable>
        ) : (
          <Text style={styles.bottomText}>Chọn nhà mạng và mệnh giá</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  list: { padding: 16 },
  sectionLabel: { fontSize: 16, fontWeight: '600', color: '#0f172a', marginBottom: 12 },
  networkRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  networkChip: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    paddingVertical: 16,
    alignItems: 'center',
    gap: 6,
  },
  networkChipSelected: { borderColor: '#ea2845', backgroundColor: '#fef2f2' },
  networkEmoji: { fontSize: 24 },
  networkName: { fontSize: 13, fontWeight: '600', color: '#0f172a' },
  amountCard: {
    flex: 1,
    margin: 6,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    paddingVertical: 20,
    alignItems: 'center',
  },
  amountCardSelected: { borderColor: '#ea2845' },
  amountText: { fontSize: 15, color: '#0f172a' },
  amountTextSelected: { fontWeight: 'bold', color: '#ea2845' },
  bottomBar: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0f172a',
  },
  bottomText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  payButton: { backgroundColor: '#ea2845', borderRadius: 999, paddingVertical: 14, paddingHorizontal: 32 },
  payButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  successContainer: { flex: 1, backgroundColor: '#f8fafc', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  successEmoji: { fontSize: 56 },
  successTitle: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  successDetail: { fontSize: 15, color: '#64748b', marginBottom: 16, textAlign: 'center' },
  againButton: { backgroundColor: '#ea2845', borderRadius: 999, paddingVertical: 14, paddingHorizontal: 32 },
  againButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});
