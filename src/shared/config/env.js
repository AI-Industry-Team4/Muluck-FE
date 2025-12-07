const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

if (!apiBaseUrl) {
  console.warn('[env] VITE_API_BASE_URL가 설정되지 않았습니다. .env를 확인하세요.')
}

const env = {
  apiBaseUrl,
  env: import.meta.env.VITE_ENV || 'dev',

  // 테스트용 ID들
  userId: import.meta.env.VITE_USER_ID,
  potatoFolderId: import.meta.env.VITE_FOLDER_ID_POTATO,
  healthyPotatoDiagnosisId: import.meta.env.VITE_DIAGNOSIS_ID_HEALTHY_POTATO,
  muluckFolderId: import.meta.env.VITE_FOLDER_ID_MULUCK,
}

export default env
