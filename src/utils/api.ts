import axios from 'axios'
// import { getToken } from '../services/LocalStorage'

const baseUrl = 'https://backend-stock.vercel.app/'
const apiNode = axios.create({ baseURL: baseUrl })

// apiNode.interceptors.request.use((config) => {
//   const token = getToken()

//   config.headers.Authorization = `GIGA ${token}`

//   return config
// })

export default apiNode
