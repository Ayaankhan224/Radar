const LOCAL_API_URL = 'http://localhost:6767'
const PRODUCTION_API_URL = 'https://radar-e8fw.onrender.com'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? LOCAL_API_URL : PRODUCTION_API_URL)
