// File CJS cố tình chứa top-level await — b6-cjs.cjs require() file này
// để bắt SyntaxError THẬT (CJS parse như function body thường, await ngoài
// async function là lỗi cú pháp ngay lúc parse, chưa chạy dòng nào).
const x = await Promise.resolve('không bao giờ tới được đây');
module.exports = x;
