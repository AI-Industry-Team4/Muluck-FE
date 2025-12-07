import { Body20, Head25 } from '@/shared/typography'
import Button from '@/shared/components/Button'
import { useNavigate } from 'react-router-dom'

export default function DiseaseResultInconclusiveLow() {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col justify-between'>
      {/* 메인 영역 */}
      <div className='flex flex-col justify-center items-center mt-[44px] gap-[27px] py-[27px] rounded-[10px] border border-[2px] border-percent'>
        <Head25 className='text-gray-300'>병충해를 판별할 수 없어요 😢</Head25>

        <Body20 className='text-center whitespace-pre-line'>
          {`병충해가 의심되는 잎을\n확대해서 촬영해 주세요!`}
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
