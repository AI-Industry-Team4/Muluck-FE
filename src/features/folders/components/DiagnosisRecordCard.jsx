import { useState } from 'react'
import menu from '@/assets/icons/menu.svg'
import { Body18, Sub10, Sub12 } from '@/shared/typography'
import FolderSelectModal from '@/shared/components/FolderSelectModal'
import CompleteModal from '@/shared/components/CompleteModal'
import { updateUserFolders } from '@/api/folder'
import useApi from '@/shared/hooks/useApi'

export default function DiagnosisRecordCard({
  title,
  img,
  diagnosisId,
  folderName,
  description,
  result = [],
  date,
  percent,
  folders = [],
  selectedFolderId,
  onConfirmMove,
}) {
  const [openMenu, setOpenMenu] = useState(false)
  const [openSelectModal, setOpenSelectModal] = useState(false)
  const [openCompleteModal, setOpenCompleteModal] = useState(false)
  const [SelectedFolderId, setSelectedFolderId] = useState(selectedFolderId)
  const { data, error, loading, execute } = useApi(updateUserFolders)

  const handleOpenModal = () => {
    setOpenMenu(false)
    setOpenSelectModal(true)
  }

  const handleConfirmFolder = (id) => {
    execute({
      diagnosisId,
      targetFolderId: id,
    })
    onConfirmMove?.(id)
    setOpenSelectModal(false)
    setOpenCompleteModal(true)
  }

  return (
    <div className='w-[352px] min-h-40 bg-brand-light rounded-[5px] p-2.5 relative'>
      <div className='flex gap-3 items-center'>
        {/* 이미지 */}
        <div className='self-stretch'>
          <img src={img} className='w-[130px] h-full object-cover rounded-md bg-gray-300' />
        </div>

        {/* 내용 */}
        <div className='flex-1'>
          {/* 메뉴 버튼 */}
          <div className='relative flex flex-col items-end'>
            <button onClick={() => setOpenMenu(!openMenu)} className='p-1'>
              <img src={menu} className='text-gray-600' />
            </button>

            {/* 폴더 이동 */}
            {openMenu && (
              <div className='absolute right-0 mt-5 bg-white w-15 h-[25px] shadow-md rounded-[5px] text-center'>
                <button onClick={handleOpenModal}>
                  <Sub12 className='text-gray-200'>폴더 이동</Sub12>
                </button>
              </div>
            )}
          </div>
          {/* 제목 + 태그 */}
          <div className='flex justify-between items-start'>
            <Body18 className='text-gray-200'>{title}</Body18>

            <Sub10
              className={`flex flex-col w-[73px] h-5 rounded-[30px] text-center justify-center bg-percent text-white`}
            >
              예측 확률: {percent}%
            </Sub10>
          </div>
          <div>
            {result.length > 0 ? (
              <>
                {/* 설명 */}
                <Sub12 className='text-gray-100 mt-1.5 whitespace-pre-line'>{description}</Sub12>

                {/* 원인 */}
                <div className='bg-white rounded-[5px] flex flex-col p-1.5 pb-0 mt-1.5'>
                  <Sub12 className='text-gray-200 mb-2'>원인 분석</Sub12>

                  <ul className='text-gray-100 space-y-0.5 m-0 p-0 list-none'>
                    {result.map((item, i) => (
                      <li key={i} className='-mt-2.5'>
                        <Sub10>• {item.value}</Sub10>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className='flex flex-col h-20 justify-center items-center'>
                <Sub12 className='text-gray-100'>잘 관리된 {folderName}에요</Sub12>
              </div>
            )}
          </div>

          {/* 날짜 */}
          <div className='flex flex-col justify- items-end mt-2'>
            <Sub10 className=' text-gray-500'>{date}</Sub10>
          </div>
        </div>
      </div>

      {/* 폴더 이동 모달 */}
      <FolderSelectModal
        isOpen={openSelectModal}
        onClose={() => setOpenSelectModal(false)}
        folders={folders}
        selectedFolderId={SelectedFolderId}
        onSelectFolder={(id) => setSelectedFolderId(id)}
        onConfirm={handleConfirmFolder}
      />

      {/* 이동 완료 모달 */}
      <CompleteModal
        isOpen={openCompleteModal}
        onClose={() => setOpenCompleteModal(false)}
        title='폴더 이동에 성공했어요!'
      />
    </div>
  )
}
