export interface Game {
  id: number
  title: string
  description: string
  category: string
  image: string
  rating: number
  players: string
  icon?: string
}

export interface UploadGameForm {
  name: string
  description: string
  category: string
  subject: string
  age: string
  platform: string
  difficulty: string
  tags: string[]
  gameFile: File | null
  coverImage: File | null
  screenshots: File[]
  visibility: 'public' | 'private'
  comments: boolean
  ratings: boolean
}

export type ViewMode = 'grid' | 'list'

export type SortOption = 'recent' | 'popular' | 'rated'
