// D2 (ep82) — Đọc `EXPLAIN (ANALYZE, BUFFERS)`: cost vs actual, rows ước lượng vs
// thật, loops, buffers, Planning/Execution Time.
//
//   node d2.mjs          # in CẢ 2 phần (a) plan đầy đủ + (b) đọc plan thế nào
//   node d2.mjs --plan   # chỉ phần (a) — dùng cho ảnh ngang (--wide)
//   node d2.mjs --read   # chỉ phần (b) — dùng cho ảnh dọc
//
// Query dùng làm ví dụ là câu THẬT hay gặp: JOIN orders + customers, lọc theo
// status + city, sắp xếp mới nhất, lấy 20 dòng.
//
// ⚠️ Nguyên tắc: MỌI con số và MỌI tên node trong phần (b) đều được TRÍCH TỪ PLAN
// THẬT bằng regex trên text plan — không hardcode chữ nào. Plan đổi (do dữ liệu,
// do index mới, do phiên bản PG) thì phần bình luận đổi theo. Kể cả beat "thống kê
// cũ" cũng chỉ in ra khi ĐO THẤY lệch, và chỉ tính trên node quét (leaf) — vì node
// nằm dưới LIMIT lệch là chuyện BÌNH THƯỜNG (bị dừng sớm), docs nói rõ.
import { pool, q, label } from './db.mjs';

const SQL = `SELECT o.id, o.total, o.status, o.created_at, c.name, c.city
FROM orders o
JOIN customers c ON c.id = o.customer_id
WHERE o.status = $1 AND c.city = $2
ORDER BY o.created_at DESC
LIMIT 20`;
const STATUS = 'paid';
const CITY = 'Da Nang';

const ONLY_PLAN = process.argv.includes('--plan');
const ONLY_READ = process.argv.includes('--read');
const showPlan = !ONLY_READ;
const showRead = !ONLY_PLAN;

// --------------------------------------------------------------------------
// Parser: text plan -> danh sách node (depth, tên, cost, actual, rows, loops)
// --------------------------------------------------------------------------

/** Một dòng node có dạng `Name  (cost=a..b rows=R width=W) (actual time=x..y rows=r loops=L)`. */
const NODE_RE = new RegExp(
  '^(\\s*)(->\\s+)?(\\S.*?)\\s+' +
  '\\(cost=([\\d.]+)\\.\\.([\\d.]+) rows=([\\d.]+) width=(\\d+)\\)\\s+' +
  '\\(actual time=([\\d.]+)\\.\\.([\\d.]+) rows=([\\d.]+) loops=(\\d+)\\)\\s*$',
);

function parsePlan(lines) {
  const nodes = [];
  for (const line of lines) {
    const m = line.match(NODE_RE);
    if (m) {
      nodes.push({
        depth: m[1].length,
        name: m[3],
        cost: `cost=${m[4]}..${m[5]}`,
        estRows: Number(m[6]),
        actual: `actual time=${m[8]}..${m[9]}`,
        actMs: Number(m[9]),
        actRows: Number(m[10]),
        loops: Number(m[11]),
        attrs: [],
      });
    } else if (nodes.length && /^\s/.test(line) && line.trim()) {
      nodes[nodes.length - 1].attrs.push(line.trim());
    }
  }
  // leaf = node không có node con (node kế tiếp không sâu hơn)
  nodes.forEach((n, i) => {
    n.leaf = i === nodes.length - 1 || nodes[i + 1].depth <= n.depth;
  });
  return nodes;
}

/** Lệch bao nhiêu LẦN giữa ước lượng và thật (luôn >= 1, hướng nào cũng tính). */
function skew(n) {
  const est = Math.max(n.estRows, 1);
  const act = Math.max(n.actRows, 1);
  return est >= act ? est / act : act / est;
}

const f = (x, d = 1) => x.toFixed(d);
const say = (s) => console.log(s);

// --------------------------------------------------------------------------
const { rows: pl, ms: explainMs } = await q(
  `EXPLAIN (ANALYZE, BUFFERS) ${SQL}`, [STATUS, CITY],
);
const lines = pl.map((r) => r['QUERY PLAN']);
const nodes = parsePlan(lines);

const outer = nodes[0];
const inner = nodes.reduce((a, b) => (b.depth > a.depth ? b : a), nodes[0]);
const planningTime = (lines.find((l) => l.startsWith('Planning Time:')) || '').trim();
const execTime = (lines.find((l) => l.startsWith('Execution Time:')) || '').trim();
// Buffers của node ngoài cùng = đã cộng dồn toàn bộ node con.
const buffers = (outer.attrs.find((a) => a.startsWith('Buffers:')) || '').trim();
const bufHit = Number((buffers.match(/shared hit=(\d+)/) || [])[1] ?? 0);
const bufRead = Number((buffers.match(/read=(\d+)/) || [])[1] ?? 0);

// Node có loops > 1 mà TỔNG dòng đi qua (rows x loops) lớn nhất — chỗ quên nhân
// loops thì sai nhiều nhất, nên đó là node đáng lấy ra dạy.
const looped = nodes.filter((n) => n.loops > 1)
  .sort((a, b) => b.actRows * b.loops - a.actRows * a.loops)[0];

// LIMIT trong plan: node nào phát ra <= số này thì lệch là do DỪNG SỚM, không phải
// do thống kê cũ (docs using-explain nói đúng ca này).
const limitNode = nodes.find((n) => /^Limit/.test(n.name));
const limitN = limitNode ? limitNode.actRows : null;

const bySkew = [...nodes].sort((a, b) => skew(b) - skew(a));
const worst = bySkew[0];
const worstLeaf = [...nodes].filter((n) => n.leaf).sort((a, b) => skew(b) - skew(a))[0];
const worstIsLimitStop = limitN !== null && worst.actRows <= limitN;

// --------------------------------------------------------------------------
// (a) PLAN ĐẦY ĐỦ — nguyên văn từ Postgres
// --------------------------------------------------------------------------
// Nhãn + mô tả query: in ở MỌI chế độ để ảnh nào cũng biết đang xem plan của câu nào.
label('D2: đọc EXPLAIN ANALYZE');
if (ONLY_READ) {
  // Khổ dọc ~50 ký tự/dòng: xuống dòng cho vừa, chữ giữ nguyên.
  say(`query: JOIN orders + customers`);
  say(`WHERE status='${STATUS}' AND city='${CITY}'`);
  say(`ORDER BY created_at DESC LIMIT 20`);
  say('');
} else {
  say(`JOIN orders+customers · status='${STATUS}' · city='${CITY}'`);
  say(`ORDER BY created_at DESC LIMIT 20 · EXPLAIN ${f(explainMs, 1)} ms`);
}

if (showPlan) {
  // Bỏ khối "Planning:" (2 dòng) — Planning Time vẫn giữ ở dòng riêng phía dưới.
  const pi = lines.findIndex((l) => l.trim() === 'Planning:');
  let out = (pi === -1 ? lines : [...lines.slice(0, pi), ...lines.slice(pi + 2)])
    .filter((l) => l.trim());

  if (ONLY_PLAN) {
    // Chỉ ở chế độ ảnh NGANG (1280×800, 16px ≈ 125 ký tự/dòng × 25 dòng): plan
    // thật dài 141 ký tự × 28 dòng nên KHÔNG vừa khung. Ba phép rút gọn dưới đây
    // chỉ bỏ thứ TRÙNG LẶP hoặc không liên quan bài học D2, KHÔNG sửa con số nào:
    //   - `Buffers:` của node con (đã cộng dồn vào Buffers của node ngoài cùng),
    //   - `Worker N: Sort Method` (lặp lại y hệt dòng `Sort Method` ngay trên),
    //   - `width=NN` (bề rộng byte 1 dòng — không dùng khi đọc plan),
    //   - thụt lề 6 khoảng/cấp -> 2 khoảng/cấp (cây giữ nguyên hình dạng).
    // Bản ĐẦY ĐỦ 100% nguyên văn vẫn in ra khi chạy `node d2.mjs` (không cờ).
    let seenBuffers = false;
    out = out.filter((l) => {
      const t = l.trim();
      if (/^Worker \d+:/.test(t)) return false;
      if (t.startsWith('Buffers:')) {
        if (seenBuffers) return false;
        seenBuffers = true;
      }
      return true;
    }).map((l) => {
      const indent = l.length - l.trimStart().length;
      return ' '.repeat(Math.round(indent / 3)) + l.trimStart().replace(/ width=\d+\)/, ')');
    });
  }
  out.forEach((l) => say(l));
}

// --------------------------------------------------------------------------
// (b) ĐỌC PLAN NHƯ THẾ NÀO — mọi số trích từ plan ở trên
// --------------------------------------------------------------------------
if (showRead) {
  if (showPlan) say('');
  label('ĐỌC PLAN NHƯ THẾ NÀO');
  say(`[1] node ngoài cùng: ${outer.name}`);
  say(`    node trong cùng: ${inner.name}`);
  say(`=> plan là CÂY: trong cùng chạy TRƯỚC, node`);
  say(`   ngoài cùng trả kết quả CUỐI`);
  say(`[2] ước lượng: (${outer.cost})`);
  say(`=> đơn vị quy ước của planner, KHÔNG phải ms`);
  say(`[3] thật:      (${outer.actual})`);
  say(`=> ms thật, có được vì ANALYZE CHẠY query`);
  say(`[4] rows: ước ${outer.estRows} vs thật ${outer.actRows} (lệch ${f(skew(outer), 1)}x)`);
  say(`=> rows là số dòng node PHÁT RA sau khi lọc`);
  if (looped) {
    say(`[5] loops=${looped.loops} tại node:`);
    say(`    ${looped.name}`);
    say(`=> time/rows là TRUNG BÌNH 1 lượt: ${looped.actRows} x`);
    say(`   ${looped.loops} = ${looped.actRows * looped.loops} dòng thật sự đi qua`);
  } else {
    say(`[5] loops=${outer.loops} ở mọi node`);
    say(`=> loops>1 thì time/rows là trung bình, phải nhân`);
  }
  say(`[6] ${buffers}`);
  say(`=> ${bufHit} trang lấy từ cache, ${bufRead} trang đọc đĩa`);
  say(`[7] ${planningTime}`);
  say(`    ${execTime}`);
  say(`=> lập kế hoạch vs thi hành; Execution KHÔNG`);
  say(`   gồm parse/rewrite/planning`);
  say(`[8] node lệch nhất: ${worst.name}`);
  say(`    ước ${worst.estRows} vs thật ${worst.actRows} = lệch ${f(skew(worst), 0)}x`);
  if (worstIsLimitStop) {
    say(`=> lệch to nhưng KHÔNG phải thống kê cũ: LIMIT`);
    say(`   ${limitN} dừng sớm, node không chạy hết`);
  } else {
    say(`=> lệch to mà không có LIMIT chặn: dấu hiệu`);
    say(`   thống kê cũ, cần chạy ANALYZE`);
  }
  say(`[9] node QUÉT lệch nhất:`);
  say(`    ${worstLeaf.name}`);
  say(`    ước ${worstLeaf.estRows} vs thật ${worstLeaf.actRows} = lệch ${f(skew(worstLeaf), 1)}x`);
  if (skew(worstLeaf) >= 10) {
    say(`=> ĐO THẤY lệch ${f(skew(worstLeaf), 0)}x ở node quét: thống kê`);
    say(`   cũ, chạy ANALYZE rồi EXPLAIN lại`);
  } else {
    say(`=> dưới 10x: thống kê còn tươi, ước lượng của`);
    say(`   planner đáng tin ở node quét`);
  }
}

await pool.end();
