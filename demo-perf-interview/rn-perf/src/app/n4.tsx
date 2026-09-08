import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Item, makeItems } from '@/lib/data';

const ALL = makeItems(500); // "server" giả lập: 500 bản ghi, cắt trang cục bộ
const PAGE_SIZE = 25;
const DELAY_MS = 800;

// fetchPage(p) trả 25 item của trang p (1-based) sau 800ms — mô phỏng API chậm.
function fetchPage(p: number): Promise<Item[]> {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(ALL.slice((p - 1) * PAGE_SIZE, p * PAGE_SIZE)),
      DELAY_MS
    );
  });
}

function Row({ item }: { item: Item }) {
  return (
    <View style={[styles.row, { borderLeftColor: item.color }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.sub}>{item.subtitle}</Text>
    </View>
  );
}

// Toàn bộ state pagination nằm trong PagedList — đổi guard thì đổi key ở cha
// → remount, tự về trang 1 / calls 0.
function PagedList({ guard }: { guard: boolean }) {
  const [items, setItems] = useState<Item[]>(() => ALL.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);
  const [calls, setCalls] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false); // guard đọc ref (giá trị tức thời), không đọc state cũ trong closure
  const pageRef = useRef(1); // trang đã commit — các lần gọi chồng đều xin CÙNG trang kế tiếp

  const loadMore = () => {
    if (guard && loadingRef.current) return; // GUARD ON: đang tải thì bỏ qua
    if (pageRef.current * PAGE_SIZE >= ALL.length) return; // hết dữ liệu
    if (guard) loadingRef.current = true; // đặt cờ TRƯỚC khi fetch
    setCalls((c) => c + 1); // đếm số lần loadMore thật sự chạy tới fetch
    setLoading(true);
    const next = pageRef.current + 1;
    fetchPage(next).then((batch) => {
      pageRef.current = Math.max(pageRef.current, next);
      setPage(pageRef.current);
      // OFF gọi chồng → nhiều response trùng trang: dedupe theo id để list không
      // vỡ key; bằng chứng gọi trùng nằm ở bộ đếm calls trên header.
      setItems((prev) => {
        const seen = new Set(prev.map((it) => it.id));
        const fresh = batch.filter((it) => !seen.has(it.id));
        return fresh.length ? [...prev, ...fresh] : prev;
      });
      setLoading(false);
      if (guard) loadingRef.current = false;
    });
  };

  return (
    <View style={styles.listArea}>
      <View style={styles.statsBar}>
        <Text style={styles.stats}>
          Trang {page} · {items.length} item · gọi loadMore: {calls} lần
        </Text>
      </View>
      <FlatList
        style={styles.list}
        data={items}
        renderItem={({ item }) => <Row item={item} />}
        keyExtractor={(it) => it.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loading ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color="#1d4ed8" />
              <Text style={styles.footerTxt}>đang tải trang tiếp…</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

export default function N4Page() {
  const [guardOn, setGuardOn] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          onPress={() => setGuardOn((v) => !v)}
          style={[styles.toggleBtn, guardOn && styles.toggleBtnOn]}
        >
          <Text style={[styles.toggleTxt, guardOn && styles.toggleTxtOn]}>
            Guard: {guardOn ? 'ON' : 'OFF'}
          </Text>
        </Pressable>
      </View>
      {/* key đổi theo guard → remount PagedList: reset về trang 1, calls 0 */}
      <PagedList key={guardOn ? 'guard' : 'no-guard'} guard={guardOn} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  toggleBtn: {
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
  listArea: { flex: 1 },
  statsBar: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fef9c3',
    borderBottomWidth: 1,
    borderBottomColor: '#fde047',
  },
  stats: { fontSize: 14, fontWeight: '700', color: '#713f12' },
  list: { flex: 1 },
  row: {
    height: 56,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderLeftWidth: 4,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  title: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  sub: { fontSize: 12, color: '#64748b' },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  footerTxt: { fontSize: 13, fontWeight: '600', color: '#1d4ed8' },
});
