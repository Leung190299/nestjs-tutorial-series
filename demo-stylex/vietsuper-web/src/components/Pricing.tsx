import * as stylex from '@stylexjs/stylex';
import {tokens} from '../tokens.stylex';
import {Button} from './Button';

const plans = [
  {name: 'Miễn phí', price: '0đ', unit: '/tháng', desc: 'Dùng thử các dịch vụ cơ bản'},
  {name: 'Plus', price: '49.000đ', unit: '/tháng', desc: 'Ưu tiên hỗ trợ, không quảng cáo', featured: true},
  {name: 'Doanh nghiệp', price: '199.000đ', unit: '/tháng', desc: 'Đa tài khoản, báo cáo chi tiết'},
];

const styles = stylex.create({
  section: {padding: '24px 48px 96px', maxWidth: 1080, margin: '0 auto'},
  grid: {
    display: 'grid',
    gridTemplateColumns: {default: 'repeat(3, 1fr)', '@media (max-width: 720px)': '1fr'},
    gap: 24,
  },
  card: {
    position: 'relative',
    backgroundColor: tokens.surface,
    borderRadius: 20,
    padding: 28,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'transparent',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  featured: {
    borderColor: tokens.brand,
    boxShadow: '0 12px 32px rgba(234,40,69,0.18)',
  },
  badge: {
    position: 'absolute',
    top: -14,
    left: 24,
    backgroundColor: tokens.brand,
    color: 'white',
    fontSize: 13,
    fontWeight: 700,
    padding: '4px 14px',
    borderRadius: 999,
  },
  name: {fontSize: 20, fontWeight: 800, color: tokens.text},
  price: {fontSize: 36, fontWeight: 900, color: tokens.text, marginTop: 12},
  unit: {fontSize: 15, fontWeight: 400, color: tokens.textMuted},
  desc: {fontSize: 15, color: tokens.textMuted, marginTop: 8, marginBottom: 24},
  // Style ngoài truyền vào Button qua prop `style` (ep42 — chất liệu cross-file):
  fullWidth: {width: '100%'},
});

export function Pricing() {
  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.grid)}>
        {plans.map((p) => (
          <article key={p.name} {...stylex.props(styles.card, p.featured && styles.featured)}>
            {p.featured && <span {...stylex.props(styles.badge)}>Phổ biến</span>}
            <div {...stylex.props(styles.name)}>{p.name}</div>
            <div {...stylex.props(styles.price)}>
              {p.price} <span {...stylex.props(styles.unit)}>{p.unit}</span>
            </div>
            <div {...stylex.props(styles.desc)}>{p.desc}</div>
            {p.featured ? (
              <Button variant="primary" size="lg" style={styles.fullWidth}>
                Chọn {p.name}
              </Button>
            ) : (
              <Button variant="ghost" size="md">
                Chọn {p.name}
              </Button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
