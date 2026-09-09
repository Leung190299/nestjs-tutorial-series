// B6b (ep74) — CommonJS vs ESM: phía ESM. Đuôi .mjs LUÔN là ES module.
// Cùng 4 mục với b6-cjs.cjs; JSON import dùng dynamic import để BẮT lỗi
// thiếu `with` bằng try/catch (docs: "The `with { type: 'json' }` syntax
// is mandatory") — hành vi thật trên Node của máy, chạy sao ghi vậy.

const tilde = (p) => p.replace(process.env.HOME, '~');

console.log('== B6b: đang chạy ESM ==');
console.log('');

// [1] __dirname — ESM không có biến wrapper CJS
try {
  console.log(`[1] __dirname: ${__dirname}`);
} catch (err) {
  console.log(`[1] __dirname: FAIL ${err.name}`);
  console.log(`  ${err.message}`);
  console.log('  thay thế import.meta.dirname:');
  console.log(` ${tilde(import.meta.dirname)}`); // indent 1 — dòng 49 ký tự
}

// [2] import JSON — thử THIẾU `with` trước, rồi có `with { type: 'json' }`
console.log('[2] import JSON:');
try {
  await import('./b6-data.json');
  console.log("  thiếu with: OK (?)");
} catch (err) {
  console.log(`  thiếu with: FAIL ${err.code ?? err.name}`);
}
try {
  const mod = await import('./b6-data.json', { with: { type: 'json' } });
  console.log("  with { type: 'json' }: OK");
  console.log(`  app=${mod.default.app} version=${mod.default.version}`);
} catch (err) {
  console.log(`  with json: FAIL ${err.code ?? err.name}`);
}

// [3] top-level await — chạy thật ngay thân module
const val = await Promise.resolve('OK');
console.log(`[3] top-level await: ${val}`);
console.log("  await Promise.resolve('OK') ngoài hàm chạy luôn");

// [4] ESM load CJS — dynamic import (b6-cjs.cjs có guard, không in lặp)
try {
  const cjs = await import('./b6-cjs.cjs');
  console.log("[4] ESM import CJS: OK");
  console.log(`  hello='${cjs.default.hello}'`);
} catch (err) {
  console.log(`[4] ESM import CJS: FAIL ${err.code ?? err.name}`);
}

console.log('');
console.log('=> ESM thua 1, kèm điều kiện 2, ăn 3-4;');
console.log('   .js theo "type" của package.json');
console.log('   (nextTick vs promise trong ESM: xem câu #25)');
