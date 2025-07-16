import { defineStore } from 'pinia'
import type { Card } from '@/modules/auth/types'
import * as cardService from '@/modules/cards/services/cardService'

interface CardState {
  cards: Card[]
  userCards: Card[]
  loading: boolean
  loadingMore: boolean
  currentPage: number
  hasMore: boolean
}

export const useCardStore = defineStore('cards', {
  state: (): CardState => ({
    cards: [],
    userCards: [],
    loading: false,
    loadingMore: false,
    currentPage: 1,
    hasMore: true
  }),

  actions: {
    $reset() {
      this.cards = []
      this.userCards = []
      this.loading = false
      this.loadingMore = false
      this.currentPage = 1
      this.hasMore = true
    },

    async fetchCards(page = 1) {
      try {
        if (page === 1) {
          this.loading = true
          this.cards = []
        } else {
          this.loadingMore = true
        }

        const response = await cardService.getCards({ page, rpp: 12 })
        
        if (page === 1) {
          this.cards = response.list
        } else {
          this.cards = [...this.cards, ...response.list]
        }
        
        this.currentPage = page
        this.hasMore = response.more
      } catch (error) {
        console.error('Failed to fetch cards:', error)
        throw error
      } finally {
        this.loading = false
        this.loadingMore = false
      }
    },

    async fetchUserCards() {
      try {
        console.log('Fetching user cards...')
        this.loading = true
        const cards = await cardService.getUserCards()
        console.log('User cards fetched:', cards)
        this.userCards = cards
      } catch (error) {
        console.error('Failed to fetch user cards:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async addCards(cardIds: string[]) {
      try {
        console.log('Adding cards to collection:', cardIds)
        this.loading = true
        await cardService.addUserCards(cardIds)
        console.log('Cards added successfully, refreshing user cards...')
        await this.fetchUserCards()
      } catch (error) {
        console.error('Failed to add cards:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 