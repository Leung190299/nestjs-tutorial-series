import { memo, useCallback, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Item, makeItems } from '@/lib/data';

const TOTAL = 30;

// Mỗi Row tự đếm số lần render của CHÍNH NÓ bằng useRef và hiện ngay trên hàng.
function RowInner({ item }: { item: Item }) {
  const renders = useRef(0);
  renders.current += 1;
  return (
    <View style={[styles.row, { borderLeftColor: item.color }]}>
      <View style={styles.rowLeft}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.sub}>{item.subtitle}</Text>
      </View>
      <Text style={styles.count}>render {renders.current}×</Text>
    </View>
  );
}

// Hai phiên bản Row: thường vs memo (so sánh shallow mặc định).
// Với immutable update, chỉ item #0 có object mới → memo chặn 29 hàng còn lại.
const RowMemo = memo(RowInner);

export default function N3Page() {
  const [memoOn, setMemoOn] = useState(false);
  const [items, setItems] = useState<Item[]>(() => makeItems(TOTAL));
  const [presses, setPresses] = useState(0);

  // Đổi chế độ: reset list + số lần bấm; key FlatList đổi theo memoOn → remount
  // toàn bộ cell, ref đếm render về 0 — hai chế độ so từ cùng gốc.
  const toggle = () => {
    setMemoOn((v) => !v);
    setItems(makeItems(TOTAL));
    setPresses(0);
  };

  // Cập nhật immutable: copy mảng bằng map, chỉ item #0 nhận object mới.
  const changeFirst = () => {
    setItems((prev) =>
      prev.map((it, i) => (i === 0 ? { ...it, title: `${it.title} ✓` } : it))
    );
    setPresses((n) => n + 1);
  };

  // renderItem ổn định bằng useCallback — hàm ẩn danh mới mỗi render sẽ phá memo.
  const renderItem = useCallback(
    ({ item }: { item: Item }) =>
      memoOn ? <RowMemo item={item} /> : <RowInner item={item} />,
    [memoOn]
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.btnRow}>
          <Pressable onPress={toggle} style={[styles.toggleBtn, memoOn && styles.toggleBtnOn]}>
            <Text style={[styles.toggleTxt, memoOn && styles.toggleTxtOn]}>
              React.memo: {memoOn ? 'ON' : 'OFF'}
            </Text>
          </Pressable>
          <Pressable onPress={changeFirst} style={styles.changeBtn}>
            <Text style={styles.changeTxt}>Đổi item #0</Text>
          </Pressable>
        </View>
        <Text style={styles.stats}>
          {TOTAL} item · đã bấm {presses} lần · update immutable (map copy)
        </Text>
      </View>
      <FlatList
        // remount khi đổi chế độ → reset bộ đếm render của mọi Row
        key={memoOn ? 'memo' : 'plain'}
        style={styles.list}
        data={items}
        renderItem={renderItem}
        keyExtractor={(it) => it.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    padding: 12,
    gap: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  btnRow: { flexDirection: 'row', gap: 10 },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  toggleBtnOn: { backgroundColor: '#15803d', borderColor: '#15803d' },
  toggleTxt: { fontSize: 15, fontWeight: '600', color: '#334155' },
  toggleTxtOn: { color: '#ffffff' },
  changeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
  },
  changeTxt: { fontSize: 15, fontWeight: '600', color: '#ffffff' },
  stats: { fontSize: 13, fontWeight: '600', color: '#475569' },
  list: { flex: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderLeftWidth: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  rowLeft: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  sub: { fontSize: 11, color: '#64748b' },
  count: { fontSize: 14, fontWeight: '800', color: '#b45309' },
});
