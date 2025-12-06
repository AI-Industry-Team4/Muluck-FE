import axios from 'axios'
import env from '@/shared/config/env'

const client = axios.create({
  baseURL: env.apiBaseUrl,
})

export default client
