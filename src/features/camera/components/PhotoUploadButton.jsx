import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import photo from '@/assets/icons/photo.png'

export default function PhotoUploadButton({ className, nextPage }) {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        navigate(nextPage, { state: { image: reader.result } })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <img
        src={photo}
        alt='photo'
        className={`cursor-pointer ${className}`}
        onClick={handleClick}
      />
      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </>
  )
}
