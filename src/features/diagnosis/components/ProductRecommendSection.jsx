import { Body18, Sub10, Sub12 } from '@/shared/typography'

const mockProducts = [
  {
    id: 1,
    name: 'OO 비료 1',
    price: '₩12,000',
    seller: '판매처 A',
  },
  {
    id: 2,
    name: 'OO 비료 2',
    price: '₩15,500',
    seller: '판매처 B',
  },
  {
    id: 3,
    name: 'OO 영양제',
    price: '₩9,900',
    seller: '판매처 C',
  },
  {
    id: 4,
    name: 'OO 완효성 비료',
    price: '₩18,000',
    seller: '판매처 D',
  },
]

export default function ProductRecommendSection({ products = mockProducts }) {
  return (
    <div className='flex flex-col mt-[16px] gap-[8px]'>
      {/* 섹션 타이틀 */}
      <Body18 className='text-gray-200 ml-[2px]'>추천 제품</Body18>

      {/* 가로 스크롤 영역 */}
      <div className='flex overflow-x-auto gap-[7px] pb-[4px]'>
        {products.map((item) => (
          <div
            key={item.id}
            className='flex-shrink-0 flex flex-col p-[5px] pb-[7px] gap-[5px] border border-gray-200 rounded-[5px] bg-white'
          >
            {/* 제품 사진 (추후 실제 이미지로 교체) */}
            <div className='w-[70px] h-[50px] bg-[#D9D9D9]' />

            {/* 제품 설명 */}
            <div className='flex flex-col gap-[3px]'>
              {/* 제품명 */}
              <Sub12 className='text-gray-300'>{item.name}</Sub12>
              {/* 가격 */}
              <Sub10 className='text-blue'>{item.price}</Sub10>
              {/* 판매처 */}
              <Sub10 className='text-gray-100'>{item.seller}</Sub10>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
