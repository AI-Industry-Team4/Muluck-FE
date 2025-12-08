import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Body20 } from '@/shared/typography'
import Webcam from 'react-webcam'
import Button from '@/shared/components/Button'
import photo from '@/assets/icons/photo.png'

export default function CameraPage() {
  const webcamRef = useRef(null)
  const navigate = useNavigate()

  const onCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    navigate('/camera/preview', { state: { image: imageSrc } })
  }

  return (
    <div className='flex flex-col'>
      <button className='text-start cursor-pointer' onClick={() => navigate('/')}>
        <Body20 className='mt-[40px] ml-[21px] mb-4 text-gray-200'>닫기</Body20>
      </button>

      {/* 카메라 영역 */}
      <div className='flex-1 flex items-center justify-center'>
        <div className='w-full h-[560px] aspect-3/4 bg-black overflow-hidden'>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat='image/jpeg'
            className='w-full h-full object-cover'
          />
        </div>
      </div>

      {/* 촬영 버튼 */}
      <div className='flex mt-[63px] ml-[121px]'>
        <Button size='small' label='촬영하기' onClick={onCapture} />
        <img src={photo} alt='photo' className='ml-[39px] cursor-pointer' />
      </div>
    </div>
  )
}
