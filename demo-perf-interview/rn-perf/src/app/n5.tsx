import { Image as ExpoImage } from 'expo-image';
import { useRef, useState } from 'react';
import {
  FlatList,
  Image as RNImage,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Item, makeItems } from '@/lib/data';

// 12 PNG 2000×2000 sinh cục bộ (script PIL) — require tĩnh để metro bundle được.
const BIG = [
  require('../../assets/big/big0.png'),
  require('../../assets/big/big1.png'),
  require('../../assets/big/big2.png'),
  require('../../assets/big/big3.png'),
  require('../../assets/big/big4.png'),
  require('../../assets/big/big5.png'),
  require('../../assets/big/big6.png'),
  require('../../assets/big/big7.png'),
  require('../../assets/big/big8.png'),
  require('../../assets/big/big9.png'),
  require('../../assets/big/big10.png'),
  require('../../assets/big/big11.png'),
];

const ITEMS = makeItems(120);
const ROW_H = 72; // thumbnail 64 + padding
const FIRST_SCREEN = 9; // số hàng ước tính lấp màn đầu (~650pt vùng list / 72pt)

type Mode = 'plain' | 'expo';

const MODE_LABEL: Record<Mode, string> = {
  plain: 'Image gốc 2000px',
  expo: 'expo-image 64px + cache',
};

// Toàn bộ đo đạc nằm trong ImageList — đổi chế độ thì đổi key ở cha → remount,
// mốc mount + bộ đếm ảnh loaded tự reset.
function ImageList({ mode }: { mode: Mode }) {
  const mountAt = useRef(performance.now()); // mốc mount của chế độ hiện tại
  const loaded = useRef(new Set<number>()); // index ảnh màn đầu đã onLoadEnd (dedupe)
  const done = useRef(false);
  const [firstScreenMs, setFirstScreenMs] = useState<number | null>(null);

  // Đếm handler: đủ FIRST_SCREEN ảnh đầu viewport báo xong → chốt ms.
  const onImgLoaded = (index: number) => {
    if (done.current || index >= FIRST_SCREEN) return;
    loaded.current.add(index);
    if (loaded.current.size >= FIRST_SCREEN) {
      done.current = true;
      setFirstScreenMs(Math.round(performance.now() - mountAt.current));
    }
  };

  const renderRow = ({ item, index }: { item: Item; index: number }) => {
    const src = BIG[index % BIG.length]; // ảnh theo modulo 12
    return (
      <View style={styles.row}>
        {mode === 'plain' ? (
          // RN core Image: style 64×64 nhưng nguồn decode vẫn là PNG 2000px
          <RNImage
            source={src}
            style={styles.thumb}
            onLoadEnd={() => onImgLoaded(index)}
          />
        ) : (
          // expo-image: downscale theo container + cache memory-disk,
          // recyclingKey reset nội dung view trước khi load ảnh mới
          <ExpoImage
            source={src}
            style={styles.thumb}
            cachePolicy="memory-disk"
            recyclingKey={item.id}
            onLoadEnd={() => onImgLoaded(index)}
          />
        )}
        <View style={styles.rowTxt}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.sub}>{item.subtitle}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.listArea}>
      <View style={styles.statsBar}>
        <Text style={styles.stats}>
          {MODE_LABEL[mode]} ·{' '}
          {firstScreenMs === null
            ? 'đang tải màn đầu…'
            : `màn đầu đủ ảnh sau ${firstScreenMs}ms`}
        </Text>
      </View>
      <FlatList
        style={styles.list}
        data={ITEMS}
        renderItem={renderRow}
        keyExtractor={(it) => it.id}
        getItemLayout={(_, i) => ({ length: ROW_H, offset: ROW_H * i, index: i })}
      />
    </View>
  );
}

export default function N5Page() {
  const [mode, setMode] = useState<Mode>('plain');

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        {(['plain', 'expo'] as Mode[]).map((m) => (
          <Pressable
            key={m}
            onPress={() => setMode(m)}
            style={[styles.modeBtn, mode === m && styles.modeBtnOn]}
          >
            <Text style={[styles.modeTxt, mode === m && styles.modeTxtOn]}>
              {MODE_LABEL[m]}
            </Text>
          </Pressable>
        ))}
      </View>
      {/* key theo mode → remount ImageList: reset mốc đo + bộ đếm loaded */}
      <ImageList key={mode} mode={mode} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    gap: 8,
    padding: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modeBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  modeBtnOn: { backgroundColor: '#1d4ed8', borderColor: '#1d4ed8' },
  modeTxt: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
  modeTxtOn: { color: '#ffffff' },
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
    height: ROW_H,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  thumb: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#e2e8f0' },
  rowTxt: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  sub: { fontSize: 12, color: '#64748b' },
});
