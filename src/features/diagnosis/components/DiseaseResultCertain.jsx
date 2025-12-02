import { Body18, Body20, Head25, Sub10, Sub12, Sub14 } from '@/shared/typography'
import ListBox from './ListBox'
import ProductRecommendSection from './ProductRecommendSection'
import Button from '@/shared/components/Button'

export default function DiseaseResultCertain() {
  // TODO: 실제 데이터로 교체
  const diseaseName = '질병명'
  const confidence = 0 // 0~100
  const description = '설명'
  const causes = ['원인 1', '원인 2', '원인 3']
  const guides = ['가이드 1', '가이드 2', '가이드 3']

  return (
    <div className='flex flex-col justify-between'>
      {/* 내용 영역 */}
      <div>
        {/* 질병명 + 예측 신뢰도 */}
        <div className='flex gap-[14px] items-center mb-[10px]'>
          {/* 질병명 */}
          <Head25>{diseaseName}</Head25>
          {/* 구분선 */}
          <div className='w-[1px] h-[30px] bg-gray-100' />
          {/* 예측 신뢰도 */}
          <Sub14 className='flex gap-[7px]'>
            <p className='text-gray-200'>예측 신뢰도:</p>
            <p className='text-percent'>{confidence}%</p>
          </Sub14>
        </div>

        {/* 질병 설명 */}
        <Body18 className='text-gray-200 px-[10px] pb-[16px]'>{description}</Body18>

        {/* 발생 원인 */}
        <ListBox title='왜 발생한 질병일까요?' items={causes} />

        <div className='h-[10px]' />

        {/* 관리 가이드 */}
        <ListBox title='이렇게 관리하는 게 좋아요!' items={guides} />

        {/* 추천 제품 영역 */}
        <ProductRecommendSection />
      </div>

      {/* 저장하기 버튼 */}
      <Button
        label='저장하기'
        size='small'
        variant='primary'
        className='self-center mt-[42px]'
        onClick={() => console.log('저장하기 클릭')}
      />
    </div>
  )
}
