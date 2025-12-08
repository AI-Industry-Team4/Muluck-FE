import client from './client'
import { handleApiError } from '@/shared/utils/handleApiError'

// 추천 비료 제품 조회 API
export async function getFertilizerProducts() {
  try {
    const res = await client.get('/fertilizers/products')

    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
