import { useState, useEffect } from 'react'
import { H36, Head25 } from '@/shared/typography'
import Search from '@/shared/components/Search'
import Banner from '@/assets/icons/banner_main.png'
import Plus from '@/assets/icons/plus.svg'
import PlantButton from '../components/PlantButton'
import PlantFolder from '../components/PlantFolder'
import camera from '@/assets/icons/camera.svg'
import { useNavigate } from 'react-router-dom'
import FolderAddModal from '../components/FolderAddModal'
import CompleteModal from '@/shared/components/CompleteModal'
import useApi from '@/shared/hooks/useApi'
import { getUserFolders } from '@/api/folder'

export default function HomePage() {
  const navigate = useNavigate()
  const { data, error, loading, execute } = useApi(getUserFolders)
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    execute()
  }, [])

  if (loading) return <p>불러오는 중…</p>
  if (error) return <p>{error.message}</p>

  const filteredFolders =
    data?.plantFolders?.filter((folder) =>
      folder.folderName.toLowerCase().includes(searchTerm.toLowerCase()),
    ) ?? []

  const bannerButtons = (data?.plantFolders ?? []).slice(0, 6)

  return (
    <div className='scrollbar-hide overflow-auto flex flex-col justify-center'>
      {/* 제목 */}
      <div className='mt-10 ml-[21px] mb-[18px]'>
        <H36 className='text-brand'>무럭무럭</H36>
      </div>

      {/* 배너 영역 */}
      <div className='relative'>
        <div className='absolute mt-[15px] ml-[21px] z-10 flex flex-col bg-linear-to-b from-[#01BF99] to-[#005947] text-transparent bg-clip-text gap-2.5'>
          <Head25>식물 잎 사진으로</Head25>
          <Head25>내 식물 상태를 정확히 분석해드립니다!</Head25>
        </div>

        <img src={Banner} alt='Banner_main' className='absolute border-t-2 border-brand w-full' />
        <div className='ml-[21px] mt-[100px] absolute z-10 flex gap-2.5'>
          {bannerButtons.slice(0, 3).map((folder) => (
            <PlantButton
              key={folder.folderId}
              label={folder.folderName}
              onClick={() => navigate(`/folder/${folder.folderId}`)}
            />
          ))}
        </div>
        <div className='ml-[21px] mt-[145px] absolute z-10 flex gap-2.5'>
          {bannerButtons.slice(3, 6).map((folder) => (
            <PlantButton
              key={folder.folderId}
              label={folder.folderName}
              onClick={() => navigate(`/folder/${folder.folderId}`)}
            />
          ))}
        </div>
      </div>

      {/* 검색바 영역 */}
      <div className='flex mt-[57%] z-10 justify-center'>
        <Search
          label={'작물명으로 검색하기'}
          size='small'
          onChange={(value) => setSearchTerm(value)}
        />
        <img
          src={Plus}
          alt={'plus'}
          className='ml-2 cursor-pointer'
          onClick={() => setIsFolderModalOpen(true)}
        />
      </div>

      {/* 폴더 영역 */}
      <div className='justify-center mt-[22px] flex flex-wrap gap-[11px] mb-50'>
        {(filteredFolders ?? []).map((folder) => (
          <PlantFolder
            key={folder.folderId}
            label={folder.folderName}
            images={folder.recentImageUrls}
            folderId={folder.folderId}
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

      {/* 폴더 추가 모달 */}
      <FolderAddModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        onSuccess={() => {
          setIsFolderModalOpen(false)
          setIsCompleteModalOpen(true)
        }}
        emptyTitle='폴더명을 입력해 주세요'
      />

      {/* 폴더 저장 모달 */}
      <CompleteModal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        title='폴더가 추가되었습니다!'
      />
    </div>
  )
}
