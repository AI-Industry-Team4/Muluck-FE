import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Body20 } from '@/shared/typography'
import Webcam from 'react-webcam'
import Button from '@/shared/components/Button'
import PhotoUploadButton from '../components/PhotoUploadButton'

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
        <Body20 className='mt-10 ml-[21px] mb-4 text-gray-200'>닫기</Body20>
      </button>

      {/* 카메라 영역 */}
      <div className='flex-1 flex items-center justify-center'>
        <div className='w-full h-[75vh] aspect-3/4 bg-white overflow-hidden'>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat='image/jpeg'
            className='w-full h-[560px] object-cover'
            videoConstraints={{
              facingMode: 'environment',
            }}
            forceScreenshotSourceSize={true}
          />
        </div>
      </div>

      {/* 촬영 버튼 */}
      <div className='relative w-full flex justify-center z-10'>
        <Button size='small' label='촬영하기' onClick={onCapture} />
        <PhotoUploadButton
          className='absolute left-1/2 translate-x-[100px] cursor-pointer'
          nextPage='/camera/preview'
        />
      </div>
    </div>
  )
}
