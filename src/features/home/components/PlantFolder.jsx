import { Body20 } from '@/shared/typography'

const PlantFolder = ({ label }) => {
  return (
    <div className='relative w-[170px] h-[170px] bg-brand-light rounded-[5px] pt-2.5 pl-2.5'>
      <div className='flex gap-2.5'>
        <img src='' alt='' className='w-[70px] h-14 bg-[#D9D9D9] rounded-[5px]' />
        <img src='' alt='' className='w-[70px] h-14 bg-[#D9D9D9] rounded-[5px]' />
      </div>
      <div className='flex gap-2.5 mt-2.5 mb-2.5'>
        <img src='' alt='' className='w-[70px] h-14 bg-[#D9D9D9] rounded-[5px]' />
        <img src='' alt='' className='w-[70px] h-14 bg-[#D9D9D9] rounded-[5px]' />
      </div>
      <Body20>{label}</Body20>
    </div>
  )
}

export default PlantFolder
