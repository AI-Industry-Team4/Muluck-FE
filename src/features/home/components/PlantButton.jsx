import { Body20 } from '@/shared/typography'

const PlantButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='cursor-pointer w-[85px] h-[35px] flex flex-col border border-white shadow-lg text-center justify-center bg-gray-100/50 rounded-[5px]'
    >
      <Body20 className='text-white'>{label}</Body20>
    </button>
  )
}

export default PlantButton
