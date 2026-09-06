// @stylexjs/unplugin cấp virtual module cho dev-mode HMR (đọc README
// @stylexjs/unplugin: "virtual:stylex:runtime" / "virtual:stylex:css-only").
// Đây không phải package thật nên cần khai ambient module để TypeScript
// không báo lỗi TS2307 khi `import('virtual:stylex:runtime')` trong main.tsx.
declare module 'virtual:stylex:runtime' {}
declare module 'virtual:stylex:css-only' {}
