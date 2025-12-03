import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from '../layout/RootLayout'
import HomePage from '@/features/home/pages/HomePage'
import DiagnosisResultPage from '@/features/diagnosis/pages/DiagnosisResultPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 레이아웃 Route */}
        <Route element={<RootLayout />}>
          {/* 홈 */}
          <Route index element={<HomePage />} />

          {/* 진단 플로우 */}
          {/* <Route path="diagnosis" element={<DiagnosisStartPage />} /> */}
          {/* <Route path="diagnosis/guide" element={<DiagnosisGuidePage />} /> */}
          {/* <Route path="diagnosis/capture" element={<DiagnosisCapturePage />} /> */}
          {/* <Route path="diagnosis/review" element={<DiagnosisReviewPage />} /> */}
          <Route path='diagnosis/result/:id' element={<DiagnosisResultPage />} />
          {/* <Route path="diagnosis/:id/save" element={<DiagnosisSavePage />} /> */}

          {/* 폴더 & 기록 */}
          {/* <Route path="folders/new" element={<FolderCreatePage />} />
          <Route path="folders/:folderId" element={<FolderDetailPage />} />
          <Route path="records/:recordId/move" element={<RecordMovePage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
