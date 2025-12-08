import { Body20 } from '@/shared/typography'
import { useNavigate } from 'react-router-dom'

export default function PlantFolder({ label, images = [], folderId }) {
  const navigate = useNavigate()
  while (images.length < 4) images.push(null)

  const handleClick = () => {
    navigate(`/folder/${folderId}`)
  }

  return (
    <div
      onClick={handleClick}
      className='relative w-[170px] h-[170px] bg-brand-light rounded-[5px] p-2.5'
    >
      {/* 이미지 2x2 */}
      <div className='grid grid-cols-2 gap-2.5'>
        {images.map((img, idx) =>
          img ? (
            <img key={idx} src={img} alt='' className='w-[70px] h-14 rounded-[5px] object-cover' />
          ) : (
            <div key={idx} className='w-[70px] h-14 rounded-[5px] bg-[#D9D9D9]' />
          ),
        )}
      </div>

      {/* 폴더명 */}
      <Body20 className='mt-2'>{label}</Body20>
    </div>
  )
}
