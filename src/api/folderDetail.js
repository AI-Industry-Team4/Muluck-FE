import env from '@/shared/config/env'
import client from './client'
import { handleApiError } from '@/shared/utils/handleApiError'

// 작물 진단 기록 리스트 조회 API
export async function getFoldersDetail({ folderId }) {
  try {
    const res = await client.get(`/folders/${folderId}/diagnoses`, {
      headers: {
        'User-Id': env.userId,
      },
    })

    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}

// 진단 기록 단건 상세 조회 API
export async function getDiagnosisDetail(diagnosisId) {
  try {
    const res = await client.get(`/folders/diagnoses/${diagnosisId}`, {
      headers: {
        'User-Id': env.userId,
      },
    })

    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
