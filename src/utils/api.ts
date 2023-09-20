import axios from 'axios'
// import { getToken } from '../services/LocalStorage'

const baseUrl = import.meta.env.VITE_API_URL
const apiNode = axios.create({ baseURL: baseUrl })

// apiNode.interceptors.request.use((config) => {
//   const token = getToken()

//   config.headers.Authorization = `GIGA ${token}`

//   return config
// })

export default apiNode
