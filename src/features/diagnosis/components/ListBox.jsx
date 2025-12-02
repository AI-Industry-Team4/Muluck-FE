import { Body18, Sub14 } from '@/shared/typography'

import numbering1 from '@/assets/icons/numbering_1.png'
import numbering2 from '@/assets/icons/numbering_2.png'
import numbering3 from '@/assets/icons/numbering_3.png'

const numberingIcons = [numbering1, numbering2, numbering3]

export default function ListBox({ title, items = [] }) {
  return (
    <div className='flex flex-col pt-[12px] pl-[10px] pb-[11px] gap-[9px] bg-brand-light rounded-[10px]'>
      {/* 타이틀 */}
      <Body18 className='text-brand'>{title}</Body18>

      {/* 내용 영역 */}
      <div className='flex flex-col gap-[5px]'>
        {items.slice(0, 3).map((text, index) => (
          <div key={index} className='flex gap-[5px] items-center'>
            {/* 넘버링 */}
            <img
              src={numberingIcons[index]}
              alt={`numbering-${index + 1}`}
              className='w-[20px] h-[20px]'
            />
            {/* 내용 */}
            <Sub14 className='text-gray-200'>{text}</Sub14>
          </div>
        ))}
      </div>
    </div>
  )
}
