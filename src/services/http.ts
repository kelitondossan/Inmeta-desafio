import axios from 'axios'

const http = axios.create({
  baseURL: 'https://cards-marketplace-api-2fjj.onrender.com',
  timeout: 30000, // 30 segundos para dar tempo da API "acordar"
  headers: {
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para tratar erros
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('A requisição demorou muito para responder. A API pode estar hibernada.')
      throw new Error('A API está iniciando, por favor, tente novamente em alguns segundos.')
    }
    
    if (!error.response) {
      console.error('Erro de conexão:', error)
      throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.')
    }

    if (error.response.status === 404) {
      console.error('API hibernada ou iniciando:', error)
      throw new Error('A API está iniciando, por favor, aguarde alguns segundos e tente novamente.')
    }

    throw error
  }
)

export default http 