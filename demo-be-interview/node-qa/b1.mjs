// B1 (ep69) — thứ tự event loop: sync → microtask → timer/immediate
// Phần 1: ngoài I/O cycle (top-level .mjs). Hai sự thật đo được trên máy:
//   - promise.then chạy TRƯỚC nextTick (file ESM evaluate trong microtask —
//     .then nối vào hàng đang xả; nextTickQueue chỉ xả khi microtask cạn.
//     Ở CommonJS thì ngược lại: nextTick trước promise — xem b1-report).
//   - setTimeout 0 vs setImmediate: thứ tự KHÔNG đảm bảo (docs xác nhận).
// Phần 2: trong callback fs.readFile — setImmediate LUÔN thắng (docs đảm bảo).
import { readFile } from 'node:fs';

// ---- Phần 1: ngoài I/O cycle ----------------------------------------------
console.log('== B1: thứ tự event loop ==');

let n = 0;                 // số thứ tự async quan sát được
const order = [];          // tên callback theo thứ tự chạy thật
let pending = 4;           // nextTick + promise + timer + immediate

const hit = (name, note) => {
  n += 1;
  order.push(name);
  console.log(`[${n}] ${name.padEnd(13)}— ${note}`);
  pending -= 1;
  if (pending === 0) footerThenPart2();
};

console.log('[A] sync đầu      — code đồng bộ chạy ngay');
setTimeout(() => hit('setTimeout 0', 'macrotask, phase timers'), 0);
setImmediate(() => hit('setImmediate', 'macrotask, phase check'));
process.nextTick(() => hit('nextTick', 'chờ microtask cạn mới xả'));
Promise.resolve().then(() => hit('promise.then', 'microtask, nối hàng đang xả'));
console.log('[B] sync cuối     — sync xong mới tới hàng đợi');

function footerThenPart2() {
  const short = {
    'setTimeout 0': 'timer', setImmediate: 'immediate',
    nextTick: 'nextTick', 'promise.then': 'promise',
  };
  console.log(`=> sync → ${order.map((x) => short[x]).join(' → ')}`);
  console.log('   (.mjs: promise trước nextTick — đặc thù ESM)');
  console.log('   (timer vs immediate ngoài I/O: KHÔNG đảm bảo)');
  console.log('');
  part2();
}

// ---- Phần 2: trong I/O cycle ----------------------------------------------
function part2() {
  console.log('== B1b: trong I/O cycle (fs.readFile) ==');
  let m = 0;
  const io = [];
  const hit2 = (name, note) => {
    m += 1;
    io.push(name);
    console.log(`[${m}] ${name.padEnd(13)}— ${note}`);
    if (io.length === 2) {
      console.log(io[0] === 'setImmediate'
        ? 'OK immediate luôn thắng trong I/O — docs đảm bảo'
        : 'FAIL immediate thua timer — trái docs!');
    }
  };
  readFile('./package.json', () => {
    setTimeout(() => hit2('setTimeout 0', 'chờ vòng sau, phase timers'), 0);
    setImmediate(() => hit2('setImmediate', 'phase check ngay sau poll'));
  });
}
