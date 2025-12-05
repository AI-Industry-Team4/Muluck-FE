import Modal from '@/shared/components/Modal'
import { Head25 } from '@/shared/typography'
import plus from '@/assets/icons/check.png'

export default function CompleteModal({ isOpen, onClose, title }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col items-center justify-between px-5 pt-[57px] pb-[57px]'>
        {/* 제목 영역 */}
        <div className='flex items-center'>
          <img src={plus} alt='plus' className='w-9 h-9 mr-2' />
          <Head25 className='text-brand'>{title}</Head25>
        </div>
      </div>
    </Modal>
  )
}
