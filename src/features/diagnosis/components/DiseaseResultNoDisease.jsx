import { Body18, Head25 } from '@/shared/typography'
import ListBox from './ListBox'
import ProductRecommendSection from './ProductRecommendSection'
import Button from '@/shared/components/Button'

export default function DiseaseResultNoDisease({ onSaveClick, careTips = [], products, crop }) {
  const guides = careTips

  return (
    <div className='flex flex-col justify-between'>
      {/* 내용 영역 */}
      <div>
        {/* 작물 정보 */}
        {crop && <Body18 className='text-gray-200 mb-[10px]'>작물: {crop}</Body18>}

        {/* 헤더 */}
        <Head25 className='text-gray-300 mb-[18px]'>작물이 건강합니다! 🌱</Head25>

        {/* 예방 가이드 */}
        <ListBox title='이렇게 예방할 수 있어요!' items={guides} />

        {/* 추천 제품 영역 */}
        <ProductRecommendSection products={products} />
      </div>

      {/* 저장하기 버튼 */}
      <Button
        label='저장하기'
        size='small'
        variant='primary'
        className='self-center mt-[42px]'
        onClick={onSaveClick}
      />
    </div>
  )
}
