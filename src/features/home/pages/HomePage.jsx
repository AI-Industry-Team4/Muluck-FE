import { useState } from 'react'
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

export default function HomePage() {
  const navigate = useNavigate()
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)

  const handleOpenCompleteModal = () => {
    setIsFolderModalOpen(false)
    setIsCompleteModalOpen(true)
  }
  const handleCloseCompleteModal = () => setIsCompleteModalOpen(false)
  const handleOpenFolderModal = () => setIsFolderModalOpen(true)
  const handleCloseFolderModal = () => setIsFolderModalOpen(false)

  return (
    <div className='scrollbar-hide overflow-auto'>
      {/* 제목 */}
      <div className='mt-[76px] ml-[21px] mb-[18px]'>
        <H36 className='text-brand'>무럭무럭</H36>
      </div>

      {/* 배너 영역 */}
      <div className='relative'>
        <div className='absolute mt-[15px] ml-[21px] z-10 flex flex-col bg-linear-to-b from-[#01BF99] to-[#005947] text-transparent bg-clip-text gap-2.5'>
          <Head25>식물 잎 사진으로</Head25>
          <Head25>내 식물 상태를 정확히 분석해드립니다!</Head25>
        </div>
        <img src={Banner} alt='Banner_main' className='absolute border-t-2 border-brand' />
        <div className='ml-[21px] mt-[100px] absolute z-10 flex gap-2.5'>
          <PlantButton label={'사과'} onClick={() => navigate('/')} />
          <PlantButton label={'포도'} onClick={() => navigate('/')} />
          <PlantButton label={'감자'} onClick={() => navigate('/')} />
        </div>
        <div className='ml-[21px] mt-[145px] absolute z-10 flex gap-2.5'>
          <PlantButton label={'옥수수'} onClick={() => navigate('/')} />
          <PlantButton label={'피망'} onClick={() => navigate('/')} />
          <PlantButton label={'토마토'} onClick={() => navigate('/')} />
        </div>
      </div>

      {/* 검색바 영역 */}
      <div className='flex mt-[236px] ml-[21px]'>
        <Search label={'작물명으로 검색하기'} onClick={() => {}} size='small' />
        <img
          src={Plus}
          alt={'plus'}
          className='ml-2 cursor-pointer'
          onClick={handleOpenFolderModal}
        />
      </div>

      {/* 폴더 영역 */}
      <div className='ml-[21px] mt-[22px]'>
        <div className='flex gap-[11px]'>
          <PlantFolder label={'옥수수'} />
          <PlantFolder label={'포도'} />
        </div>
        <div className='flex gap-[11px] mt-[11px]'>
          <PlantFolder label={'사과'} />
          <PlantFolder label={'토마토'} />
        </div>
        <div className='flex gap-[11px] mt-[11px]'>
          <PlantFolder label={'감자'} />
          <PlantFolder label={'피망'} />
        </div>
      </div>

      {/* 카메라 버튼 */}
      <img
        src={camera}
        alt='camera'
        className='mt-[70px] ml-[156px] mb-[70px] w-20 h-20 cursor-pointer'
        onClick={() => navigate('/camera/guide')}
      />

      {/* 폴더 추가 모달 */}
      <FolderAddModal
        isOpen={isFolderModalOpen}
        onClose={handleCloseFolderModal}
        isSave={handleOpenCompleteModal}
        emptyTitle='폴더명을 입력해 주세요'
      />

      {/* 폴더 저장 모달 */}
      <CompleteModal
        isOpen={isCompleteModalOpen}
        onClose={handleCloseCompleteModal}
        title='폴더가 추가되었습니다!'
      />
    </div>
  )
}
