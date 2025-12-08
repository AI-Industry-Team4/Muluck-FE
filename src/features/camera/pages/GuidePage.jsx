import { useNavigate } from 'react-router-dom'
import { Body20 } from '@/shared/typography'
import plant from '@/assets/icons/guide_plant.png'
import guideline from '@/assets/icons/guideline.png'
import photo from '@/assets/icons/photo.png'
import Button from '@/shared/components/Button'

export default function GuidePage() {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col'>
      <button className='text-start cursor-pointer' onClick={() => navigate('/')}>
        <Body20 className='mt-[40px] ml-[21px] mb-4 text-gray-200'>닫기</Body20>
      </button>

      {/* 콘텐츠 영역 */}
      <div className='relative h-[560px]'>
        <img src={plant} alt='guide_plant' className='absolute' />
        <img src={guideline} alt='guideline' className='absolute z-10 mt-[123px] ml-[23px]' />
        <div className='w-50 h-25 rounded-[10px] mt-[390px] ml-[175px] absolute z-10 flex flex-col justify-center text-center bg-black/40 gap-2 border border-white'>
          <Body20 className='text-white'>병충해가 의심되는 잎을</Body20>
          <div className='flex justify-center gap-1'>
            <Body20 className='text-red'>확대해서</Body20>
            <Body20 className='text-white'>촬영해주세요!</Body20>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className='flex mt-[63px] ml-[121px]'>
        <Button size='small' label='촬영하기' onClick={() => navigate('/camera')} />
        <img src={photo} alt='photo' className='ml-[39px] cursor-pointer' />
      </div>
    </div>
  )
}
