import { Body20 } from '@/shared/typography'

const PlantFolder = ({ label }) => {
  return (
    <div className='relative w-[170px] h-[170px] bg-brand-light rounded-[5px]'>
      <div className='flex'>
        <img />
        <img />
      </div>
      <div className='flex'>
        <img />
        <img />
      </div>
      <Body20>{label}</Body20>
    </div>
  )
}

export default PlantFolder
