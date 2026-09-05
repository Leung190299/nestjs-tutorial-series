import * as stylex from '@stylexjs/stylex'
import { tokens } from '../tokens.stylex'

const services = [
  { emoji: '🍜', name: 'Đồ ăn', desc: 'Giao nhanh 30 phút' },
  { emoji: '👛', name: 'Ví điện tử', desc: 'Thanh toán một chạm' },
  { emoji: '🎬', name: 'Xem phim', desc: 'Đặt vé không xếp hàng' },
  { emoji: '🛵', name: 'Đặt xe', desc: 'Xe đến trong 5 phút' },
  { emoji: '📰', name: 'Tin tức', desc: 'Đọc gì sáng nay?' },
  { emoji: '📱', name: 'Nạp thẻ', desc: 'Mọi nhà mạng' },
]

const styles = stylex.create({
  section: { padding: '24px 48px 96px', maxWidth: 1080, margin: '0 auto' },
  grid: {
    display: 'grid',
    gridTemplateColumns: { default: 'repeat(3, 1fr)', '@media (max-width: 720px)': '1fr' },
    gap: 24,
  },
  card: {
    backgroundColor: tokens.surface,
    borderRadius: 20,
    padding: 28,
    boxShadow: { default: '0 1px 4px rgba(0,0,0,0.08)', ':hover': '0 12px 32px rgba(234,40,69,0.18)' },
    transform: { default: 'translateY(0)', ':hover': 'translateY(-4px)' },
    transitionProperty: 'transform, box-shadow',
    transitionDuration: '200ms',
  },
  emoji: { fontSize: 40 },
  name: { fontSize: 22, fontWeight: 800, marginTop: 12, color: tokens.text },
  desc: { fontSize: 16, color: tokens.textMuted, marginTop: 6 },
})

export function ServiceGrid() {
  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.grid)}>
        {services.map((s) => (
          <article key={s.name} {...stylex.props(styles.card)}>
            <div {...stylex.props(styles.emoji)}>{s.emoji}</div>
            <div {...stylex.props(styles.name)}>{s.name}</div>
            <div {...stylex.props(styles.desc)}>{s.desc}</div>
          </article>
        ))}
      </div>
    </section>
  )
}
