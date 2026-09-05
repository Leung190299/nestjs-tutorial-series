import * as stylex from '@stylexjs/stylex'
import { tokens } from '../tokens.stylex'

const styles = stylex.create({
  hero: {
    padding: { default: '96px 48px', '@media (max-width: 720px)': '56px 20px' },
    textAlign: 'center',
  },
  title: {
    fontSize: { default: 56, '@media (max-width: 720px)': 36 },
    fontWeight: 900,
    margin: 0,
    color: tokens.text,
  },
  brand: { color: tokens.brand },
  tagline: { fontSize: 20, color: tokens.textMuted, marginTop: 16 },
  cta: {
    display: 'inline-block',
    marginTop: 32,
    padding: '14px 36px',
    borderRadius: 999,
    fontSize: 18,
    fontWeight: 700,
    color: 'white',
    backgroundColor: { default: tokens.brand, ':hover': tokens.brandDark },
    cursor: 'pointer',
    borderStyle: 'none',
  },
})

export function Hero() {
  return (
    <header {...stylex.props(styles.hero)}>
      <h1 {...stylex.props(styles.title)}>
        Việt<span {...stylex.props(styles.brand)}>Super</span> 🇻🇳
      </h1>
      <p {...stylex.props(styles.tagline)}>Một app, mọi dịch vụ — giờ có mặt trên web.</p>
      <button {...stylex.props(styles.cta)}>Dùng thử miễn phí</button>
    </header>
  )
}
