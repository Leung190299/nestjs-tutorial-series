import { memo, useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Item, makeItems } from '@/lib/data';

const TOTAL = 5000;
const items = makeItems(TOTAL);

// Bộ đếm module-level: mỗi lần Row render là +1. Reset khi đổi chế độ.
let renderCount = 0;

function Row({ item }: { item: Item }) {
  renderCount++;
  return (
    <View style={[styles.row, { borderLeftColor: item.color }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.sub}>{item.subtitle}</Text>
    </View>
  );
}

type Mode = 'scroll' | 'flat';

// memo: khi header setStats làm cha re-render, list KHÔNG render lại
// (nếu không, renderCount bị đếm đôi ngay sau khi đo xong).
const ListArea = memo(function ListArea({ mode, run }: { mode: Mode; run: number }) {
  if (mode === 'scroll') {
    return (
      <ScrollView key={`scroll-${run}`} style={styles.list}>
        {items.map((it) => (
          <Row key={it.id} item={it} />
        ))}
      </ScrollView>
    );
  }
  return (
    <FlatList
      key={`flat-${run}`}
      style={styles.list}
      data={items}
      renderItem={({ item }) => <Row item={item} />}
      keyExtractor={(it) => it.id}
    />
  );
});

export default function N1Page() {
  const [sel, setSel] = useState<{ mode: Mode; run: number } | null>(null);
  const [stats, setStats] = useState<{ count: number; ms: number } | null>(null);
  const startRef = useRef(0);

  const pick = (mode: Mode) => {
    renderCount = 0;
    startRef.current = performance.now();
    setStats(null);
    setSel((s) => ({ mode, run: (s?.run ?? 0) + 1 }));
  };

  // Đo sau khi khung hình đầu vẽ xong. InteractionManager bị deprecated trên
  // RN 0.86 (getter bắn warning) → dùng requestAnimationFrame kép sau commit.
  // setState đúng MỘT lần trong effect (deps [sel]) — không loop.
  useEffect(() => {
    if (!sel) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setStats({
          count: renderCount,
          ms: Math.round(performance.now() - startRef.current),
        });
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [sel]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.modeRow}>
          <Pressable
            onPress={() => pick('scroll')}
            style={[styles.modeBtn, sel?.mode === 'scroll' && styles.modeBtnOn]}>
            <Text style={[styles.modeTxt, sel?.mode === 'scroll' && styles.modeTxtOn]}>
              ScrollView + map
            </Text>
          </Pressable>
          <Pressable
            onPress={() => pick('flat')}
            style={[styles.modeBtn, sel?.mode === 'flat' && styles.modeBtnOn]}>
            <Text style={[styles.modeTxt, sel?.mode === 'flat' && styles.modeTxtOn]}>
              FlatList
            </Text>
          </Pressable>
        </View>
        <Text style={styles.stats}>
          {!sel
            ? 'Chọn chế độ để dựng 5.000 item'
            : stats
              ? `Đã render ${stats.count}/${TOTAL} item · dựng mất ${stats.ms}ms`
              : 'Đang dựng…'}
        </Text>
      </View>
      {sel && <ListArea mode={sel.mode} run={sel.run} />}
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
  modeRow: { flexDirection: 'row', gap: 10 },
  modeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  modeBtnOn: { backgroundColor: '#1d4ed8', borderColor: '#1d4ed8' },
  modeTxt: { fontSize: 15, fontWeight: '600', color: '#334155' },
  modeTxtOn: { color: '#ffffff' },
  stats: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  list: { flex: 1 },
  row: {
    backgroundColor: '#ffffff',
    borderLeftWidth: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  title: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  sub: { fontSize: 12, color: '#64748b' },
});
