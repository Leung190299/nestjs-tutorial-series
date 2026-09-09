// B2 (ep70) — non-blocking I/O: 1 thread chặn vs không chặn, đo bằng autocannon.
// Spawn b2-server.mjs làm process CON (cổng 3997), bắn 10 kết nối × 5s vào
// /sync rồi /async — cùng khối lượng pbkdf2, chỉ khác sync/async — in bảng số
// THẬT từ autocannon. Kill server khi xong (kể cả khi lỗi), xác nhận cổng trống.
import { spawn } from 'node:child_process';
import { connect } from 'node:net';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { once } from 'node:events';
import autocannon from 'autocannon';

const PORT = 3997;
const __dirname = dirname(fileURLToPath(import.meta.url));

// ---- server con ------------------------------------------------------------
const server = spawn(process.execPath, [join(__dirname, 'b2-server.mjs')], {
  stdio: ['ignore', 'pipe', 'inherit'],
});

function waitReady() {
  return new Promise((resolve, reject) => {
    let buf = '';
    server.stdout.on('data', (d) => {
      buf += d;
      if (buf.includes('sẵn sàng')) resolve();
    });
    server.on('exit', (code) => reject(new Error(`server thoát sớm (code ${code})`)));
    setTimeout(() => reject(new Error('server không sẵn sàng sau 5s')), 5000).unref();
  });
}

function bench(path) {
  return new Promise((resolve, reject) => {
    autocannon(
      { url: `http://localhost:${PORT}${path}`, connections: 10, duration: 5 },
      (err, result) => (err ? reject(err) : resolve(result)),
    );
  });
}

function portFree() {
  return new Promise((resolve) => {
    const sock = connect({ port: PORT, host: 'localhost' });
    sock.on('connect', () => { sock.destroy(); resolve(false); });
    sock.on('error', () => resolve(true));
  });
}

const fmt = (x, unit = '') => `${x.toFixed(1)}${unit}`;
const row = (name, r) =>
  `${name.padEnd(9)}${fmt(r.requests.average).padStart(7)}` +
  `${fmt(r.latency.average, 'ms').padStart(10)}${fmt(r.latency.max, 'ms').padStart(10)}`;

// ---- đo --------------------------------------------------------------------
try {
  await waitReady();
  const sync = await bench('/sync');
  const async_ = await bench('/async');

  console.log('== B2: 1 thread — chặn vs không chặn ==');
  console.log('cùng khối lượng pbkdf2 40k vòng (~8–9ms),');
  console.log('autocannon 10 kết nối × 5s vào từng route');
  console.log('');
  console.log(`${'route'.padEnd(9)}${'req/s'.padStart(7)}${'lat.avg'.padStart(10)}${'lat.max'.padStart(10)}`);
  console.log(row('/sync', sync));
  console.log(row('/async', async_));
  console.log('');
  const ratio = async_.requests.average / sync.requests.average;
  console.log(`=> /async gấp ~${ratio.toFixed(1)}× req/s: việc nặng RỜI`);
  console.log('   event loop sang libuv threadpool (4 thread)');
  console.log('   — không phải "async tự nhiên nhanh hơn"');
} finally {
  server.kill('SIGTERM');
  if (server.exitCode === null) await once(server, 'exit');
  if (!(await portFree())) {
    console.error(`FAIL cổng ${PORT} vẫn bận sau khi kill server`);
    process.exit(1);
  }
}
