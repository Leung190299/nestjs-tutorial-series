import { Button } from './Button'
import { ServiceCard } from './ServiceCard'

const services = [
  { emoji: '🍜', name: 'Đồ ăn', desc: 'Giao nhanh 30 phút' },
  { emoji: '👛', name: 'Ví điện tử', desc: 'Thanh toán một chạm' },
]

function App() {
  return (
    <div className="min-h-screen bg-[#fff7f5] font-sans text-[#111827]">
      <div className="max-w-[1080px] mx-auto px-12 py-6">
        <h1 className="text-2xl font-extrabold mb-5">Bản Tailwind — đối chứng</h1>

        <section id="buttons">
          <div className="flex gap-4 items-center flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </section>

        <section className="mt-10">
          <div className="grid grid-cols-2 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.name} emoji={s.emoji} name={s.name} desc={s.desc} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
