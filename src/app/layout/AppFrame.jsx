export default function AppFrame({ children }) {
  return (
    <div className='w-full max-w-[480px] min-h-screen bg-white flex flex-col md:max-w-[393px] md:h-[852px] md:shadow-xl md:rounded-3xl md:border md:border-gray-100 md:overflow-hidden'>
      <main className='flex-1 overflow-y-auto'>{children}</main>
    </div>
  )
}
