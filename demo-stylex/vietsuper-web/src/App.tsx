import * as stylex from '@stylexjs/stylex'
import { Hero } from './components/Hero'
import { ServiceGrid } from './components/ServiceGrid'
import { tokens } from './tokens.stylex'

const styles = stylex.create({
  page: {
    minHeight: '100vh',
    backgroundColor: tokens.bg,
    color: tokens.text,
    fontFamily: 'system-ui, sans-serif',
  },
})

export default function App() {
  return (
    <div {...stylex.props(styles.page)}>
      <Hero />
      <ServiceGrid />
    </div>
  )
}
