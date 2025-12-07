import search from '@/assets/icons/Search.svg'

const Search = ({ label, onClick, size = 'small' }) => {
  const sizeStyles = {
    small: 'w-[298px]',
    large: 'w-[352px]',
  }

  return (
    <div
      className={`flex items-center h-[45px] px-3 border border-brand rounded-[10px] ${sizeStyles[size]}`}
    >
      <input placeholder={label} className='flex-1 outline-none text-m' />

      <img src={search} onClick={onClick} className='w-6 h-6 cursor-pointer' />
    </div>
  )
}

export default Search
