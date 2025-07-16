import { defineStore } from 'pinia'
import type { Trade } from '@/modules/trades/services/tradeService'
import * as tradeService from '@/modules/trades/services/tradeService'

interface TradeState {
  trades: Trade[]
  loading: boolean
  currentPage: number
  hasMore: boolean
}

export const useTradeStore = defineStore('trades', {
  state: (): TradeState => ({
    trades: [],
    loading: false,
    currentPage: 1,
    hasMore: true
  }),

  actions: {
    $reset() {
      this.trades = []
      this.loading = false
      this.currentPage = 1
      this.hasMore = true
    },

    async fetchTrades(page = 1) {
      try {
        this.loading = true
        const response = await tradeService.getTrades({ page, rpp: 10 })
        
        if (page === 1) {
          this.trades = response.list
        } else {
          this.trades = [...this.trades, ...response.list]
        }
        
        this.currentPage = page
        this.hasMore = response.more
      } catch (error) {
        console.error('Failed to fetch trades:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async createTrade({ offeringCardId, receivingCardId }: { offeringCardId: string, receivingCardId: string }) {
      try {
        this.loading = true
        const cards = [
          { cardId: offeringCardId, type: 'OFFERING' as const },
          { cardId: receivingCardId, type: 'RECEIVING' as const }
        ]
        
        await tradeService.createTrade({ cards })
        await this.fetchTrades() // Refresh trades list
      } catch (error) {
        console.error('Failed to create trade:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteTrade(tradeId: string) {
      try {
        this.loading = true
        await tradeService.deleteTrade(tradeId)
        this.trades = this.trades.filter(trade => trade.id !== tradeId)
      } catch (error) {
        console.error('Failed to delete trade:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 