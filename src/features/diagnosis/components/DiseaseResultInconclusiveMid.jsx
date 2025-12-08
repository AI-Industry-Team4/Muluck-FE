import { Body18, Body20, Head25 } from '@/shared/typography'
import Button from '@/shared/components/Button'
import { useNavigate } from 'react-router-dom'

export default function DiseaseResultInconclusiveMid({ candidates = [], crop }) {
  const navigate = useNavigate()

  const diseases = candidates.map((c) => c.diseaseName)
  const confidences = candidates.map((c) => Math.round((c.confidenceScore ?? 0) * 100))

  return (
    <div className='flex flex-col justify-between'>
      {/* 작물 정보 */}
      {crop && <Body18 className='text-gray-200 mb-[10px]'>작물: {crop}</Body18>}

      {/* 메인 영역 */}
      <div className='flex flex-col justify-center items-center mt-[44px] gap-[27px] py-[27px] rounded-[10px] border border-[2px] border-percent'>
        <Head25 className='text-gray-300'>병충해를 판별할 수 없어요 😢</Head25>

        {/* 질병 후보 2개 */}
        <div>
          {diseases.map((disease, idx) => {
            const rank = idx + 1

            return (
              <div key={idx} className='text-center text-xl leading-[1.56rem] text-gray-100'>
                후보 {rank}. {disease} (예측 확률: {confidences[idx]}%)
              </div>
            )
          })}
        </div>

        <Body20 className='text-center whitespace-pre-line'>
          {`정확한 병충해 판별을 위해\n사진을 다시 촬영해 주세요!`}
        </Body20>
      </div>

      {/* 저장하기 버튼 */}
      <Button
        label='사진 다시 촬영하기'
        size='large'
        variant='primary'
        className='self-center mt-[42px]'
        onClick={() => navigate('/camera')}
      />
    </div>
  )
}
