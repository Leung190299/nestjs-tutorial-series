// Seed dữ liệu dùng chung cho cả 12 câu: 5.000 khách + 500.000 đơn.
// Sinh dữ liệu bằng generate_series PHÍA SQL (không insert từng dòng từ Node).
// KHÔNG tạo index nào ngoài PRIMARY KEY — câu D1/P6 sẽ tự tạo index để so sánh.
import { pool, q, label } from './db.mjs';

const N_CUSTOMERS = 5_000;
const N_ORDERS = 500_000;

async function main() {
  const t0 = performance.now();

  await q('DROP TABLE IF EXISTS orders');
  await q('DROP TABLE IF EXISTS customers');

  await q(`
    CREATE TABLE customers (
      id   serial PRIMARY KEY,
      name text,
      city text
    )
  `);

  await q(`
    CREATE TABLE orders (
      id          serial PRIMARY KEY,
      customer_id int REFERENCES customers(id),
      total       int,
      status      text,
      created_at  timestamptz
    )
  `);

  await q(
    `
    INSERT INTO customers (id, name, city)
    SELECT g,
           'Khach ' || g,
           (ARRAY['Ha Noi','Da Nang','Ho Chi Minh','Can Tho','Hai Phong'])[(random()*4)::int + 1]
    FROM generate_series(1, $1) g
  `,
    [N_CUSTOMERS],
  );

  await q(
    `
    INSERT INTO orders (id, customer_id, total, status, created_at)
    SELECT g,
           (random() * ($2 - 1))::int + 1,
           (random() * 5000000)::int,
           (ARRAY['new','paid','shipped','done'])[(random()*3)::int + 1],
           now() - (random() * 365)::int * interval '1 day'
    FROM generate_series(1, $1) g
  `,
    [N_ORDERS, N_CUSTOMERS],
  );

  // serial giữ sequence riêng: đặt lại để INSERT sau này (P3) không đụng id đã dùng.
  await q("SELECT setval('customers_id_seq', (SELECT max(id) FROM customers))");
  await q("SELECT setval('orders_id_seq', (SELECT max(id) FROM orders))");

  await q('ANALYZE');

  const { rows: c } = await q('SELECT count(*)::int AS n FROM customers');
  const { rows: o } = await q('SELECT count(*)::int AS n FROM orders');
  const ms = Math.round(performance.now() - t0);

  label(`seed xong: ${c[0].n} khách, ${o[0].n} đơn, mất ${ms} ms`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
