import { useMemo, useState } from 'react'
import Modal from './Modal'
import Button from './Button'

import search from '@/assets/icons/search.png'
import check from '@/assets/icons/check.png'

export default function FolderSelectModal({
  isOpen,
  onClose,
  folders, // [{ id, name }]
  selectedFolderId,
  onSelectFolder, // (id) => void
  onConfirm, // (id) => void
  getTitleText = undefined,
  emptyTitle = '폴더를 선택해 주세요',
}) {
  const [keyword, setKeyword] = useState('')

  const selectedFolder = folders?.find((f) => f.id === selectedFolderId)
  const isDisabled = !selectedFolderId

  // 제목 텍스트/색상
  const title = useMemo(() => {
    if (!selectedFolder) return emptyTitle
    if (getTitleText) return getTitleText(selectedFolder.name, selectedFolder)
    // 기본 제목 형식
    return (
      <>
        ‘{selectedFolder.name}’ 폴더에
        <br />
        진단 기록을 저장하시겠습니까?
      </>
    )
  }, [selectedFolder, emptyTitle, getTitleText])

  const titleColorClass = selectedFolder ? 'text-brand' : 'text-gray-200'

  // 검색어로 폴더 필터링
  const filteredFolders = useMemo(() => {
    if (!folders) return []
    if (!keyword.trim()) return folders
    const lower = keyword.toLowerCase()
    return folders.filter((f) => f.name.toLowerCase().includes(lower))
  }, [folders, keyword])

  const handleConfirm = () => {
    if (isDisabled) return
    onConfirm?.(selectedFolderId)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setKeyword(value)
    // TODO: 서버 검색 API와 연동한다면 여기에서 debounce + API 호출
  }

  const handleSearchSubmit = () => {
    if (!keyword.trim()) return
    // TODO: 폴더 추가/검색 API 연동 시 이 지점에서 호출
    console.log('검색 또는 추가 요청 키워드:', keyword)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearchSubmit()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='flex flex-col items-center justify-between px-[20px] pt-[40px] pb-[22px]'>
        {/* 제목 영역 */}
        <div
          className={`mb-[24px] text-center text-[1.56rem] leading-[2.19rem] ${titleColorClass}`}
        >
          {title}
        </div>

        <div className='w-full'>
          {/* 검색 / 추가 인풋 */}
          <div className='mb-[11px] h-[45px] flex w-full items-center rounded-[10px] border-[1px] border-brand px-[11px]'>
            <input
              className='mr-[11px] w-full border-none bg-transparent text-xl leading-5 outline-none text-gray-200 placeholder:text-gray-100'
              placeholder='작물명 검색 / 추가'
              value={keyword}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <button type='button' onClick={handleSearchSubmit}>
              <img src={search} alt='search' className='h-[24px] w-[24px] cursor-pointer' />
            </button>
          </div>

          {/* 폴더 리스트 */}
          <div className='rounded-[10px] bg-brand-light px-[15px] py-[10px]'>
            {filteredFolders?.map((folder, idx) => {
              const isSelected = folder.id === selectedFolderId
              const base = 'flex w-full items-center py-[10px] text-[20px] leading-5'
              const color = isSelected ? 'text-brand' : 'text-gray-200'
              const border = idx === filteredFolders.length - 1 ? '' : 'border-b border-gray-100'

              return (
                <button
                  key={folder.id}
                  type='button'
                  className={`${base} ${color} ${border}`}
                  onClick={() => onSelectFolder(isSelected ? null : folder.id)} // ⭐ 재선택 시 해제
                >
                  <div className='flex items-center gap-[8px]'>
                    <span>{folder.name}</span>
                    {isSelected && <img src={check} alt='check' className='h-[20px] w-[20px]' />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* 저장하기 버튼 */}
        <Button
          label='저장하기'
          size='small'
          variant={isDisabled ? 'secondary' : 'primary'}
          className='mt-[42px] self-center'
          onClick={handleConfirm}
          disabled={isDisabled}
        />
      </div>
    </Modal>
  )
}
