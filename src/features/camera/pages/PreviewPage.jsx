import { useLocation, useNavigate } from 'react-router-dom'
import { Body20 } from '@/shared/typography'
import Button from '@/shared/components/Button'

export default function PreviewPage() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const image = state?.image

  const handleAnalyze = () => {
    if (!image) return
    navigate('/diagnosis/result', {
      state: { previewImage: image },
    })
  }

  return (
    <div className='flex flex-col'>
      <button className='text-start cursor-pointer' onClick={() => navigate(-1)}>
        <Body20 className='mt-10 ml-[21px] mb-4 text-gray-200'>이전</Body20>
      </button>

      {/* 이미지 미리보기 */}
      <div className='flex h-[70vh]'>
        {image ? (
          <img src={image} alt='촬영 이미지' className='w-full h-[560px] object-cover' />
        ) : (
          <p className='text-center text-gray-500'>이미지가 없습니다.</p>
        )}
      </div>

      {/* 분석 버튼 */}
      <div className='flex flex-col w-full justify-center items-center gap-5 z-10'>
        <Button
          size='large'
          variant='secondary'
          label='사진 다시 불러오기'
          onClick={() => navigate('/camera')}
        />
        <Button size='large' label='식물 상태 분석하기' onClick={handleAnalyze} />
      </div>
    </div>
  )
}
