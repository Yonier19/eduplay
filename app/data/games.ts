import type { Game } from '@/types/game'

export const mockGames: Game[] = [
  {
    id: 1,
    title: 'Aventura Numérica',
    category: 'Matemáticas',
    description: 'Resuelve desafíos y salva el reino de los números.',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop',
    rating: 4.8,
    players: '2.3K',
    icon: 'calculator'
  },
  {
    id: 2,
    title: 'Laboratorio Curioso',
    category: 'Ciencias',
    description: 'Experimenta y descubre el mundo de la ciencia.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    rating: 4.6,
    players: '1.8K',
    icon: 'beaker'
  },
  {
    id: 3,
    title: 'Viaje en el Tiempo',
    category: 'Historia',
    description: 'Explora épocas históricas y toma decisiones.',
    image: 'https://images.unsplash.com/photo-1516534775068-bb57ad6331b0?w=400&h=300&fit=crop',
    rating: 4.7,
    players: '3.1K',
    icon: 'clock'
  },
  {
    id: 4,
    title: 'Exploradores del Planeta',
    category: 'Geografía',
    description: 'Aprende sobre países, capitales y culturas.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
    rating: 4.5,
    players: '2.0K',
    icon: 'globe'
  },
  {
    id: 5,
    title: 'Palabrista Avanzado',
    category: 'Idiomas',
    description: 'Mejora tu vocabulario y ortografía jugando.',
    image: 'https://images.unsplash.com/photo-1503455637927-730bce45df1d?w=400&h=300&fit=crop',
    rating: 4.4,
    players: '1.5K',
    icon: 'book'
  },
  {
    id: 6,
    title: 'Genios del Arte',
    category: 'Arte',
    description: 'Descubre obras maestras y crea tu propio arte.',
    image: 'https://images.unsplash.com/photo-1495492033575-36b60f63c2d7?w=400&h=300&fit=crop',
    rating: 4.9,
    players: '2.7K',
    icon: 'palette'
  },
  {
    id: 7,
    title: 'Musicalidad Pro',
    category: 'Música',
    description: 'Aprende ritmo, notas y composición musical.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop',
    rating: 4.7,
    players: '1.2K',
    icon: 'music'
  },
  {
    id: 8,
    title: 'Cuerpo Humano 3D',
    category: 'Biología',
    description: 'Explora los sistemas del cuerpo humano en 3D.',
    image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=300&fit=crop',
    rating: 4.6,
    players: '2.4K',
    icon: 'heart'
  }
]

export const categoryOptions = [
  { value: 'math', label: 'Matemáticas' },
  { value: 'science', label: 'Ciencias' },
  { value: 'history', label: 'Historia' },
  { value: 'geography', label: 'Geografía' },
  { value: 'languages', label: 'Idiomas' },
  { value: 'art', label: 'Arte' },
  { value: 'music', label: 'Música' },
  { value: 'biology', label: 'Biología' }
]

export const subjectOptions = [
  { value: 'primary', label: 'Primaria' },
  { value: 'secondary', label: 'Secundaria' },
  { value: 'high', label: 'Bachillerato' },
  { value: 'university', label: 'Universidad' }
]

export const ageOptions = [
  { value: '4-6', label: '4-6 años' },
  { value: '7-9', label: '7-9 años' },
  { value: '10-12', label: '10-12 años' },
  { value: '13-15', label: '13-15 años' },
  { value: '16+', label: '16+ años' }
]

export const platformOptions = [
  { value: 'web', label: 'Web' },
  { value: 'android', label: 'Android' },
  { value: 'ios', label: 'iOS' },
  { value: 'windows', label: 'Windows' },
  { value: 'mac', label: 'macOS' }
]

export const difficultyOptions = [
  { value: 'easy', label: 'Fácil' },
  { value: 'medium', label: 'Media' },
  { value: 'hard', label: 'Difícil' }
]
