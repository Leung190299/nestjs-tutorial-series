#!/usr/bin/env node
// term-shot: render file text (output demo THẬT) thành ảnh PNG khung terminal giả.
//
//   node tools/term-shot.mjs <input.txt> <out.png> [--wide] [--title "b1 · event loop"]
//
// - Mặc định khổ dọc 620×1281 (chữ 18px). --wide → 1280×800 (chữ 16px).
// - Text giữ NGUYÊN VĂN (chỉ escape HTML để hiển thị); dòng bắt đầu "==" tô vàng,
//   từ "OK" xanh / "FAIL" đỏ.
// - Chụp bằng Chrome headless --screenshot (như series StyleX). Trước khi chụp,
//   chạy 1 lượt --dump-dom đọc marker overflow do template tự đo — text tràn khung
//   thì tool THOÁT LỖI (exit 1), không cắt chữ lặng lẽ.

import {readFileSync, writeFileSync, mkdtempSync, rmSync, existsSync, statSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join, dirname, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE = join(__dirname, 'term-template.html');

// ---- parse args ----
const args = process.argv.slice(2);
const positional = [];
let wide = false;
let title = '';
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--wide') wide = true;
  else if (args[i] === '--title') {
    if (i + 1 >= args.length) fail('--title cần giá trị');
    title = args[++i];
  } else if (args[i].startsWith('--')) fail(`cờ không hỗ trợ: ${args[i]}`);
  else positional.push(args[i]);
}
if (positional.length !== 2) {
  console.error('Cách dùng: node tools/term-shot.mjs <input.txt> <out.png> [--wide] [--title "..."]');
  process.exit(1);
}
const [inputPath, outPath] = positional.map((p) => resolve(p));
if (!existsSync(inputPath)) fail(`không thấy file input: ${inputPath}`);
if (!title) title = positional[0].replace(/^.*\//, '');

const WIDTH = wide ? 1280 : 620;
const HEIGHT = wide ? 800 : 1281;

// ---- build HTML ----
const raw = readFileSync(inputPath, 'utf8');
const html = readFileSync(TEMPLATE, 'utf8')
  .replace('__MODE__', wide ? 'wide' : 'vert')
  .replace('__TITLE__', escapeHtml(title))
  .replace('__CONTENT__', renderContent(raw));

const workDir = mkdtempSync(join(tmpdir(), 'term-shot-'));
const pagePath = join(workDir, 'page.html');
writeFileSync(pagePath, html);
const pageUrl = pathToFileURL(pagePath).href;

try {
  // ---- pass 1: đo overflow qua --dump-dom (template tự gắn marker sau load) ----
  const dom = chrome(['--dump-dom']);
  const m = dom.match(/TERMSHOT_OVERFLOW=(\w+);scrollW=(\d+);clientW=(\d+);scrollH=(\d+);clientH=(\d+)/);
  if (!m) fail('không đọc được marker overflow từ trang (Chrome dump-dom hỏng?)');
  const [, ov, sw, cw, sh, ch] = m;
  if (ov !== 'none') {
    const parts = [];
    if (ov.includes('x')) parts.push(`dòng quá DÀI (cần ${sw}px, khung ${cw}px) — rút ngắn dòng`);
    if (ov.includes('y')) parts.push(`quá NHIỀU dòng (cần ${sh}px, khung ${ch}px) — bớt dòng output`);
    fail(`text tràn khung ${WIDTH}×${HEIGHT}: ${parts.join('; ')}. KHÔNG chụp để tránh cắt chữ.`);
  }

  // ---- pass 2: chụp ----
  chrome([`--screenshot=${outPath}`]);
  if (!existsSync(outPath) || statSync(outPath).size === 0) fail('Chrome không tạo được ảnh');
  console.log(`OK ${outPath} (${WIDTH}×${HEIGHT}${wide ? ' wide' : ' dọc'})`);
} finally {
  rmSync(workDir, {recursive: true, force: true});
}

function chrome(extra) {
  return execFileSync(
    CHROME,
    [
      // LƯU Ý: KHÔNG thêm --user-data-dir trỏ vào thư mục temp — Chrome treo vô hạn
      // trên macOS (đã bisect 2026-09-09); headless=new tự dùng profile tạm riêng.
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${WIDTH},${HEIGHT}`,
      '--virtual-time-budget=2000',
      ...extra,
      pageUrl,
    ],
    {encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 60_000},
  );
}

function escapeHtml(s) {
  return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function renderContent(text) {
  return text
    .replace(/\n$/, '')
    .split('\n')
    .map((line) => {
      const esc = escapeHtml(line);
      if (line.startsWith('==')) return `<span class="hl-label">${esc}</span>`;
      return esc
        .replace(/\bOK\b/g, '<span class="hl-ok">OK</span>')
        .replace(/\bFAIL\b/g, '<span class="hl-fail">FAIL</span>');
    })
    .join('\n');
}

function fail(msg) {
  console.error(`term-shot LỖI: ${msg}`);
  process.exit(1);
}
