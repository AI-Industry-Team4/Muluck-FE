import search from '@/assets/icons/Search.svg'

const Search = ({
  label,
  onClick,
  size = 'small', // 'small' | 'large'
}) => {
  const sizeClass = size === 'large' ? 'w-[352pxpx]' : 'w-[298px]'
  return (
    <div
      className={`flex pl-[13px] items-center h-[45px] ${sizeClass} border border-brand rounded-[10px]`}
    >
      <input placeholder={label} className='w-[250px] outline-none'></input>
      <img src={search} onClick={onClick} className='w-6 h-6 cursor-pointer' />
    </div>
  )
}

export default Search
