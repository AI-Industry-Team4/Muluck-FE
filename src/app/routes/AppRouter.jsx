import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from '../layout/RootLayout'
import HomePage from '@/features/home/pages/HomePage'
import DiagnosisResultPage from '@/features/diagnosis/pages/DiagnosisResultPage'
import GuidePage from '@/features/camera/pages/GuidePage'
import CameraPage from '@/features/camera/pages/CameraPage'
import PreviewPage from '@/features/camera/pages/PreviewPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 레이아웃 Route */}
        <Route element={<RootLayout />}>
          {/* 홈 */}
          <Route index element={<HomePage />} />

          {/* 진단(카메라) */}
          <Route path='camera/guide' element={<GuidePage />} />
          <Route path='camera' element={<CameraPage />} />
          <Route path='camera/preview' element={<PreviewPage />} />

          {/* 진단 결과 */}
          <Route path='diagnosis/result' element={<DiagnosisResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
