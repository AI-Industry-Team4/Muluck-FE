import { H36 } from '@/shared/typography'
import { useState } from 'react'

import arrowRight from '@/assets/icons/arrowBtn_right.png'
import arrowLeft from '@/assets/icons/arrowBtn_left.png'

// 결과 섹션별 컴포넌트
import DiseaseResultCertain from '@/features/diagnosis/components/DiseaseResultCertain'
import DiseaseResultInconclusiveLow from '@/features/diagnosis/components/DiseaseResultInconclusiveLow'
import DiseaseResultInconclusiveMid from '@/features/diagnosis/components/DiseaseResultInconclusiveMid'
import DiseaseResultNoDisease from '@/features/diagnosis/components/DiseaseResultNoDisease'
import DiseaseResultSuspicious from '@/features/diagnosis/components/DiseaseResultSuspicious'

// TODO: 추후 서버 응답으로 교체
const mockImageUrls = [
  'https://picsum.photos/600/400?random=1',
  'https://picsum.photos/600/400?random=2',
  'https://picsum.photos/600/400?random=3',
]

export default function DiagnosisResultPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const imageUrls = mockImageUrls

  const hasImages = imageUrls.length > 0
  const hasMultiple = imageUrls.length > 1

  const handlePrev = () => {
    if (!hasMultiple) return
    setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)
  }

  const handleNext = () => {
    if (!hasMultiple) return
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length)
  }

  // 진단 케이스 (나중에 API 응답으로 교체)
  const caseType = 'SUSPICIOUS'

  return (
    <div className='py-[52px] flex flex-col h-full'>
      {/* 헤더 */}
      <H36 className='p-[15px] text-brand'>진단 결과</H36>

      {/* 사진 영역 */}
      <div className='relative h-[200px] overflow-hidden bg-gray-200 flex items-center justify-center'>
        {hasImages ? (
          <img
            src={imageUrls[currentIndex]}
            alt={`진단 사진 ${currentIndex + 1}`}
            className='w-full h-full object-cover'
          />
        ) : (
          <span className='text-[#000] text-body-20'>진단 사진을 불러올 수 없습니다.</span>
        )}

        {/* 좌/우 이동 버튼 */}
        {hasMultiple && (
          <>
            <button
              type='button'
              onClick={handlePrev}
              className='absolute left-3 top-1/2 -translate-y-1/2'
            >
              <img src={arrowLeft} alt='이전 사진' className='w-[35px] h-[35px]' />
            </button>
            <button
              type='button'
              onClick={handleNext}
              className='absolute right-3 top-1/2 -translate-y-1/2'
            >
              <img src={arrowRight} alt='다음 사진' className='w-[35px] h-[35px]' />
            </button>
          </>
        )}
      </div>

      {/* 결과 내용 영역 */}
      <div className='mt-[18px] px-[20px] flex-1 overflow-y-auto'>
        {renderResultSection(caseType)}
      </div>
    </div>
  )
}

// 케이스별 섹션 렌더 함수
function renderResultSection(caseType) {
  switch (caseType) {
    case 'CERTAIN_DISEASE':
      return <DiseaseResultCertain />

    case 'SUSPICIOUS':
      return <DiseaseResultSuspicious />

    case 'NO_DISEASE':
      return <DiseaseResultNoDisease />

    case 'INCONCLUSIVE_LOW':
      return <DiseaseResultInconclusiveLow />

    case 'INCONCLUSIVE_MID':
      return <DiseaseResultInconclusiveMid />

    default:
      return null
  }
}
