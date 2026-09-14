import { ref, computed } from 'vue'
import { mockGames } from '@/data/games'
import type { Game, SortOption, ViewMode } from '@/types/game'

export function useGames() {
  const games = ref<Game[]>(mockGames)
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const sortBy = ref<SortOption>('recent')
  const viewMode = ref<ViewMode>('grid')

  const filteredGames = computed(() => {
    let filtered = games.value

    // Filtrar por búsqueda
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query)
      )
    }

    // Filtrar por categoría
    if (selectedCategory.value) {
      filtered = filtered.filter(game => game.category === selectedCategory.value)
    }

    // Ordenar
    switch (sortBy.value) {
      case 'popular':
        filtered = [...filtered].sort((a, b) => {
          const playersA = parseInt(a.players)
          const playersB = parseInt(b.players)
          return playersB - playersA
        })
        break
      case 'rated':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      case 'recent':
      default:
        // Mantener orden original (reciente)
        break
    }

    return filtered
  })

  return {
    games,
    searchQuery,
    selectedCategory,
    sortBy,
    viewMode,
    filteredGames
  }
}
