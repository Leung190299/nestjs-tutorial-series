import * as stylex from '@stylexjs/stylex'

// Lưu ý: file định nghĩa biến (defineVars) BẮT BUỘC có đuôi .stylex.ts
// (hoặc .stylex.js) — đây là quy ước thật của @stylexjs/babel-plugin, không
// tuân theo sẽ lỗi compile "Could not resolve the path to the imported
// file... Please ensure that the theme file has a .stylex.js or .stylex.ts
// extension" khi file khác import `tokens` này.
const DARK = '@media (prefers-color-scheme: dark)'

export const tokens = stylex.defineVars({
  brand: '#ea2845',
  brandDark: '#c81e3a',
  bg: { default: '#fff7f5', [DARK]: '#0f172a' },
  surface: { default: '#ffffff', [DARK]: '#1e293b' },
  text: { default: '#111827', [DARK]: '#f1f5f9' },
  textMuted: { default: '#6b7280', [DARK]: '#94a3b8' },
})
