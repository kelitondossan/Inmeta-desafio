import http from '@/services/http'
import type { Card } from '@/modules/auth/types'

export interface Trade {
  id: string
  userId: string
  createdAt: string
  user: {
    name: string
  }
  tradeCards: TradeCard[]
}

export interface TradeCard {
  id: string
  cardId: string
  tradeId: string
  type: 'OFFERING' | 'RECEIVING'
  card: Card
}

interface TradeListResponse {
  list: Trade[]
  rpp: number
  page: number
  more: boolean
}

interface TradeListParams {
  rpp?: number
  page?: number
}

interface CreateTradePayload {
  cards: {
    cardId: string
    type: 'OFFERING' | 'RECEIVING'
  }[]
}

export const getTrades = async (params: TradeListParams = {}): Promise<TradeListResponse> => {
  const { data } = await http.get<TradeListResponse>('/trades', { params })
  return data
}

export const createTrade = async (payload: CreateTradePayload): Promise<{ tradeId: string }> => {
  const { data } = await http.post<{ tradeId: string }>('/trades', payload)
  return data
}

export const deleteTrade = async (tradeId: string): Promise<void> => {
  await http.delete(`/trades/${tradeId}`)
} 