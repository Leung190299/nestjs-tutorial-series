import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { makeItems } from '@/lib/data';

// ── Thiết kế trung thực: dữ liệu đến dạng 60 TRANG JSON × 5.000 bản ghi (300k).
// Nhánh 1 parse + xử lý CẢ 60 trang trong MỘT vòng lặp đồng bộ (chặn JS thread).
// Nhánh 2 mỗi setTimeout(0) parse + xử lý ĐÚNG 1 trang (lô 5k) rồi nhường event loop.
// → CÙNG tổng khối lượng parse lẫn xử lý, chỉ khác cách xếp lên event loop.
const PAGE_SIZE = 5000;
const PAGE_COUNT = 60; // 60 × 5000 = 300.000
const TOTAL = PAGE_SIZE * PAGE_COUNT;

// Chuẩn bị 60 chuỗi JSON MỘT LẦN (useMemo lúc render đầu, TRƯỚC khi timer chạy
// nên không tính vào phần đo). Trả kèm thời gian chuẩn bị để ghi lên UI.
function makePages(): { pages: string[]; prepMs: number } {
  const t0 = performance.now();
  const all = makeItems(TOTAL);
  const pages: string[] = [];
  for (let p = 0; p < PAGE_COUNT; p++) {
    pages.push(JSON.stringify(all.slice(p * PAGE_SIZE, (p + 1) * PAGE_SIZE)));
  }
  return { pages, prepMs: Math.round(performance.now() - t0) };
}

// Một "trang" công việc: JSON.parse + vòng xử lý nhẹ trên kết quả (checksum độ dài).
function processPage(json: string): number {
  const arr: { title: string; subtitle: string }[] = JSON.parse(json);
  let acc = 0;
  for (let i = 0; i < arr.length; i++) {
    acc += arr[i].title.length + arr[i].subtitle.length;
  }
  return acc;
}

type Mode = 'blocked' | 'chunked';

type RunResult = {
  mode: Mode;
  totalMs: number; // tổng thời gian parse + xử lý
  maxGap: number; // gap lớn nhất giữa 2 tick trong lần chạy
  checksum: number; // chống tối ưu hoá loại bỏ vòng xử lý
};

const MODE_LABEL: Record<Mode, string> = {
  blocked: 'một cục (60 trang, 1 vòng đồng bộ)',
  chunked: 'chia lô 5k/trang + setTimeout(0)',
};

const GAP_MISS = 150; // tick 100ms mà chênh >150ms = hụt tick

export default function N6Page() {
  // Dữ liệu sinh 1 lần ở render đầu — trước khi effect gắn setInterval.
  const { pages, prepMs } = useMemo(makePages, []);

  // Đồng hồ đang chạy: hiển thị số giây TO, cập nhật mỗi 100ms.
  const [clock, setClock] = useState('0.0');
  const startAt = useRef(0);
  const lastTick = useRef(0);

  // Đo gap giữa 2 tick trong lần chạy đang hoạt động.
  const measuring = useRef(false);
  const maxGapRef = useRef(0);

  const [busy, setBusy] = useState<Mode | null>(null);
  const [result, setResult] = useState<RunResult | null>(null);

  useEffect(() => {
    startAt.current = Date.now();
    lastTick.current = Date.now();
    const id = setInterval(() => {
      const now = Date.now();
      const gap = now - lastTick.current;
      lastTick.current = now;
      if (measuring.current && gap > maxGapRef.current) maxGapRef.current = gap;
      setClock(((now - startAt.current) / 1000).toFixed(1));
    }, 100);
    return () => clearInterval(id);
  }, []);

  // Kết thúc chạy: đợi 300ms cho tick-bị-nợ sau khối đồng bộ kịp bắn
  // (gap chỉ đo được ở tick ĐẦU TIÊN sau khi thread rảnh) rồi mới chốt maxGap.
  const finish = (mode: Mode, totalMs: number, checksum: number) => {
    setTimeout(() => {
      measuring.current = false;
      setResult({ mode, totalMs: Math.round(totalMs), maxGap: maxGapRef.current, checksum });
      setBusy(null);
    }, 300);
  };

  const begin = (mode: Mode) => {
    setBusy(mode);
    setResult(null);
    maxGapRef.current = 0;
    measuring.current = true;
  };

  // Nhánh 1: parse + xử lý cả 60 trang trong MỘT vòng lặp đồng bộ trên JS thread.
  const runBlocked = () => {
    begin('blocked');
    // setTimeout(50) để state "đang chạy" kịp vẽ trước khi thread bị chiếm.
    setTimeout(() => {
      const t0 = performance.now();
      let acc = 0;
      for (let p = 0; p < PAGE_COUNT; p++) acc += processPage(pages[p]);
      finish('blocked', performance.now() - t0, acc);
    }, 50);
  };

  // Nhánh 2: cùng 60 trang nhưng mỗi setTimeout(0) xử lý đúng 1 trang (5k).
  const runChunked = () => {
    begin('chunked');
    const t0 = performance.now();
    let acc = 0;
    let p = 0;
    const step = () => {
      acc += processPage(pages[p]);
      p++;
      if (p < PAGE_COUNT) setTimeout(step, 0);
      else finish('chunked', performance.now() - t0, acc);
    };
    setTimeout(step, 0);
  };

  const missed = result !== null && result.maxGap > GAP_MISS;

  return (
    <View style={styles.screen}>
      {/* Đồng hồ TO — bằng chứng sống của JS thread */}
      <View style={styles.clockBox}>
        <Text style={styles.clockLabel}>đồng hồ JS thread (tick 100ms)</Text>
        <Text style={styles.clock}>{clock}s</Text>
      </View>

      <Text style={styles.dataNote}>
        Dữ liệu: 60 trang JSON × 5.000 bản ghi = 300.000 · chuẩn bị {prepMs}ms
        (ngoài phần đo) · 2 nhánh CÙNG tổng khối lượng parse + xử lý
      </Text>

      <Pressable
        onPress={runBlocked}
        disabled={busy !== null}
        style={[styles.btn, styles.btnDanger, busy !== null && styles.btnOff]}
      >
        <Text style={styles.btnTxt}>Parse 300k (một cục)</Text>
        <Text style={styles.btnSub}>60 trang trong 1 vòng lặp đồng bộ</Text>
      </Pressable>

      <Pressable
        onPress={runChunked}
        disabled={busy !== null}
        style={[styles.btn, styles.btnSafe, busy !== null && styles.btnOff]}
      >
        <Text style={styles.btnTxt}>Parse 300k (chia lô 5k + setTimeout)</Text>
        <Text style={styles.btnSub}>mỗi setTimeout(0) parse + xử lý 1 trang</Text>
      </Pressable>

      {busy !== null && (
        <Text style={styles.busyTxt}>đang chạy: {MODE_LABEL[busy]}…</Text>
      )}

      {result !== null && (
        <View style={[styles.resultBox, missed ? styles.resultBad : styles.resultGood]}>
          <Text style={styles.resultMode}>{MODE_LABEL[result.mode]}</Text>
          <Text style={[styles.gapTxt, missed ? styles.gapBad : styles.gapGood]}>
            ⏱ tick bị hụt: {result.maxGap}ms
          </Text>
          <Text style={styles.totalTxt}>
            tổng parse + xử lý: {result.totalMs}ms · checksum {result.checksum}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f8fafc', padding: 16, gap: 12 },
  clockBox: {
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 16,
    paddingVertical: 20,
  },
  clockLabel: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  clock: {
    color: '#f8fafc',
    fontSize: 72,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  dataNote: { fontSize: 12, color: '#64748b', lineHeight: 17 },
  btn: { borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  btnDanger: { backgroundColor: '#dc2626' },
  btnSafe: { backgroundColor: '#16a34a' },
  btnOff: { opacity: 0.4 },
  btnTxt: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  btnSub: { color: '#ffffffcc', fontSize: 12, marginTop: 2 },
  busyTxt: { fontSize: 14, fontWeight: '600', color: '#334155', textAlign: 'center' },
  resultBox: { borderRadius: 12, borderWidth: 2, padding: 14, gap: 4 },
  resultBad: { borderColor: '#dc2626', backgroundColor: '#fef2f2' },
  resultGood: { borderColor: '#16a34a', backgroundColor: '#f0fdf4' },
  resultMode: { fontSize: 13, fontWeight: '600', color: '#334155' },
  gapTxt: { fontSize: 26, fontWeight: '800' },
  gapBad: { color: '#dc2626' },
  gapGood: { color: '#16a34a' },
  totalTxt: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
});
