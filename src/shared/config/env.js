// @ts-ignore
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

// @ts-ignore
if (!apiBaseUrl) {
  console.warn('[env] REACT_APP_API_BASE_URL가 설정되지 않았습니다. .env를 확인하세요.')
}

const env = {
  apiBaseUrl: apiBaseUrl,
  // @ts-ignore
  env: process.env.REACT_APP_ENV || 'dev',
}

export default env
