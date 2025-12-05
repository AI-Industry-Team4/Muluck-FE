import Modal from '@/shared/components/Modal'
import Button from '@/shared/components/Button'
import { Head25 } from '@/shared/typography'
import plus from '@/assets/icons/plus2.svg'

export default function FolderAddModal({ isOpen, onClose, isSave, emptyTitle }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col items-center justify-between px-5 pt-[42px] pb-[54px]'>
        {/* 제목 영역 */}
        <div className={`mb-[37px] text-center text-[1.56rem] leading-[2.19rem]`}>
          <Head25 className='text-brand'>폴더 추가하기</Head25>
        </div>

        {/* 폴더 이름 영역 */}
        <div
          className={`flex pl-[13px] items-center h-[45px] w-[332px] border border-brand rounded-[10px]`}
        >
          <input placeholder={emptyTitle} className='w-[290px] outline-none text-xl'></input>
          <img src={plus} className='cursor-pointer' />
        </div>

        {/* 저장하기 버튼 */}
        <Button
          label='저장하기'
          size='small'
          className='mt-[37px] self-center'
          onClick={() => {
            isSave()
          }}
        />
      </div>
    </Modal>
  )
}
