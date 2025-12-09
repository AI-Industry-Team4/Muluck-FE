import search from '@/assets/icons/Search.svg'

const Search = ({ label, onChange, onClick = () => {}, size = 'small' }) => {
  const sizeStyles = {
    small: 'w-[80%]',
    large: 'w-[90%]', //352px
  }

  return (
    <div
      className={`flex items-center justify-between h-[45px] px-3 border border-brand rounded-[10px] ${sizeStyles[size]}`}
    >
      <input
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
        className='max-w-[250px] flex-1 outline-none text-m'
      />

      <img src={search} onClick={onClick} className='w-6 h-6 cursor-pointer shrink-0' />
    </div>
  )
}

export default Search
