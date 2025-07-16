import http from '@/services/http'
import type { User } from '@/modules/auth/types'

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  name: string
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: User
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const { data } = await http.post<LoginResponse>('/login', payload)
    return data
  } catch (error) {
    console.error('Login request failed:', error)
    throw error
  }
}

export const register = async (payload: RegisterPayload): Promise<{ userId: string }> => {
  try {
    console.log('Sending registration request with payload:', payload)
    const { data } = await http.post<{ userId: string }>('/register', payload)
    console.log('Registration successful:', data)
    return data
  } catch (error) {
    console.error('Registration request failed:', error)
    throw error
  }
}

export const me = async (): Promise<User> => {
  try {
    const { data } = await http.get<User>('/me')
    return data
  } catch (error) {
    console.error('Fetch user data failed:', error)
    throw error
  }
} 