import env from '@/shared/config/env'
import client from './client'
import { handleApiError } from '@/shared/utils/handleApiError'

// 사용자 폴더 목록 조회 API
export async function getUserFolders() {
  try {
    const res = await client.get('/home/folders', {
      headers: {
        'User-Id': env.userId,
      },
    })

    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
