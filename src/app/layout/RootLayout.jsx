import { Outlet } from 'react-router-dom'
import AppFrame from './AppFrame'

export default function RootLayout() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center py-8'>
      <AppFrame>
        <Outlet />
      </AppFrame>
    </div>
  )
}
