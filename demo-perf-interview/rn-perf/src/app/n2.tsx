import { useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Item, makeItems } from '@/lib/data';

const TOTAL = 5000;
const ROW_H = 64; // chiều cao cố định — điều kiện để getItemLayout đúng
const items = makeItems(TOTAL);

function Row({ item }: { item: Item }) {
  return (
    <View style={[styles.row, { borderLeftColor: item.color }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.sub}>{item.subtitle}</Text>
    </View>
  );
}

type Banner =
  | { kind: 'fail'; msg: string; detail: string }
  | { kind: 'ok'; msg: string };

export default function N2Page() {
  const [on, setOn] = useState(false);
  const [banner, setBanner] = useState<Banner | null>(null);
  const listRef = useRef<FlatList<Item>>(null);
  const startRef = useRef(0);

  const toggle = () => {
    setBanner(null);
    setOn((v) => !v); // key đổi → list remount, reset measured frames
  };

  const jump = () => {
    setBanner(null);
    startRef.current = performance.now();
    listRef.current?.scrollToIndex({ index: TOTAL - 1, animated: false });
    if (on) {
      // Đo tới rAF kép sau scrollToIndex: khung hình sau cú nhảy đã commit.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const ms = Math.round(performance.now() - startRef.current);
          setBanner({ kind: 'ok', msg: `nhảy tức thì ${ms}ms` });
        });
      });
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.btnRow}>
          <Pressable onPress={toggle} style={[styles.toggleBtn, on && styles.toggleBtnOn]}>
            <Text style={[styles.toggleTxt, on && styles.toggleTxtOn]}>
              getItemLayout: {on ? 'ON' : 'OFF'}
            </Text>
          </Pressable>
          <Pressable onPress={jump} style={styles.jumpBtn}>
            <Text style={styles.jumpTxt}>Nhảy tới item #4999</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.listWrap}>
        {/* Banner overlay tuyệt đối — không đổi kích thước viewport của list,
            để cú nhảy tới đáy vẫn hiện trọn item #4999. */}
        {banner?.kind === 'fail' && (
          <View style={[styles.banner, styles.bannerFail]}>
            <Text style={styles.bannerFailTxt}>{banner.msg}</Text>
            <Text style={styles.bannerFailSub}>{banner.detail}</Text>
          </View>
        )}
        {banner?.kind === 'ok' && (
          <View style={[styles.banner, styles.bannerOk]}>
            <Text style={styles.bannerOkTxt}>{banner.msg}</Text>
          </View>
        )}
        <FlatList
        // remount khi đổi chế độ để reset scroll + measured frames
        key={on ? 'with-layout' : 'no-layout'}
        ref={listRef}
        style={styles.list}
        data={items}
        renderItem={({ item }) => <Row item={item} />}
        keyExtractor={(it) => it.id}
        getItemLayout={
          on ? (_, index) => ({ length: ROW_H, offset: ROW_H * index, index }) : undefined
        }
        windowSize={on ? 5 : undefined}
        initialNumToRender={on ? 12 : undefined}
        onScrollToIndexFailed={(info) => {
          setBanner({
            kind: 'fail',
            msg: 'scrollToIndex FAIL — thiếu getItemLayout',
            detail: `index ${info.index} ngoài render window · mới đo được tới #${info.highestMeasuredFrameIndex}`,
          });
        }}
        />
      </View>
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
  jumpBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
  },
  jumpTxt: { fontSize: 15, fontWeight: '600', color: '#ffffff' },
  list: { flex: 1 },
  row: {
    height: ROW_H,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderLeftWidth: 4,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  title: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  sub: { fontSize: 12, color: '#64748b' },
  listWrap: { flex: 1 },
  banner: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    zIndex: 10,
    borderRadius: 10,
    padding: 12,
  },
  bannerFail: { backgroundColor: '#dc2626' },
  bannerFailTxt: { fontSize: 16, fontWeight: '700', color: '#ffffff' },
  bannerFailSub: { fontSize: 12, color: '#fecaca', marginTop: 4 },
  bannerOk: { backgroundColor: '#16a34a' },
  bannerOkTxt: { fontSize: 16, fontWeight: '700', color: '#ffffff' },
});
