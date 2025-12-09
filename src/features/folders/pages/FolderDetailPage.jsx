import { useEffect, useState } from 'react'
import DiagnosisRecordCard from '../components/DiagnosisRecordCard'
import Search from '@/shared/components/Search'
import { Body20, H36 } from '@/shared/typography'
import camera from '@/assets/icons/camera.svg'
import { useNavigate, useParams } from 'react-router-dom'
import useApi from '@/shared/hooks/useApi'
import { getFoldersDetail } from '@/api/folderDetail'
import { getUserFolders } from '@/api/folder'

function transformFoldersData(apiData) {
  if (!apiData?.plantFolders) return []
  return apiData.plantFolders.map((folder) => ({
    id: folder.folderId,
    name: folder.folderName,
  }))
}

export default function FolderDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, error, loading, execute } = useApi(getFoldersDetail)
  const { data: folderData, execute: fetchUserFolders } = useApi(getUserFolders)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    execute({ folderId: id })
  }, [id])

  useEffect(() => {
    fetchUserFolders()
  }, [])

  if (loading) return <p>불러오는 중…</p>
  if (error) return <p>{error.message}</p>

  const folderName = data?.folderName ?? ''
  const diagnoses = data?.diagnoses ?? []

  const filteredDiagnoses = diagnoses.filter((item) =>
    (item.diseaseName ?? '건강').toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className='flex flex-col'>
      {/* 헤더 */}
      <div className='flex items-center justify-between mt-10 ml-[21px] mb-[18px]'>
        <H36 className='text-brand text-start'>{folderName} 진단 기록</H36>
        <button className='cursor-pointer mr-[21px]' onClick={() => navigate('/')}>
          <Body20 className='text-gray-200'>홈으로</Body20>
        </button>
      </div>

      {/* 검색창 */}
      <div className='flex justify-center'>
        <Search
          label={'진단명으로 검색하기'}
          onChange={(value) => setSearchTerm(value)}
          onClick={() => {}}
          size='large'
        />
      </div>

      {/* 질병 카드 */}
      <div className='flex flex-col items-center mt-4 space-y-4 px-5 mb-50'>
        {filteredDiagnoses.map((item) => (
          <DiagnosisRecordCard
            key={item.diagnosisId}
            folderName={folderName}
            diagnosisId={item.diagnosisId}
            img={item.imageUrl}
            title={item.diseaseName ?? '건강'}
            description={item.diseaseDescription ?? '해당 식물은 건강합니다.'}
            result={
              item.cause
                ? item.cause
                    .split('\n')
                    .map((c, index) => ({ label: `원인 분석${index + 1}`, value: c }))
                : []
            }
            date={item.diagnosisDate}
            percent={item.confidenceScore.replace('%', '')}
            folders={transformFoldersData(folderData)}
            selectedFolderId={id}
            folderId={id}
            onConfirmMove={() => {}}
          />
        ))}
      </div>

      {/* 카메라 버튼 */}
      <img
        src={camera}
        alt='camera'
        className='fixed bottom-15 left-1/2 -translate-x-1/2 w-20 h-20 cursor-pointer'
        onClick={() => navigate('/camera/guide')}
      />
    </div>
  )
}
