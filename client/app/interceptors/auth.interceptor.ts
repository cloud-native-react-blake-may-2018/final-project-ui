import axios from 'axios'
export const authInterceptor = axios.create()
authInterceptor.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})
