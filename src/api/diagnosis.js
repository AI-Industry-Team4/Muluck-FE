import env from '@/shared/config/env'
import client from './client'
import { handleApiError } from '@/shared/utils/handleApiError'

// 식불 병충해 진단 결과 반환 API
export async function analyzeDiagnosis(imageFile) {
  try {
    const formData = new FormData()
    formData.append('image', imageFile)

    const res = await client.post('/diagnoses/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'User-Id': env.userId,
      },
    })

    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
