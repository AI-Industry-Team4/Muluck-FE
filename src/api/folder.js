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

// 사용자 폴더 추가 API
export async function createUserFolders({ folderName }) {
  try {
    const res = await client.post(
      '/home/folders',
      {},
      {
        headers: {
          'User-Id': env.userId,
        },
        params: {
          folderName,
        },
      },
    )

    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}

// 사용자 폴더 이동 API
export async function updateUserFolders({ diagnosisId, targetFolderId }) {
  try {
    const res = await client.post(
      `/folders/diagnoses/${diagnosisId}/move`,
      {},
      {
        headers: {
          'User-Id': env.userId,
        },
        params: {
          targetFolderId,
        },
      },
    )

    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
