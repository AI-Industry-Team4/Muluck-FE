import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Body20, H36 } from '@/shared/typography'

import useApi from '@/shared/hooks/useApi'
import { analyzeDiagnosis, saveDiagnosis } from '@/api/diagnosis'
import { getFertilizerProducts } from '@/api/fertilizer'
import { getUserFolders } from '@/api/folder'
import { dataUrlToFile } from '@/shared/utils/image'
import Button from '@/shared/components/Button'
import CompleteModal from '@/shared/components/CompleteModal'

// 결과 섹션별 컴포넌트
import DiseaseResultCertain from '@/features/diagnosis/components/DiseaseResultCertain'
import DiseaseResultInconclusiveLow from '@/features/diagnosis/components/DiseaseResultInconclusiveLow'
import DiseaseResultInconclusiveMid from '@/features/diagnosis/components/DiseaseResultInconclusiveMid'
import DiseaseResultNoDisease from '@/features/diagnosis/components/DiseaseResultNoDisease'
import DiseaseResultSuspicious from '@/features/diagnosis/components/DiseaseResultSuspicious'
import FolderSelectModal from '@/shared/components/FolderSelectModal'

// API 응답 데이터를 FolderSelectModal 형식으로 변환
function transformFoldersData(apiData) {
  if (!apiData?.plantFolders) return []
  return apiData.plantFolders.map((folder) => ({
    id: folder.folderId,
    name: folder.folderName,
  }))
}

// 서버 caseType -> UI caseType 매핑
function mapServerCaseTypeToUi(raw) {
  switch (raw) {
    case 'CERTAIN_DISEASE':
      return 'CERTAIN_DISEASE' // 확실한 질병

    case 'HEALTHY':
      return 'NO_DISEASE' // 건강

    case 'CANDIDATES_3':
      return 'SUSPICIOUS' // 후보 3개 (의심됨)

    case 'CANDIDATES_2_RETAKE':
      return 'INCONCLUSIVE_MID' // 후보 2개, 재촬영 권장

    case 'UNDETERMINED_RETAKE':
      return 'INCONCLUSIVE_LOW' // 판별 불가, 재촬영 권장

    default:
      return 'INCONCLUSIVE_LOW'
  }
}

export default function DiagnosisResultPage() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const previewImage = state?.previewImage || null

  // 진단 API 호출
  const { data: diagnosis, error, loading, execute } = useApi(analyzeDiagnosis)

  // 비료 제품 API 호출
  const {
    data: products,
    error: productsError,
    loading: productsLoading,
    execute: executeProducts,
  } = useApi(getFertilizerProducts)

  // 폴더 목록 API 호출
  const {
    data: foldersData,
    error: foldersError,
    loading: foldersLoading,
    execute: executeFolders,
  } = useApi(getUserFolders)

  // 진단 결과 저장 API 호출
  const {
    data: savedDiagnosis,
    error: saveError,
    loading: saveLoading,
    execute: executeSave,
  } = useApi(saveDiagnosis)

  // 폴더 선택 모달
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)
  const [selectedFolderId, setSelectedFolderId] = useState(null)

  // 저장 완료 모달
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)

  const handleOpenFolderModal = () => {
    setIsFolderModalOpen(true)
    // 모달이 열릴 때 폴더 목록 조회
    executeFolders()
  }
  const handleCloseFolderModal = () => {
    setIsFolderModalOpen(false)
    setSelectedFolderId(null) // 모달 닫을 때 선택 초기화
  }

  const handleConfirmFolder = async (folderId) => {
    if (!diagnosis?.tempDiagnosisId) {
      console.error('진단 결과가 없습니다.')
      return
    }

    try {
      await executeSave(diagnosis.tempDiagnosisId, folderId, 'CAMERA')
      setIsFolderModalOpen(false)
      setIsCompleteModalOpen(true)
      setSelectedFolderId(null) // 저장 후 선택 초기화
    } catch (error) {
      console.error('진단 결과 저장 실패:', error)
      // 에러는 useApi에서 관리되므로 여기서는 로그만 출력
      // 저장 실패 시에도 모달은 유지 (사용자가 다시 시도할 수 있도록)
    }
  }

  const handleCloseCompleteModal = () => {
    setIsCompleteModalOpen(false)
  }

  // 페이지 진입 시 진단 요청 및 비료 제품 조회
  useEffect(() => {
    if (!previewImage) return
    const file = dataUrlToFile(previewImage, 'capture.jpg')
    execute(file)
    executeProducts()
  }, [previewImage, execute, executeProducts])

  // 최종 이미지 URL (진단 이미지 > 프리뷰 이미지 > null)
  const imageUrl = diagnosis?.imageUrl ?? previewImage ?? null

  const rawCaseType = diagnosis?.caseType
  const caseType = mapServerCaseTypeToUi(rawCaseType)

  // 로딩 상태일 때 전체 로딩 UI
  if (loading) {
    return (

      <div className='pt-[30px] pb-[52px] flex flex-col h-full'>
        <H36 className='p-[15px] text-brand'>진단 결과</H36>

        <div className='flex-1 flex items-center justify-center'>
          <p className='text-gray-200 text-body-20'>
            식물 상태를 분석 중입니다… 잠시만 기다려 주세요 🌱
          </p>
        </div>
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (

      <div className='pt-[30px] pb-[52px] flex flex-col h-full'>
        <H36 className='p-[15px] text-brand'>진단 결과</H36>

        <div className='flex-1 flex flex-col items-center justify-center gap-4'>
          <p className='text-red-500 text-body-20'>
            {error.message || '진단 중 오류가 발생했습니다.'}
          </p>
          <Button label='다시 촬영하기' size='small' onClick={() => navigate('/camera')} />
        </div>
      </div>
    )
  }

  return (
    <div className='pt-[30px] pb-[52px] flex flex-col h-full'>
      {/* 헤더 */}
      <div className='flex items-center justify-between p-[15px]'>
        <H36 className='text-brand'>진단 결과</H36>
        <Button label='홈으로' size='small' variant='secondary' onClick={() => navigate('/')} />
      </div>

      {/* 사진 영역 */}
      <div className='relative h-[200px] overflow-hidden bg-gray-200 flex items-center justify-center'>
        {imageUrl ? (
          <img src={imageUrl} alt='진단 사진' className='w-full h-full object-cover' />
        ) : (
          <span className='text-[#000] text-body-20'>진단 사진을 불러올 수 없습니다.</span>
        )}
      </div>

      {/* 결과 내용 영역 */}
      <div className='mt-[18px] px-[20px] flex-1 overflow-y-auto'>
        {renderResultSection(caseType, diagnosis, handleOpenFolderModal, products, diagnosis?.crop)}
      </div>

      {/* 폴더 선택 모달 */}
      <FolderSelectModal
        emptyTitle='폴더를 선택해 주세요'
        isOpen={isFolderModalOpen}
        onClose={handleCloseFolderModal}
        folders={transformFoldersData(foldersData)}
        selectedFolderId={selectedFolderId}
        onSelectFolder={setSelectedFolderId}
        onConfirm={handleConfirmFolder}
        isLoading={saveLoading}
      />

      {/* 저장 완료 모달 */}
      <CompleteModal
        isOpen={isCompleteModalOpen}
        onClose={handleCloseCompleteModal}
        title='진단 기록이 저장되었습니다!'
      />
    </div>
  )
}

// 케이스별 섹션 렌더 함수
function renderResultSection(caseType, diagnosis, onSaveClick, products, crop) {
  switch (caseType) {
    case 'CERTAIN_DISEASE':
      return (
        <DiseaseResultCertain
          onSaveClick={onSaveClick}
          primaryDisease={diagnosis?.primaryDisease}
          products={products}
          crop={crop}
        />
      )

    case 'SUSPICIOUS':
      return (
        <DiseaseResultSuspicious
          onSaveClick={onSaveClick}
          candidates={diagnosis?.candidates || []}
          primaryDisease={diagnosis?.primaryDisease}
          products={products}
          crop={crop}
        />
      )

    case 'NO_DISEASE':
      return (
        <DiseaseResultNoDisease
          onSaveClick={onSaveClick}
          careTips={diagnosis?.careTips || []}
          products={products}
          crop={crop}
        />
      )

    case 'INCONCLUSIVE_LOW':
      return <DiseaseResultInconclusiveLow />

    case 'INCONCLUSIVE_MID':
      return <DiseaseResultInconclusiveMid candidates={diagnosis?.candidates || []} crop={crop} />

    default:
      return null
  }
}
