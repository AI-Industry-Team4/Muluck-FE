import { Body18, Body20, Head25, Sub10, Sub12, Sub14 } from '@/shared/typography'
import ListBox from './ListBox'
import ProductRecommendSection from './ProductRecommendSection'
import Button from '@/shared/components/Button'

export default function DiseaseResultSuspicious({
  onSaveClick,
  candidates = [],
  primaryDisease = null,
  products,
  crop,
}) {
  const diseases = candidates.map((c) => c.diseaseName)
  const confidences = candidates.map((c) => Math.round((c.confidenceScore ?? 0) * 100))
  // 1순위 질병의 description이 없으면 primaryDisease의 description 사용
  const descriptions = candidates.map((c, idx) => {
    if (idx === 0 && !c.description && primaryDisease?.description) {
      return primaryDisease.description
    }
    return c.description ?? ''
  })
  const causes = primaryDisease?.causes ?? []
  const guides = primaryDisease?.managementTips ?? []

  const rankColorMap = {
    1: 'text-red',
    2: 'text-blue',
    3: 'text-gray-200',
  }

  return (
    <div className='flex flex-col justify-between'>
      {/* 내용 영역 */}
      <div>
        {/* 작물 정보 */}
        {crop && <Body18 className='text-gray-200 mb-[10px]'>작물: {crop}</Body18>}

        {/* 헤더 */}
        <Head25>병충해가 의심돼요! 😨</Head25>

        {/* 의심 질병 목록 */}
        <div className='flex flex-col px-[20px] py-[14px] mt-[19px] mb-[10px] gap-[16px] rounded-[10px] border border-[0.5px] border-gray-100'>
          {diseases.map((disease, idx) => {
            const candidate = candidates[idx]
            const rank = candidate?.rank ?? idx + 1
            const rankColor = rankColorMap[rank] || 'text-gray-200'

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
                {descriptions[idx] && (
                  <Body18 className='text-gray-200'>{descriptions[idx]}</Body18>
                )}
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
