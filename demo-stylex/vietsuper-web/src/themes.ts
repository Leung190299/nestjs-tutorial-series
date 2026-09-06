import * as stylex from '@stylexjs/stylex'
import { tokens } from './tokens.stylex'

// Theme Tết: nền vàng kem, brand đỏ gạch — không override text/textMuted,
// fallback về giá trị mặc định trong defineVars (điểm dạy ep43).
export const tet = stylex.createTheme(tokens, {
  bg: '#fff8e1',
  surface: '#fffdf5',
  brand: '#d4380d',
  brandDark: '#ad2102',
})
