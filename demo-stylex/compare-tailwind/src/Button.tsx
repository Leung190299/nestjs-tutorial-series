type Props = {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

// Đối chứng bản StyleX (Button.tsx của vietsuper-web): cùng base
// (rounded-xl, font-bold, cursor-pointer, transition màu 150ms), cùng size
// md/lg, cùng 3 variant/màu (brand #ea2845 hover #c81e3a, ghost viền brand,
// danger đỏ đậm #b91c1c hover #7f1d1d) — nhưng viết bằng className Tailwind
// ghép chuỗi thay vì stylex.create.
export function Button({ variant = 'primary', size = 'md', className = '', children }: Props) {
  const base = 'rounded-xl font-bold cursor-pointer transition-colors duration-150'

  const sizeClass = size === 'lg' ? 'px-8 py-[14px] text-lg' : 'px-[22px] py-[10px] text-base'

  const variantClass =
    variant === 'primary'
      ? 'text-white bg-[#ea2845] hover:bg-[#c81e3a]'
      : variant === 'ghost'
        ? 'text-[#ea2845] bg-transparent hover:bg-[#ea2845]/10 border-2 border-solid border-[#ea2845]'
        : 'text-white bg-[#b91c1c] hover:bg-[#7f1d1d]'

  return (
    <button className={`${base} ${sizeClass} ${variantClass} ${className}`.trim()}>
      {children}
    </button>
  )
}
