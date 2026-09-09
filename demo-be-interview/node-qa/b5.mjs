// B5 (ep73) — Promise.all vs await tuần tự (+ bẫy fail-fast, Promise.allSettled).
// fakeApi(name, ms, fail): setTimeout ms rồi resolve {name, ms} hoặc reject Error("<name> hỏng").
// 3 khối:
//   B5  — await 3 API (300ms mỗi cái) TUẦN TỰ  → tổng ≈ 3×300ms cộng dồn (~905ms)
//   B5b — Promise.all cùng 3 API              → tổng ≈ cái chậm nhất (~300ms)
//   B5c — orders reject sau 100ms: Promise.all fail-fast nổ ~100ms (2 kết quả kia
//         bị BỎ nhưng VẪN chạy ngầm — script đợi và in bằng chứng thời điểm xong);
//         rồi Promise.allSettled cùng bộ → đủ 3 trạng thái, tổng ~300ms, không nổ.
// Số ms là THẬT (Date.now), timer có jitter vài ms — không làm tròn.

const fakeApi = (name, ms, fail = false) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (fail ? reject(new Error(`${name} hỏng`)) : resolve({ name, ms })), ms),
  );

// ---- Khối 1: await tuần tự — mỗi await ĐỢI XONG mới bắn cái sau ----
console.log('== B5: await tuần tự ==');
{
  const t0 = Date.now();
  for (const name of ['user', 'orders', 'promos']) {
    const tStep = Date.now();
    await fakeApi(name, 300);
    console.log(`${name.padEnd(6)} xong ${Date.now() - tStep}ms (cộng dồn ${Date.now() - t0}ms)`);
  }
  console.log(`tổng: ${Date.now() - t0}ms — 3 × 300ms CỘNG DỒN`);
}

console.log('');
console.log('== B5b: Promise.all ==');
{
  console.log('bắn cả 3 CÙNG LÚC, đợi chung một chỗ...');
  const t0 = Date.now();
  const results = await Promise.all([
    fakeApi('user', 300),
    fakeApi('orders', 300),
    fakeApi('promos', 300),
  ]);
  console.log(`đủ 3 kết quả: ${results.map((r) => r.name).join(' · ')}`);
  console.log(`tổng: ${Date.now() - t0}ms — bằng cái CHẬM NHẤT (300ms)`);
}

console.log('');
console.log('== B5c: bẫy fail-fast ==');
{
  // Bộ mới: orders REJECT sau 100ms, user/promos vẫn 300ms như cũ.
  const t0 = Date.now();
  const track = (p) => {
    const o = {};
    p.then(() => (o.doneMs = Date.now() - t0), () => (o.doneMs = Date.now() - t0));
    return o;
  };
  const userP = fakeApi('user', 300);
  const ordersP = fakeApi('orders', 100, true);
  const promosP = fakeApi('promos', 300);
  const userT = track(userP);
  const promosT = track(promosP);
  console.log('bộ mới: orders sẽ REJECT sau 100ms');
  try {
    await Promise.all([userP, ordersP, promosP]);
  } catch (err) {
    console.log(`Promise.all nổ sau ${Date.now() - t0}ms: ${err.message}`);
  }
  // Đợi 2 promise bị bỏ settle để in BẰNG CHỨNG "vẫn chạy ngầm" (không ai nhận kết quả).
  await Promise.allSettled([userP, promosP]);
  console.log('→ 2 kết quả kia bị BỎ (vẫn chạy ngầm:');
  console.log(`  user vẫn xong ${userT.doneMs}ms, promos ${promosT.doneMs}ms)`);

  console.log('');
  console.log('Promise.allSettled cùng bộ:');
  const t1 = Date.now();
  const names = ['user', 'orders', 'promos'];
  const settled = await Promise.allSettled([
    fakeApi('user', 300),
    fakeApi('orders', 100, true),
    fakeApi('promos', 300),
  ]);
  settled.forEach((s, i) => {
    const detail =
      s.status === 'fulfilled'
        ? JSON.stringify(s.value).replaceAll('"', "'")
        : `Error: ${s.reason.message}`;
    console.log(`[${i}] ${s.status.padEnd(9)} ${names[i].padEnd(6)} ${detail}`);
  });
  console.log(`tổng: ${Date.now() - t1}ms — KHÔNG nổ, đủ 3 trạng thái`);
}

console.log('');
console.log('=> tuần tự khi PHỤ THUỘC nhau; all khi độc lập;');
console.log('   allSettled khi cần đủ kết quả');
