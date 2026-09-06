type Props = {
  emoji: string
  name: string
  desc: string
}

// Đối chứng bản StyleX (ServiceGrid.tsx card của vietsuper-web): nền trắng,
// bo góc 20px, hover nhấc lên (-translate-y) + đổ bóng đậm hơn, cùng bảng
// màu text (#111827) / textMuted (#6b7280) — viết bằng className Tailwind.
export function ServiceCard({ emoji, name, desc }: Props) {
  return (
    <article
      className="bg-white rounded-[20px] p-7 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(234,40,69,0.18)]"
    >
      <div className="text-[40px]">{emoji}</div>
      <div className="text-[22px] font-extrabold mt-3 text-[#111827]">{name}</div>
      <div className="text-base mt-1.5 text-[#6b7280]">{desc}</div>
    </article>
  )
}
