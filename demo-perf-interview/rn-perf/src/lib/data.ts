export type Item = { id: string; title: string; subtitle: string; color: string };
const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
export function makeItems(n: number): Item[] {
  return Array.from({ length: n }, (_, i) => ({
    id: String(i),
    title: `Bản ghi #${i}`,
    subtitle: `Khách hàng ${i % 100} · đơn ${1000 + i}`,
    color: COLORS[i % COLORS.length],
  }));
}
