// B3 worker — chạy ĐÚNG khối lượng hash của nhánh main, trong worker thread.
// Nhận {rounds, iterations} qua workerData, postMessage kết quả gọn về main.
import { parentPort, workerData } from 'node:worker_threads';
import { pbkdf2Sync } from 'node:crypto';

const { rounds, iterations } = workerData;
const t0 = Date.now();
let key = Buffer.from('mat-khau');
for (let i = 0; i < rounds; i++) {
  key = pbkdf2Sync(key, 'muoi', iterations, 64, 'sha512');
}
parentPort.postMessage({
  hex: key.toString('hex').slice(0, 8), // 8 hex đầu — phải KHỚP nhánh main
  hashMs: Date.now() - t0,              // thời gian hash thuần trong worker
});
