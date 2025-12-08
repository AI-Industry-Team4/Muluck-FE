import DiagnosisRecordCard from '../components/DiagnosisRecordCard'
import Search from '@/shared/components/Search'
import { H36 } from '@/shared/typography'
import camera from '@/assets/icons/camera.svg'
import { useNavigate } from 'react-router-dom'

export default function FolderDetailPage() {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col'>
      {/* 제목 */}
      <div className='mt-[40px] ml-[21px] mb-[18px]'>
        <H36 className='text-brand text-start'>{} 진단 기록</H36>
      </div>

      {/* 검색창 */}
      <div className='flex ml-[21px]'>
        <Search label={'진단명으로 검색하기'} onClick={() => {}} size='large' />
      </div>

      {/* 질병 카드 */}
      <div className='mt-4 space-y-4 px-5'>
        <DiagnosisRecordCard
          title='사과 잎마름병'
          description='...'
          result={[
            { label: '원인 분석1', value: '원인1' },
            { label: '원인 분석2', value: '원인2' },
          ]}
          date='2025-12-07'
          badge='위험'
          folders={[
            { id: 1, name: '사과' },
            { id: 2, name: '토마토' },
          ]}
          selectedFolderId={1}
          onConfirmMove={(folderId) => console.log('이동 완료:', folderId)}
        />
      </div>

      {/* 카메라 버튼 */}
      <img
        src={camera}
        alt='camera'
        className='mt-[70px] ml-[156px] bottom-[70px] w-20 h-20 cursor-pointer'
        onClick={() => navigate('/camera/guide')}
      />
    </div>
  )
}
