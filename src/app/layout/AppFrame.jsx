export default function AppFrame({ children }) {
  return (
    <div className='w-[393px] h-[852px] bg-white shadow-xl rounded-3xl border border-gray-100 overflow-hidden flex flex-col'>
      <main className='flex-1 overflow-y-auto'>{children}</main>
    </div>
  )
}
