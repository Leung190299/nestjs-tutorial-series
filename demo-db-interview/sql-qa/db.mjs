// Helper dùng chung cho mọi script D1–D6.
// Kết nối tới container dbqa-pg (docker-compose -p dbqa) ở cổng 5433 — KHÔNG phải 5432.
import pg from 'pg';

export const CONNECTION_STRING = 'postgres://dbqa:dbqa@localhost:5433/dbqa';

export const pool = new pg.Pool({ connectionString: CONNECTION_STRING });

/**
 * Chạy 1 câu SQL và đo thời gian thật bằng performance.now().
 * @param {string} sql
 * @param {any[]} [params]
 * @returns {Promise<{rows: any[], ms: number}>}
 */
export async function q(sql, params = []) {
  const t0 = performance.now();
  const res = await pool.query(sql, params);
  const ms = performance.now() - t0;
  return { rows: res.rows, ms };
}

/** In nhãn khối bằng chứng: `== text ==` */
export function label(text) {
  console.log(`== ${text} ==`);
}
