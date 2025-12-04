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
import FolderSelectModal from '@/shared/components/FolderSelectModal'

// TODO: 추후 서버 응답으로 교체
const mockImageUrls = [
  'https://picsum.photos/600/400?random=1',
  'https://picsum.photos/600/400?random=2',
  'https://picsum.photos/600/400?random=3',
]

// TODO: 추후 서버에서 불러오기
const mockFolders = [
  { id: 1, name: '옥수수' },
  { id: 2, name: '포도' },
  { id: 3, name: '사과' },
  { id: 4, name: '토마토' },
]

export default function DiagnosisResultPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const imageUrls = mockImageUrls

  const hasImages = imageUrls.length > 0
  const hasMultiple = imageUrls.length > 1

  // 폴더 선택 모달
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)
  const [selectedFolderId, setSelectedFolderId] = useState(null)

  const handleOpenFolderModal = () => setIsFolderModalOpen(true)
  const handleCloseFolderModal = () => setIsFolderModalOpen(false)

  const handleConfirmFolder = (folderId) => {
    console.log('저장할 폴더:', folderId)
    setIsFolderModalOpen(false)

    // TODO: 실제 진단 결과를 해당 폴더로 저장 API 호출
  }

  const handlePrev = () => {
    if (!hasMultiple) return
    setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)
  }

  const handleNext = () => {
    if (!hasMultiple) return
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length)
  }

  // 진단 케이스 (나중에 API 응답으로 교체)
  const caseType = 'INCONCLUSIVE_LOW'


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
        {renderResultSection(caseType, handleOpenFolderModal)}
      </div>

      {/* 폴더 선택 모달 */}
      <FolderSelectModal
        emptyTitle='폴더를 선택해 주세요'
        isOpen={isFolderModalOpen}
        onClose={handleCloseFolderModal}
        folders={mockFolders}
        selectedFolderId={selectedFolderId}
        onSelectFolder={setSelectedFolderId}
        onConfirm={handleConfirmFolder}
      />
    </div>
  )
}

// 케이스별 섹션 렌더 함수
function renderResultSection(caseType, onSaveClick) {
  switch (caseType) {
    case 'CERTAIN_DISEASE':
      return <DiseaseResultCertain onSaveClick={onSaveClick} />

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
