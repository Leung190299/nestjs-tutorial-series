// B6 (ep74) — CommonJS vs ESM: phía CJS. Đuôi .cjs LUÔN là CommonJS
// (kể cả khi package.json có "type": "module" — như node-qa này).
// 4 mục CÙNG BỘ với b6.mjs: __dirname · load JSON · top-level await · load
// hệ kia. Mọi giá trị/lỗi in ra là THẬT (chạy thử + try/catch); đường dẫn
// rút gọn HOME → ~ cho vừa khung ảnh.

const tilde = (p) => p.replace(process.env.HOME, '~');

function main() {
  console.log('== B6: đang chạy CJS ==');
  console.log('');

  // [1] __dirname — wrapper CJS bơm sẵn (exports, require, module, __filename, __dirname)
  try {
    console.log('[1] __dirname: OK');
    console.log(` ${tilde(__dirname)}`); // indent 1 — dòng dài 49 ký tự
  } catch (err) {
    console.log(`[1] __dirname: FAIL ${err.name}`);
  }

  // [2] require JSON — CJS ăn ngay, không cần khai báo gì
  try {
    const data = require('./b6-data.json');
    console.log(`[2] require('./b6-data.json'): OK`);
    console.log(`  app=${data.app} version=${data.version}`);
  } catch (err) {
    console.log(`[2] require JSON: FAIL ${err.code ?? err.name}`);
  }

  // [3] top-level await — require file .cjs có `await` ngoài hàm:
  // lỗi ngay lúc PARSE, chưa chạy được dòng nào của file đó.
  try {
    require('./b6-tla-test.cjs');
    console.log('[3] top-level await: OK (?!)');
  } catch (err) {
    console.log(`[3] top-level await: FAIL ${err.name}`);
    // Message đầy đủ, ngắt 2 dòng cho vừa khung ảnh dọc (~50 ký tự/dòng)
    const m = err.message;
    const cut = m.lastIndexOf(' ', 46);
    console.log(`  ${m.slice(0, cut)}`);
    console.log(`  ${m.slice(cut + 1)}`);
  }

  // [4] CJS load ESM — require('./b6.mjs') (file có top-level await),
  // rồi require('./b6-sync.mjs') (ESM đồng bộ) để so.
  try {
    require('./b6.mjs');
    console.log(`[4] require('./b6.mjs'): OK (?)`);
  } catch (err) {
    console.log(`[4] require('./b6.mjs'): FAIL`);
    console.log(`  ${err.code ?? err.name}`);
    console.log('  (b6.mjs có top-level await — chịu)');
  }
  try {
    const esm = require('./b6-sync.mjs');
    console.log('  b6-sync.mjs — ESM KHÔNG có await: OK');
    console.log(`  hello='${esm.hello}' (${process.version})`);
  } catch (err) {
    console.log(`  b6-sync.mjs: FAIL ${err.code ?? err.name}`);
  }

  console.log('');
  console.log('=> CJS đủ 1-2, thua 3; require(ESM đồng bộ)');
  console.log('   chạy được từ Node 22.12 — twist mục 4');
}

// Guard: chỉ chạy demo khi được gọi trực tiếp (node b6-cjs.cjs) —
// để b6.mjs `await import()` file này KHÔNG in lặp cả khối.
if (require.main === module) main();

module.exports = { hello: 'xin chào từ CJS' };
