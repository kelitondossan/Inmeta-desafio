import { defineStore } from 'pinia'
import { login as apiLogin, register as apiRegister, me as apiMe } from '@/modules/auth/services/authService'
import type { User } from '@/modules/auth/types'

interface AuthState {
  user: User | null
  token: string
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token') || '',
    error: null
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token)
  },

  actions: {
    async login(email: string, password: string) {
      try {
        const { token, user } = await apiLogin({ email, password })
        this.token = token
        this.user = user
        localStorage.setItem('token', token)
        this.error = null
      } catch (error) {
        console.error('Login failed:', error)
        this.error = 'Falha ao fazer login. Verifique suas credenciais.'
        throw error
      }
    },

    async register(name: string, email: string, password: string) {
      try {
        console.log('Starting registration process...')
        const result = await apiRegister({ name, email, password })
        console.log('Registration successful, proceeding to login...')
        
        await this.login(email, password)
        this.error = null
        
        return result
      } catch (error) {
        console.error('Registration failed:', error)
        this.error = 'Falha ao criar conta. Verifique os dados e tente novamente.'
        throw error
      }
    },

    async fetchMe() {
      try {
        this.user = await apiMe()
        this.error = null
      } catch (error) {
        console.error('Failed to fetch user data:', error)
        this.error = 'Falha ao buscar dados do usuário.'
        throw error
      }
    },

    logout() {
      this.token = ''
      this.user = null
      this.error = null
      localStorage.removeItem('token')
    }
  }
}) 