// B4 (ep72) — Stream & backpressure: RSS readFile-cả-cục vs stream.pipe trên big.bin 1 GiB.
// MỖI NHÁNH CHẠY Ở PROCESS RIÊNG (2 lệnh) để RSS sạch, không dính di sản nhánh kia:
//   node b4.mjs readfile   → fs.readFile NGUYÊN file vào RAM rồi ghi ra /dev/null
//   node b4.mjs stream     → createReadStream().pipe(createWriteStream('/dev/null'))
// Poll RSS mỗi 50ms (kèm sample tại mốc chính) → in RSS trước/đỉnh + thời gian.
// Nhánh stream in luôn readableHighWaterMark THẬT đọc từ stream (docs fs: mặc định 64*1024).
// Cần big.bin — sinh bằng: node b4-make.mjs
import { createReadStream, createWriteStream } from 'node:fs';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';

const BIG = fileURLToPath(new URL('./big.bin', import.meta.url));
const mb = (bytes) => Math.round(bytes / (1024 * 1024));

const mode = process.argv[2];
if (mode !== 'readfile' && mode !== 'stream') {
  console.error('Cách dùng: node b4.mjs readfile | node b4.mjs stream');
  process.exit(1);
}
const info = await stat(BIG).catch(() => null);
if (!info) {
  console.error('Chưa có big.bin — sinh trước bằng: node b4-make.mjs');
  process.exit(1);
}

// Đo RSS: đỉnh = max(mọi sample); poll 50ms + sample() thủ công tại mốc quan trọng.
let peak = process.memoryUsage().rss;
const before = peak;
const sample = () => {
  const rss = process.memoryUsage().rss;
  if (rss > peak) peak = rss;
};
const pollId = setInterval(sample, 50);

if (mode === 'readfile') {
  console.log('== B4: readFile cả 1GB ==');
  console.log(`big.bin ${mb(info.size)} MB → RAM một cục → /dev/null`);
  const t0 = Date.now();
  const buf = await readFile(BIG); // NGUYÊN 1GB thành 1 Buffer trong heap
  sample();
  await writeFile('/dev/null', buf);
  sample();
  const tookMs = Date.now() - t0;
  console.log(`RSS trước: ${mb(before)} MB`);
  console.log(`RSS đỉnh: ${mb(peak)} MB — phồng nguyên cỡ file`);
  console.log(`xong ${tookMs}ms`);
} else {
  console.log('== B4b: stream.pipe ==');
  console.log(`big.bin ${mb(info.size)} MB → chunk nối chunk → /dev/null`);
  const t0 = Date.now();
  const rs = createReadStream(BIG); // highWaterMark mặc định — không chỉnh gì
  const hwm = rs.readableHighWaterMark;
  console.log(`highWaterMark thật: ${hwm} bytes = ${hwm / 1024} KiB/chunk`);
  const ws = createWriteStream('/dev/null');
  rs.pipe(ws); // pipe tự quản pause/resume + end() phía ghi
  await once(ws, 'finish'); // xong = phía GHI đã flush hết
  sample();
  const tookMs = Date.now() - t0;
  console.log(`RSS trước: ${mb(before)} MB`);
  console.log(`RSS đỉnh: ${mb(peak)} MB — phẳng, cỡ vài buffer`);
  console.log(`xong ${tookMs}ms`);
  console.log('');
  console.log('=> readFile: RSS ăn theo CỠ FILE — 10GB là gục');
  console.log('   stream: RSS cố định dù file bao lớn');
  console.log("   backpressure: write() false → nguồn pause,");
  console.log("   'drain' → bơm tiếp — pipe TỰ LO hết");
}
clearInterval(pollId);
