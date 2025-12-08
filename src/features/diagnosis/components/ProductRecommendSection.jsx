import { Body18, Sub10, Sub12 } from '@/shared/typography'

// 가격 포맷팅 함수
function formatPrice(price) {
  return `₩${price.toLocaleString()}`
}

export default function ProductRecommendSection({ products = [] }) {
  // products가 없거나 빈 배열인 경우 아무것도 렌더링하지 않음
  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className='flex flex-col mt-[16px] gap-[8px]'>
      {/* 섹션 타이틀 */}
      <Body18 className='text-gray-200 ml-[2px]'>추천 제품</Body18>

      {/* 가로 스크롤 영역 */}
      <div className='flex overflow-x-auto gap-[7px] pb-[4px]'>
        {products.map((item, index) => (
          <div
            key={index}
            className='flex-shrink-0 flex flex-col p-[5px] pb-[7px] gap-[5px] border border-gray-200 rounded-[5px] bg-white'
          >
            {/* 제품 사진 */}
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.productName}
                className='w-[70px] h-[50px] object-cover rounded'
              />
            ) : (
              <div className='w-[70px] h-[50px] bg-[#D9D9D9] rounded' />
            )}

            {/* 제품 설명 */}
            <div className='flex flex-col gap-[3px]'>
              {/* 제품명 */}
              <Sub12 className='text-gray-300'>{item.productName}</Sub12>
              {/* 가격 */}
              <Sub10 className='text-blue'>{formatPrice(item.price)}</Sub10>
              {/* 판매처 */}
              <Sub10 className='text-gray-100'>{item.unit}</Sub10>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
