import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

type Tx = { id: string; label: string; amount: number };

const STORAGE_KEY = 'wallet';

export function WalletScreen() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Tx[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (!raw) return;
      const saved = JSON.parse(raw) as { balance: number; transactions: Tx[] };
      setBalance(saved.balance);
      setTransactions(saved.transactions);
    });
  }, []);

  const topUp = () => {
    const tx: Tx = { id: Date.now().toString(), label: 'Nạp tiền', amount: 100000 };
    const nextBalance = balance + tx.amount;
    const nextTransactions = [tx, ...transactions];
    setBalance(nextBalance);
    setTransactions(nextTransactions);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ balance: nextBalance, transactions: nextTransactions }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.balanceLabel}>Số dư khả dụng</Text>
      <Text style={styles.balance}>{balance.toLocaleString('vi')}đ</Text>
      <Pressable style={styles.topUpButton} onPress={topUp}>
        <Text style={styles.topUpText}>Nạp 100.000đ</Text>
      </Pressable>
      <FlatList
        data={transactions}
        keyExtractor={(tx) => tx.id}
        style={styles.list}
        ListHeaderComponent={<Text style={styles.historyTitle}>Lịch sử giao dịch</Text>}
        renderItem={({ item }) => (
          <View style={styles.txRow}>
            <Text style={styles.txLabel}>{item.label}</Text>
            <Text style={styles.txAmount}>+{item.amount.toLocaleString('vi')}đ</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 20 },
  balanceLabel: { fontSize: 14, color: '#64748b' },
  balance: { fontSize: 36, fontWeight: 'bold', color: '#0f172a', marginBottom: 16 },
  topUpButton: { backgroundColor: '#ea2845', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  topUpText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  list: { marginTop: 24 },
  historyTitle: { fontSize: 16, fontWeight: 'bold', color: '#0f172a', marginBottom: 8 },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  txLabel: { color: '#0f172a' },
  txAmount: { color: '#16a34a', fontWeight: '600' },
});
