// ESM ĐỒNG BỘ (không top-level await) — để b6-cjs.cjs thử require(esm):
// Node >=22.12 require() được ES module đồng bộ mặc định (docs: "currently
// only supports loading synchronous ES modules"). Chạy thật ghi nấy.
export const hello = 'xin chào từ ESM';
