// B4 chuẩn bị — sinh big.bin 1 GiB CỤC BỘ (đã gitignore), KHÔNG giữ 1GB trong RAM:
// write stream lặp chunk 1 MiB, tôn trọng backpressure (write() false → đợi 'drain').
// Chạy: node b4-make.mjs  (trong demo-be-interview/node-qa/)
import { createWriteStream } from 'node:fs';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';

const TARGET = fileURLToPath(new URL('./big.bin', import.meta.url));
const SIZE = 1024 * 1024 * 1024; // 1 GiB
const CHUNK = Buffer.alloc(1024 * 1024, 0xa5); // 1 MiB, BUFFER DUY NHẤT lặp lại

const t0 = Date.now();
const out = createWriteStream(TARGET);
let written = 0;
while (written < SIZE) {
  if (!out.write(CHUNK)) await once(out, 'drain'); // backpressure thật ngay khi sinh file
  written += CHUNK.length;
}
out.end();
await once(out, 'finish');
const rssMb = Math.round(process.memoryUsage().rss / (1024 * 1024));
console.log(
  `OK big.bin ${written / (1024 * 1024)} MB trong ${Date.now() - t0}ms — RSS lúc xong ${rssMb} MB (không giữ 1GB trong RAM)`,
);
