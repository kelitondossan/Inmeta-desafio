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
  const { data } = await http.post<LoginResponse>('/login', payload)
  return data
}

export const register = async (payload: RegisterPayload): Promise<{ userId: string }> => {
  const { data } = await http.post('/register', payload)
  return data
}

export const me = async (): Promise<User> => {
  const { data } = await http.get<User>('/me')
  return data
} 