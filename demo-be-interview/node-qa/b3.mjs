// B3 (ep71) — CPU-bound chặn event loop: main thread vs worker_threads.
// Đồng hồ tick 100ms đo maxGap (pattern N6 lô 2): main bị chiếm thì tick hụt.
//   Nhánh 1: pbkdf2Sync chuỗi nối ×200 (~1.8s) NGAY trên main → gap ≈ tổng.
//   Nhánh 2: CÙNG khối lượng qua Worker (b3-worker.mjs) → main rảnh, gap nhỏ.
// Hash 8 hex đầu in cả 2 nhánh — KHỚP nhau = bằng chứng cùng khối lượng.
import { Worker } from 'node:worker_threads';
import { pbkdf2Sync } from 'node:crypto';

const ROUNDS = 200;       // số lần pbkdf2 nối chuỗi (key vòng trước làm input)
const ITERATIONS = 40000; // ~8-9ms/vòng trên máy này (đo ở B2) → tổng ~1.8s

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Đồng hồ tick 100ms: ghi gap lớn nhất giữa 2 tick (mọi gap, không chỉ >150ms
// — ngưỡng 150ms chỉ để đọc kết quả). Dừng thì đợi thêm 300ms: gap của khối
// đồng bộ chỉ lộ ra ở tick ĐẦU TIÊN sau khi main rảnh lại (bài học N6).
function startClock() {
  let last = Date.now();
  let maxGap = 0;
  const id = setInterval(() => {
    const now = Date.now();
    const gap = now - last;
    if (gap > maxGap) maxGap = gap;
    last = now;
  }, 100);
  return async function stop() {
    await sleep(300);
    clearInterval(id);
    return maxGap;
  };
}

// ---- Nhánh 1: hash trên main thread ---------------------------------------
console.log('== B3: hash trên main thread ==');
console.log(`pbkdf2Sync 40k vòng ×${ROUNDS} (chuỗi nối key)`);
let mainHex; // hash nhánh 1 — nhánh 2 đối chiếu
{
  const stop = startClock();
  await sleep(250); // vài tick nền trước khi chặn — baseline gap ~100ms
  const t0 = Date.now();
  let key = Buffer.from('mat-khau');
  for (let i = 0; i < ROUNDS; i++) {
    key = pbkdf2Sync(key, 'muoi', ITERATIONS, 64, 'sha512');
  }
  const totalMs = Date.now() - t0;
  const maxGap = await stop();
  mainHex = key.toString('hex').slice(0, 8);
  console.log(`maxGap ${maxGap}ms — đồng hồ ĐỨNG suốt khối hash`);
  console.log(`tổng ${totalMs}ms · hash ${mainHex}`);
}

// ---- Nhánh 2: cùng khối lượng qua worker_threads --------------------------
console.log('');
console.log('== B3b: cùng khối lượng qua worker_threads ==');
{
  const stop = startClock();
  await sleep(250);
  const t0 = Date.now();
  const worker = new Worker(new URL('./b3-worker.mjs', import.meta.url), {
    workerData: { rounds: ROUNDS, iterations: ITERATIONS },
  });
  let spawnMs = -1;
  worker.once('online', () => { spawnMs = Date.now() - t0; });
  const result = await new Promise((resolve, reject) => {
    worker.once('message', resolve);
    worker.once('error', reject);
  });
  const totalMs = Date.now() - t0; // kể cả chi phí spawn worker
  const maxGap = await stop();
  await worker.terminate();
  console.log(`spawn: ${spawnMs}ms`);
  console.log(`maxGap ${maxGap}ms — main rảnh, đồng hồ vẫn chạy`);
  console.log(`tổng ${totalMs}ms (kể cả spawn) · hash ${result.hex}`);
  console.log(result.hex === mainHex
    ? 'OK hash 2 nhánh KHỚP — đúng cùng khối lượng'
    : 'FAIL hash lệch nhánh main — khối lượng khác nhau!');
}

console.log('');
console.log('=> main: event loop bị CHIẾM ~1.8s — không timer,');
console.log('   không I/O, không request nào được phục vụ');
console.log('   worker: thread khác làm, main tick tiếp');
console.log('   (cluster = nhân cả PROCESS share port —');
console.log('    scale ngang app, chuyện khác)');
