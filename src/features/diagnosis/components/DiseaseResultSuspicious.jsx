import { Body18, Body20, Head25, Sub10, Sub12, Sub14 } from '@/shared/typography'
import ListBox from './ListBox'
import ProductRecommendSection from './ProductRecommendSection'
import Button from '@/shared/components/Button'

export default function DiseaseResultSuspicious() {
  // TODO: 실제 데이터로 교체
  const diseases = ['질병1', '질병2', '질병3']
  const confidences = [0, 0, 0]
  const descriptions = ['설명1', '설명2', '설명3']
  const causes = ['원인 1', '원인 2', '원인 3']
  const guides = ['가이드 1', '가이드 2', '가이드 3']

  const rankColorMap = {
    1: 'text-red',
    2: 'text-blue',
    3: 'text-gray-200',
  }

  return (
    <div className='flex flex-col justify-between'>
      {/* 내용 영역 */}
      <div>
        {/* 헤더 */}
        <Head25>병충해가 의심돼요! 😨</Head25>

        {/* 의심 질병 목록 */}
        <div className='flex flex-col px-[20px] py-[14px] mt-[19px] mb-[10px] gap-[16px] rounded-[10px] border border-[0.5px] border-gray-100'>
          {diseases.map((disease, idx) => {
            const rank = idx + 1
            const rankColor = rankColorMap[rank]

            return (
              <div key={idx} className='flex flex-col gap-[9px]'>
                {/* 질병명 + 예측 확률 */}
                <div className='flex gap-[14px] items-center'>
                  {/* 순위 + 질병명 */}
                  <div className='flex gap-[8px]'>
                    <Head25 className={rankColor}>{rank}순위</Head25>
                    <Head25 className='text-gray-300'>{disease}</Head25>
                  </div>

                  {/* 구분선 */}
                  <div className='w-[1px] h-[30px] bg-gray-100' />

                  {/* 예측 확률 */}
                  <div className='flex gap-[4px]'>
                    <Sub14 className='text-gray-200'>예측 신뢰도:</Sub14>
                    <Sub14 className='text-percent'>{confidences[idx]}%</Sub14>
                  </div>
                </div>

                {/* 설명 */}
                <Body18 className='text-gray-200'>{descriptions[idx]}</Body18>
              </div>
            )
          })}
        </div>

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
