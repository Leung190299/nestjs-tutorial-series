// B2 (ep70) — server demo: cùng MỘT khối lượng pbkdf2 (40k vòng ≈ 8–9ms),
// hai cách phục vụ:
//   /sync  — pbkdf2Sync CHẶN event loop: hash xong mới trả, request sau xếp hàng
//   /async — pbkdf2 async: việc nặng giao libuv threadpool, event loop rảnh
// Cổng 3997 (3998 là nest-qa). Chạy bởi b2.mjs (spawn con) hoặc chạy tay.
import { createServer } from 'node:http';
import { pbkdf2, pbkdf2Sync } from 'node:crypto';

const PORT = 3997;
const ITER = 40_000; // ≈8–9ms/hash trên máy này — mô phỏng handler "hơi nặng"
const KEYLEN = 64;
const DIGEST = 'sha512';

const server = createServer((req, res) => {
  const reply = (hash) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ route: req.url, hash: hash.toString('hex').slice(0, 16) }));
  };
  if (req.url === '/sync') {
    // CHẶN: event loop đứng ~8–9ms cho MỖI request — mọi client xếp hàng
    reply(pbkdf2Sync('mat-khau', 'muoi', ITER, KEYLEN, DIGEST));
  } else if (req.url === '/async') {
    // KHÔNG chặn: hash chạy trên libuv threadpool (mặc định 4 thread),
    // event loop rảnh đi nhận request khác; callback trả kết quả sau
    pbkdf2('mat-khau', 'muoi', ITER, KEYLEN, DIGEST, (err, hash) => {
      if (err) { res.writeHead(500); res.end(); return; }
      reply(hash);
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`b2-server sẵn sàng :${PORT} (pbkdf2 ${ITER} vòng ${DIGEST})`);
});
