import { defineStore } from 'pinia'

interface LoadingState {
  isLoading: boolean
  loadingStack: number
  loadingTimeout: number | null
}

export const useLoadingStore = defineStore('loading', {
  state: (): LoadingState => ({
    isLoading: false,
    loadingStack: 0,
    loadingTimeout: null
  }),

  actions: {
    startLoading() {
      this.loadingStack++
      this.isLoading = true

      // Clear any existing timeout
      if (this.loadingTimeout) {
        clearTimeout(this.loadingTimeout)
        this.loadingTimeout = null
      }
    },

    stopLoading() {
      this.loadingStack = Math.max(0, this.loadingStack - 1)
      
      if (this.loadingStack === 0) {
        if (!this.loadingTimeout) {
          this.loadingTimeout = window.setTimeout(() => {
            this.isLoading = false
            this.loadingTimeout = null
          }, 3000) // 5 seconds minimum loading time
        }
      }
    },

    resetLoading() {
      this.loadingStack = 0
      if (this.loadingTimeout) {
        clearTimeout(this.loadingTimeout)
      }
      this.loadingTimeout = null
      this.isLoading = false
    }
  }
}) 