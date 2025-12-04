import { createPortal } from 'react-dom'

export default function Modal({ isOpen, onClose, children, closeOnBackdrop = true }) {
  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (!closeOnBackdrop) return
    if (e.target === e.currentTarget) {
      onClose?.()
    }
  }

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'
      onClick={handleBackdropClick}
    >
      <div className='w-full max-w-[373px] rounded-[10px] bg-white'>{children}</div>
    </div>,
    document.body,
  )
}
