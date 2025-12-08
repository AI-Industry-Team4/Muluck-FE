import { useState } from 'react'
import Modal from '@/shared/components/Modal'
import Button from '@/shared/components/Button'
import { Head25 } from '@/shared/typography'
import plus from '@/assets/icons/plus2.svg'
import useApi from '@/shared/hooks/useApi'
import { createUserFolders } from '@/api/folder'

export default function FolderAddModal({ isOpen, onClose, onSuccess, emptyTitle }) {
  const [folderName, setFolderName] = useState('')
  const { execute, loading } = useApi(createUserFolders)

  const handleSave = async () => {
    if (!folderName.trim()) {
      alert('폴더명을 입력해주세요!')
      return
    }
    try {
      await execute({ folderName })
      onClose()
      onSuccess()
    } catch (err) {
      alert('폴더 추가에 실패했습니다.')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col items-center justify-between px-5 pt-[42px] pb-[54px]'>
        {/* 제목 */}
        <div className='mb-[37px] text-center text-[1.56rem] leading-[2.19rem]'>
          <Head25 className='text-brand'>폴더 추가하기</Head25>
        </div>

        {/* 입력창 */}
        <div className='flex pl-[13px] items-center h-[45px] w-[332px] border border-brand rounded-[10px]'>
          <input
            placeholder={emptyTitle}
            className='w-[290px] outline-none text-xl'
            onChange={(e) => setFolderName(e.target.value)}
          />
          <img src={plus} className='cursor-pointer' />
        </div>

        {/* 저장 */}
        <Button
          label={loading ? '저장 중…' : '저장하기'}
          size='small'
          className='mt-[37px] self-center'
          onClick={handleSave}
          disabled={loading}
        />
      </div>
    </Modal>
  )
}
