<template>
  <div class="library-page">
    <!-- Encabezado -->
    <div class="library-header">
      <div>
        <div class="header-title">
          <v-icon size="32" color="primary">mdi-bookshelf</v-icon>

          <h1>Mi Biblioteca</h1>
        </div>

        <p>
          Todos tus juegos guardados y favoritos en un solo lugar.
        </p>
      </div>

      <v-btn
        color="primary"
        size="large"
        prepend-icon="mdi-plus"
        rounded="lg"
      >
        Explorar juegos
      </v-btn>
    </div>

    <!-- Barra de búsqueda -->
    <v-card class="search-card" elevation="0">
      <v-text-field
        v-model="search"
        label="Buscar en mi biblioteca..."
        placeholder="Busca un juego"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
        hide-details
        clearable
      />
    </v-card>

    <!-- Categorías -->
    <div class="filters">
      <v-chip
        :variant="selectedCategory === 'Todos' ? 'flat' : 'outlined'"
        :color="selectedCategory === 'Todos' ? 'primary' : undefined"
        @click="selectedCategory = 'Todos'"
      >
        Todos
      </v-chip>

      <v-chip
        :variant="selectedCategory === 'Favoritos' ? 'flat' : 'outlined'"
        :color="selectedCategory === 'Favoritos' ? 'primary' : undefined"
        prepend-icon="mdi-heart"
        @click="selectedCategory = 'Favoritos'"
      >
        Favoritos
      </v-chip>

      <v-chip
        :variant="selectedCategory === 'Guardados' ? 'flat' : 'outlined'"
        :color="selectedCategory === 'Guardados' ? 'primary' : undefined"
        prepend-icon="mdi-bookmark"
        @click="selectedCategory = 'Guardados'"
      >
        Guardados
      </v-chip>

      <v-chip
        :variant="selectedCategory === 'En progreso' ? 'flat' : 'outlined'"
        :color="selectedCategory === 'En progreso' ? 'primary' : undefined"
        prepend-icon="mdi-progress-clock"
        @click="selectedCategory = 'En progreso'"
      >
        En progreso
      </v-chip>
    </div>

    <!-- Estadísticas -->
    <div class="stats-grid">
      <v-card class="stat-card" elevation="0">
        <v-avatar color="primary" variant="tonal">
          <v-icon>mdi-gamepad-variant</v-icon>
        </v-avatar>

        <div>
          <span>Juegos guardados</span>
          <strong>{{ games.length }}</strong>
        </div>
      </v-card>

      <v-card class="stat-card" elevation="0">
        <v-avatar color="error" variant="tonal">
          <v-icon>mdi-heart</v-icon>
        </v-avatar>

        <div>
          <span>Favoritos</span>
          <strong>{{ favoriteCount }}</strong>
        </div>
      </v-card>

      <v-card class="stat-card" elevation="0">
        <v-avatar color="success" variant="tonal">
          <v-icon>mdi-check-circle</v-icon>
        </v-avatar>

        <div>
          <span>Completados</span>
          <strong>{{ completedCount }}</strong>
        </div>
      </v-card>

      <v-card class="stat-card" elevation="0">
        <v-avatar color="warning" variant="tonal">
          <v-icon>mdi-progress-clock</v-icon>
        </v-avatar>

        <div>
          <span>En progreso</span>
          <strong>{{ inProgressCount }}</strong>
        </div>
      </v-card>
    </div>

    <!-- Biblioteca -->
    <div class="section-header">
      <div>
        <h2>Mis juegos</h2>
        <span>{{ filteredGames.length }} juegos encontrados</span>
      </div>

      <v-select
        v-model="sortBy"
        :items="sortOptions"
        density="compact"
        variant="outlined"
        hide-details
        class="sort-select"
      />
    </div>

    <!-- Juegos -->
    <div
      v-if="filteredGames.length"
      class="games-grid"
    >
      <v-card
        v-for="game in filteredGames"
        :key="game.id"
        class="game-card"
        elevation="0"
      >
        <!-- Imagen / portada -->
        <div
          class="game-cover"
          :style="{ background: game.color }"
        >
          <v-icon size="64" color="white">
            {{ game.icon }}
          </v-icon>

          <v-btn
            class="favorite-button"
            icon
            size="small"
            variant="flat"
            @click.stop="toggleFavorite(game)"
          >
            <v-icon
              :color="game.favorite ? 'red' : 'white'"
            >
              {{ game.favorite ? 'mdi-heart' : 'mdi-heart-outline' }}
            </v-icon>
          </v-btn>

          <div class="difficulty">
            {{ game.difficulty }}
          </div>
        </div>

        <!-- Información -->
        <v-card-text class="game-content">
          <div class="game-category">
            {{ game.category }}
          </div>

          <h3>{{ game.title }}</h3>

          <p>
            {{ game.description }}
          </p>

          <!-- Progreso -->
          <div class="progress-info">
            <span>Progreso</span>
            <strong>{{ game.progress }}%</strong>
          </div>

          <v-progress-linear
            :model-value="game.progress"
            color="primary"
            rounded
            height="7"
          />

          <!-- Acción -->
          <v-btn
            block
            color="primary"
            class="play-button"
            rounded="lg"
            :prepend-icon="game.progress > 0 ? 'mdi-play' : 'mdi-gamepad-variant'"
          >
            {{ game.progress > 0 ? 'Continuar' : 'Jugar ahora' }}
          </v-btn>
        </v-card-text>
      </v-card>
    </div>

    <!-- Biblioteca vacía -->
    <v-card
      v-else
      class="empty-state"
      elevation="0"
    >
      <v-icon
        size="80"
        color="primary"
      >
        mdi-bookshelf
      </v-icon>

      <h2>No encontramos juegos</h2>

      <p>
        Prueba con otra búsqueda o explora nuevos juegos educativos.
      </p>

      <v-btn
        color="primary"
        prepend-icon="mdi-compass"
        rounded="lg"
      >
        Explorar juegos
      </v-btn>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Game {
  id: number
  title: string
  description: string
  category: string
  difficulty: string
  progress: number
  favorite: boolean
  saved: boolean
  icon: string
  color: string
}

const search = ref('')
const selectedCategory = ref('Todos')
const sortBy = ref('Recientes')

const sortOptions = [
  'Recientes',
  'Nombre',
  'Progreso',
]

const games = ref<Game[]>([
  {
    id: 1,
    title: 'Misión Matemática',
    description: 'Resuelve desafíos matemáticos y supera cada nivel.',
    category: 'Matemáticas',
    difficulty: 'Fácil',
    progress: 75,
    favorite: true,
    saved: true,
    icon: 'mdi-calculator-variant',
    color: 'linear-gradient(135deg, #6750A4, #8E7CC3)',
  },
  {
    id: 2,
    title: 'Exploradores de Ciencias',
    description: 'Descubre el mundo de la ciencia mediante retos.',
    category: 'Ciencias',
    difficulty: 'Medio',
    progress: 45,
    favorite: true,
    saved: true,
    icon: 'mdi-flask-outline',
    color: 'linear-gradient(135deg, #1976D2, #42A5F5)',
  },
  {
    id: 3,
    title: 'Guardianes de la Naturaleza',
    description: 'Aprende sobre reciclaje y cuidado del planeta.',
    category: 'Naturales',
    difficulty: 'Fácil',
    progress: 100,
    favorite: false,
    saved: true,
    icon: 'mdi-leaf',
    color: 'linear-gradient(135deg, #388E3C, #66BB6A)',
  },
  {
    id: 4,
    title: 'Historia en Acción',
    description: 'Viaja por diferentes épocas de la historia.',
    category: 'Historia',
    difficulty: 'Medio',
    progress: 20,
    favorite: false,
    saved: true,
    icon: 'mdi-castle',
    color: 'linear-gradient(135deg, #E65100, #FF9800)',
  },
  {
    id: 5,
    title: 'Código Maestro',
    description: 'Aprende programación resolviendo problemas.',
    category: 'Programación',
    difficulty: 'Difícil',
    progress: 60,
    favorite: true,
    saved: true,
    icon: 'mdi-code-braces',
    color: 'linear-gradient(135deg, #263238, #546E7A)',
  },
  {
    id: 6,
    title: 'Desafío del Universo',
    description: 'Explora planetas, estrellas y galaxias.',
    category: 'Astronomía',
    difficulty: 'Difícil',
    progress: 0,
    favorite: false,
    saved: true,
    icon: 'mdi-rocket-launch',
    color: 'linear-gradient(135deg, #4527A0, #7E57C2)',
  },
])

const filteredGames = computed(() => {
  let result = games.value.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(search.value.toLowerCase()) ||
      game.category.toLowerCase().includes(search.value.toLowerCase())

    let matchesCategory = true

    if (selectedCategory.value === 'Favoritos') {
      matchesCategory = game.favorite
    }

    if (selectedCategory.value === 'Guardados') {
      matchesCategory = game.saved
    }

    if (selectedCategory.value === 'En progreso') {
      matchesCategory =
        game.progress > 0 && game.progress < 100
    }

    return matchesSearch && matchesCategory
  })

  if (sortBy.value === 'Nombre') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }

  if (sortBy.value === 'Progreso') {
    result.sort((a, b) => b.progress - a.progress)
  }

  return result
})

const favoriteCount = computed(() => {
  return games.value.filter((game) => game.favorite).length
})

const completedCount = computed(() => {
  return games.value.filter((game) => game.progress === 100).length
})

const inProgressCount = computed(() => {
  return games.value.filter(
    (game) => game.progress > 0 && game.progress < 100,
  ).length
})

function toggleFavorite(game: Game) {
  game.favorite = !game.favorite
}
</script>

<style scoped>
.library-page {
  min-height: 100vh;
  padding: 32px;
  color: #ffffff;
}

/* Header */

.library-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-bottom: 28px;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-title h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
}

.library-header p {
  margin: 8px 0 0 44px;
  color: #aab3c5;
}

/* Search */

.search-card {
  margin-bottom: 20px;
  background: #151a26;
  border: 1px solid #252c3a;
  border-radius: 16px;
}

/* Filters */

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 28px;
}

/* Stats */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 36px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  background: #151a26;
  border: 1px solid #252c3a;
  border-radius: 16px;
}

.stat-card div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-card span {
  color: #8f99ad;
  font-size: 13px;
}

.stat-card strong {
  color: #ffffff;
  font-size: 22px;
}

/* Section */

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.section-header h2 {
  margin: 0;
  font-size: 22px;
}

.section-header span {
  color: #8f99ad;
  font-size: 13px;
}

.sort-select {
  max-width: 180px;
}

/* Games */

.games-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.game-card {
  overflow: hidden;
  background: #151a26;
  border: 1px solid #252c3a;
  border-radius: 18px;
  transition: 0.25s ease;
}

.game-card:hover {
  transform: translateY(-4px);
  border-color: #6750a4;
}

.game-cover {
  position: relative;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.favorite-button {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.3);
}

.difficulty {
  position: absolute;
  left: 12px;
  bottom: 12px;
  padding: 5px 10px;
  background: rgba(0, 0, 0, 0.35);
  color: white;
  border-radius: 20px;
  font-size: 12px;
}

.game-content {
  padding: 20px !important;
}

.game-category {
  margin-bottom: 6px;
  color: #a58bd8;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.game-content h3 {
  margin: 0 0 8px;
  color: #ffffff;
  font-size: 19px;
}

.game-content p {
  min-height: 42px;
  margin: 0 0 18px;
  color: #8f99ad;
  font-size: 13px;
  line-height: 1.5;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
  color: #8f99ad;
  font-size: 12px;
}

.progress-info strong {
  color: #ffffff;
}

.play-button {
  margin-top: 18px;
}

/* Empty */

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 350px;
  padding: 40px;
  text-align: center;
  background: #151a26;
  border: 1px solid #252c3a;
  border-radius: 18px;
}

.empty-state h2 {
  margin: 16px 0 8px;
}

.empty-state p {
  margin-bottom: 20px;
  color: #8f99ad;
}

/* Responsive */

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .games-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .library-page {
    padding: 20px;
  }

  .library-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .library-header p {
    margin-left: 0;
  }

  .stats-grid,
  .games-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    align-items: flex-start;
    gap: 12px;
    flex-direction: column;
  }

  .sort-select {
    max-width: none;
    width: 100%;
  }
}
</style>