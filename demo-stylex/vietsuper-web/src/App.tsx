import * as stylex from '@stylexjs/stylex'
import { Hero } from './components/Hero'
import { ServiceGrid } from './components/ServiceGrid'
import { Button } from './components/Button'
import { MergeDemo } from './components/MergeDemo'
import { Pricing } from './components/Pricing'
import { tokens } from './tokens.stylex'
import { tet } from './themes'

const styles = stylex.create({
  page: {
    minHeight: '100vh',
    backgroundColor: tokens.bg,
    color: tokens.text,
    fontFamily: 'system-ui, sans-serif',
  },
  demoSection: { padding: '24px 48px', maxWidth: 1080, margin: '0 auto' },
  heading: { fontSize: 24, fontWeight: 800, marginBottom: 20 },
  buttonRow: { display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' },
})

export default function App() {
  const themeParam = new URLSearchParams(window.location.search).get('theme')
  return (
    <div {...stylex.props(themeParam === 'tet' && tet, styles.page)}>
      <Hero />
      <ServiceGrid />
      <section {...stylex.props(styles.demoSection)} id="buttons">
        <h2 {...stylex.props(styles.heading)}>Bộ nút</h2>
        <div {...stylex.props(styles.buttonRow)}>
          <Button variant="primary">Primary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>
      <section {...stylex.props(styles.demoSection)} id="merge-demo">
        <h2 {...stylex.props(styles.heading)}>Luật last-wins</h2>
        <MergeDemo />
      </section>
      <div {...stylex.props(styles.demoSection)} id="pricing">
        <h2 {...stylex.props(styles.heading)}>Bảng giá</h2>
        <Pricing />
      </div>
    </div>
  )
}
