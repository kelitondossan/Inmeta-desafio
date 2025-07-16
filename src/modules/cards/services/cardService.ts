import  http  from '@/services/http'
import type { Card } from '@/modules/auth/types'

interface CardListResponse {
  list: Card[]
  rpp: number
  page: number
  more: boolean
}

interface CardListParams {
  rpp?: number
  page?: number
}

export const getCards = async (params: CardListParams = {}): Promise<CardListResponse> => {
  const { data } = await http.get<CardListResponse>('/cards', { params })
  return data
}

export const getCard = async (id: string): Promise<Card> => {
  const { data } = await http.get<Card>(`/cards/${id}`)
  return data
}

export const getUserCards = async (): Promise<Card[]> => {
  const { data } = await http.get<Card[]>('/me/cards')
  return data
}

export const addUserCards = async (cardIds: string[]): Promise<void> => {
  await http.post('/me/cards', { cardIds })
} 