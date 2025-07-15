import { defineStore } from 'pinia'
import { login as apiLogin, register as apiRegister, me as apiMe } from '@/modules/auth/services/authService'
import type { User } from '@/modules/auth/types'

interface AuthState {
  user: User | null
  token: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token') || ''
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token)
  },
  actions: {
    async login(email: string, password: string) {
      const { token, user } = await apiLogin({ email, password })
      this.token = token
      this.user = user
      localStorage.setItem('token', token)
    },
    async register(name: string, email: string, password: string) {
      await apiRegister({ name, email, password })
      // opcional: auto-login após cadastro
      return this.login(email, password)
    },
    async fetchMe() {
      this.user = await apiMe()
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    }
  }
}) 