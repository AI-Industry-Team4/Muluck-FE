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

  // 테스트/시연용 IDs
  userId:
    // @ts-ignore
    process.env.REACT_APP_USER_ID,
  potatoFolderId:
    // @ts-ignore
    process.env.REACT_APP_FOLDER_ID_POTATO,
  healthyPotatoDiagnosisId:
    // @ts-ignore
    process.env.REACT_APP_DIAGNOSIS_ID_HEALTHY_POTATO,
  muluckFolderId:
    // @ts-ignore
    process.env.REACT_APP_FOLDER_ID_MULUCK,
}

export default env
