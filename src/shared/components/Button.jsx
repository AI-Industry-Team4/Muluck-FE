import { Body20 } from '@/shared/typography'

export default function Button({
  label,
  onClick,
  size = 'small', // 'small' | 'large'
  variant = 'primary', // 'primary' | 'secondary'
  className = '',
  disabled = false,
}) {
  const sizeClass = size === 'large' ? 'w-[170px] h-[50px]' : 'w-[150px] h-[50px]'

  const styleClass = variant === 'primary' ? 'bg-brand text-white' : 'bg-brand-light text-gray-200'

  // 비활성화일 때 적용될 공통 스타일
  const disabledClass = disabled ? 'cursor-not-allowed opacity-50' : ''

  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center rounded-[30px] ${sizeClass} ${styleClass} ${className}`}
    >
      <Body20 className=''>{label}</Body20>
    </button>
  )
}
