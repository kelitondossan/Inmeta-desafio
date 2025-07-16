export interface Card {
  id: string
  name: string
  description: string
  imageUrl: string
  createdAt: string
  type?: string
  rarity?: string
}

export interface User {
  id: string
  name: string
  email: string
  cards?: Card[]
} 