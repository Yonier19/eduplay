<template>
  <div class="my-games-page">
    <section class="hero">
      <div>
        <div class="title-row">
          <v-icon color="primary" size="38">
            mdi-controller
          </v-icon>

          <h1>Mis Juegos</h1>
        </div>

        <p>
          Elige un juego y demuestra lo que sabes mientras te diviertes.
        </p>
      </div>

      <div class="player-score">
        <v-icon color="amber">mdi-star</v-icon>
        <strong>{{ totalScore }}</strong>
        <span>puntos</span>
      </div>
    </section>

    <div class="filters">
      <v-chip
        :variant="selectedCategory === 'Todos' ? 'flat' : 'outlined'"
        :color="selectedCategory === 'Todos' ? 'primary' : undefined"
        @click="selectedCategory = 'Todos'"
      >
        Todos
      </v-chip>

      <v-chip
        v-for="category in categories"
        :key="category"
        :variant="selectedCategory === category ? 'flat' : 'outlined'"
        :color="selectedCategory === category ? 'primary' : undefined"
        @click="selectedCategory = category"
      >
        {{ category }}
      </v-chip>
    </div>

    <div class="games-panel">
      <div class="games-grid">
        <v-card
          v-for="game in filteredGames"
          :key="game.id"
          class="game-card"
          elevation="0"
        >
          <div
            class="game-cover"
            :style="{ background: game.gradient }"
          >
            <v-icon size="72" color="white">
              {{ game.icon }}
            </v-icon>

            <div class="difficulty">
              {{ game.difficulty }}
            </div>

            <div class="players">
              <v-icon size="16">mdi-account</v-icon>
              {{ game.players }}
            </div>
          </div>

          <v-card-text class="game-info">
            <div class="category">
              {{ game.category }}
            </div>

            <h2>{{ game.name }}</h2>

            <p>
              {{ game.description }}
            </p>

            <div class="game-meta">
              <span>
                <v-icon size="16">mdi-clock-outline</v-icon>
                {{ game.time }}
              </span>

              <span>
                <v-icon size="16">mdi-star-outline</v-icon>
                {{ game.reward }} pts
              </span>
            </div>

            <v-btn
              block
              color="primary"
              size="large"
              rounded="lg"
              prepend-icon="mdi-play"
              @click="openGame(game)"
            >
              Jugar
            </v-btn>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <v-dialog v-model="gameDialog" max-width="850" persistent>
      <v-card class="game-dialog">
        <v-toolbar color="transparent" flat>
          <v-btn icon="mdi-close" @click="closeGame" />

          <v-toolbar-title>
            {{ activeGame?.name }}
          </v-toolbar-title>

          <v-spacer />

          <div class="dialog-score">
            ⭐ {{ currentScore }}
          </div>
        </v-toolbar>

        <v-divider />

        <div class="dialog-scroll">
          <div v-if="activeGame?.id === 'memory'" class="game-area">
            <h2>Encuentra las parejas 🧠</h2>

            <p class="instruction">
              Encuentra todas las parejas de símbolos.
            </p>

            <div class="memory-grid">
              <button
                v-for="(card, index) in memoryCards"
                :key="index"
                class="memory-card"
                :class="{
                  flipped: card.flipped || card.matched,
                  matched: card.matched
                }"
                @click="flipCard(index)"
              >
                <span v-if="card.flipped || card.matched">
                  {{ card.value }}
                </span>

                <span v-else>
                  ?
                </span>
              </button>
            </div>

            <div v-if="memoryWon" class="win-message">
              🎉 ¡Excelente! Encontraste todas las parejas.
            </div>
          </div>

          <div v-else-if="activeGame?.id === 'math'" class="game-area">
            <div class="math-header">
              <span>Pregunta {{ mathQuestion + 1 }}/10</span>
              <span>⏱️ {{ mathTime }}s</span>
            </div>

            <v-progress-linear
              :model-value="(mathQuestion / 10) * 100"
              color="primary"
              height="8"
              rounded
            />

            <div v-if="!mathFinished" class="math-game">
              <h2>
                {{ currentMath.question }}
              </h2>

              <div class="answers">
                <v-btn
                  v-for="answer in currentMath.answers"
                  :key="answer"
                  size="x-large"
                  variant="outlined"
                  @click="answerMath(answer)"
                >
                  {{ answer }}
                </v-btn>
              </div>
            </div>

            <div v-else class="result-screen">
              <v-icon size="90" color="amber">
                mdi-trophy
              </v-icon>

              <h2>¡Reto terminado!</h2>

              <p>
                Respuestas correctas:
                <strong>{{ mathCorrect }}/10</strong>
              </p>

              <v-btn color="primary" @click="restartMath">
                Jugar nuevamente
              </v-btn>
            </div>
          </div>

          <div v-else-if="activeGame?.id === 'words'" class="game-area word-game">
            <h2>🔤 Palabra Revuelta</h2>

            <p>
              Ordena las letras para descubrir la palabra.
            </p>

            <div class="scrambled">
              {{ scrambledWord }}
            </div>

            <v-text-field
              v-model="wordAnswer"
              label="Escribe la palabra"
              variant="outlined"
              @keyup.enter="checkWord"
            />

            <v-btn color="primary" size="large" @click="checkWord">
              Comprobar
            </v-btn>

            <div v-if="wordMessage" class="feedback">
              {{ wordMessage }}
            </div>
          </div>

          <div v-else-if="activeGame?.id === 'reaction'" class="game-area reaction-game">
            <h2>⚡ Reacción Rápida</h2>

            <p>
              Haz clic en el objetivo cuando aparezca.
            </p>

            <div class="reaction-zone" @click="reactionMiss">
              <button
                v-if="reactionVisible"
                class="reaction-target"
                :style="{
                  left: reactionX + '%',
                  top: reactionY + '%'
                }"
                @click.stop="hitReaction"
              >
                ⚡
              </button>
            </div>

            <p class="reaction-score">
              Aciertos:
              <strong>{{ reactionHits }}</strong>
            </p>

            <v-btn color="primary" @click="startReaction">
              Reiniciar
            </v-btn>
          </div>

          <div v-else-if="activeGame?.id === 'eco'" class="game-area eco-game">
            <h2>♻️ EcoClasificador</h2>

            <p>
              ¿Dónde debes depositar este residuo?
            </p>

            <div class="waste-object">
              {{ currentWaste.icon }}
              <strong>{{ currentWaste.name }}</strong>
            </div>

            <div class="bins">
              <button
                v-for="bin in bins"
                :key="bin.name"
                class="bin"
                :class="bin.class"
                @click="sortWaste(bin.name)"
              >
                <span>{{ bin.icon }}</span>
                {{ bin.name }}
              </button>
            </div>

            <div v-if="ecoMessage" class="feedback">
              {{ ecoMessage }}
            </div>

            <p>
              Puntos:
              <strong>{{ ecoScore }}</strong>
            </p>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

interface Game {
  id: string
  name: string
  description: string
  category: string
  difficulty: string
  time: string
  reward: number
  players: string
  icon: string
  gradient: string
}

interface MemoryCard {
  value: string
  flipped: boolean
  matched: boolean
}

const games: Game[] = [
  {
    id: 'memory',
    name: 'Memoria',
    description: 'Encuentra todas las parejas y demuestra tu memoria.',
    category: 'Cerebro',
    difficulty: 'Fácil',
    time: '5 min',
    reward: 100,
    players: '1',
    icon: 'mdi-brain',
    gradient: 'linear-gradient(135deg, #6750A4, #9C6ADE)',
  },
  {
    id: 'math',
    name: 'Reto Matemático',
    description: 'Resuelve operaciones antes de que se acabe el tiempo.',
    category: 'Matemáticas',
    difficulty: 'Medio',
    time: '3 min',
    reward: 150,
    players: '1',
    icon: 'mdi-calculator',
    gradient: 'linear-gradient(135deg, #1565C0, #42A5F5)',
  },
  {
    id: 'words',
    name: 'Palabra Revuelta',
    description: 'Ordena las letras y descubre la palabra escondida.',
    category: 'Lenguaje',
    difficulty: 'Medio',
    time: '5 min',
    reward: 120,
    players: '1',
    icon: 'mdi-alphabetical-variant',
    gradient: 'linear-gradient(135deg, #00897B, #26A69A)',
  },
  {
    id: 'reaction',
    name: 'Reacción Rápida',
    description: 'Pon a prueba tus reflejos y alcanza el objetivo.',
    category: 'Habilidad',
    difficulty: 'Difícil',
    time: '1 min',
    reward: 200,
    players: '1',
    icon: 'mdi-flash',
    gradient: 'linear-gradient(135deg, #EF6C00, #FFB300)',
  },
  {
    id: 'eco',
    name: 'EcoClasificador',
    description: 'Clasifica correctamente los residuos y salva el planeta.',
    category: 'Naturales',
    difficulty: 'Fácil',
    time: '4 min',
    reward: 130,
    players: '1',
    icon: 'mdi-recycle',
    gradient: 'linear-gradient(135deg, #2E7D32, #66BB6A)',
  },
]

const categories = ['Cerebro', 'Matemáticas', 'Lenguaje', 'Habilidad', 'Naturales']
const selectedCategory = ref('Todos')

const filteredGames = computed(() => {
  if (selectedCategory.value === 'Todos') {
    return games
  }

  return games.filter(game => game.category === selectedCategory.value)
})

const totalScore = ref(0)
const currentScore = ref(0)

const gameDialog = ref(false)
const activeGame = ref<Game | null>(null)

function openGame(game: Game) {
  activeGame.value = game
  currentScore.value = 0
  gameDialog.value = true

  if (game.id === 'memory') startMemory()
  if (game.id === 'math') restartMath()
  if (game.id === 'words') startWord()
  if (game.id === 'reaction') startReaction()
  if (game.id === 'eco') startEco()
}

function closeGame() {
  stopReaction()
  gameDialog.value = false
  activeGame.value = null
}

const memoryCards = ref<MemoryCard[]>([])
const memoryFirst = ref<number | null>(null)
const memoryLocked = ref(false)
const memoryWon = ref(false)

function startMemory() {
  const values = ['🎮', '🚀', '🧠', '🌎', '🎨', '⚽']
  const cards = [...values, ...values]

  cards.sort(() => Math.random() - 0.5)

  memoryCards.value = cards.map(value => ({
    value,
    flipped: false,
    matched: false,
  }))

  memoryFirst.value = null
  memoryLocked.value = false
  memoryWon.value = false
}

function flipCard(index: number) {
  if (memoryLocked.value) return

  const card = memoryCards.value[index]
  if (card.flipped || card.matched) return

  card.flipped = true

  if (memoryFirst.value === null) {
    memoryFirst.value = index
    return
  }

  const first = memoryCards.value[memoryFirst.value]

  if (first.value === card.value) {
    first.matched = true
    card.matched = true
    currentScore.value += 20
    memoryFirst.value = null

    if (memoryCards.value.every(item => item.matched)) {
      memoryWon.value = true
      totalScore.value += 100
    }
  } else {
    memoryLocked.value = true

    setTimeout(() => {
      first.flipped = false
      card.flipped = false
      memoryFirst.value = null
      memoryLocked.value = false
    }, 700)
  }
}

const mathQuestion = ref(0)
const mathCorrect = ref(0)
const mathTime = ref(30)
const mathFinished = ref(false)

const currentMath = ref({
  question: '',
  correct: 0,
  answers: [] as number[],
})

let mathTimer: ReturnType<typeof setInterval> | null = null

function generateMath() {
  const a = Math.floor(Math.random() * 20) + 1
  const b = Math.floor(Math.random() * 20) + 1
  const correct = a + b

  const answers = [
    correct,
    correct + Math.floor(Math.random() * 8) + 1,
    correct - Math.floor(Math.random() * 5) - 1,
    correct + 10,
  ]

  answers.sort(() => Math.random() - 0.5)

  currentMath.value = {
    question: `${a} + ${b} = ?`,
    correct,
    answers,
  }
}

function restartMath() {
  if (mathTimer) clearInterval(mathTimer)

  mathQuestion.value = 0
  mathCorrect.value = 0
  mathTime.value = 30
  mathFinished.value = false

  generateMath()

  mathTimer = setInterval(() => {
    mathTime.value--

    if (mathTime.value <= 0) {
      finishMath()
    }
  }, 1000)
}

function answerMath(answer: number) {
  if (answer === currentMath.value.correct) {
    mathCorrect.value++
    currentScore.value += 15
  }

  mathQuestion.value++

  if (mathQuestion.value >= 10) {
    finishMath()
    return
  }

  generateMath()
}

function finishMath() {
  if (mathTimer) {
    clearInterval(mathTimer)
    mathTimer = null
  }

  mathFinished.value = true
  totalScore.value += mathCorrect.value * 15
}

const words = ['PLANETA', 'ESCUELA', 'TECNOLOGIA', 'JUEGO', 'NATURALEZA', 'COMPUTADOR']
const currentWord = ref('')
const scrambledWord = ref('')
const wordAnswer = ref('')
const wordMessage = ref('')

function shuffleWord(word: string) {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('')
}

function startWord() {
  currentWord.value = words[Math.floor(Math.random() * words.length)]
  scrambledWord.value = shuffleWord(currentWord.value)
  wordAnswer.value = ''
  wordMessage.value = ''
}

function checkWord() {
  if (wordAnswer.value.trim().toUpperCase() === currentWord.value) {
    wordMessage.value = '🎉 ¡Correcto! +120 puntos'
    currentScore.value += 120
    totalScore.value += 120
    setTimeout(startWord, 1000)
  } else {
    wordMessage.value = '❌ Inténtalo nuevamente.'
  }
}

const reactionVisible = ref(false)
const reactionX = ref(50)
const reactionY = ref(50)
const reactionHits = ref(0)

let reactionTimer: ReturnType<typeof setTimeout> | null = null

function startReaction() {
  stopReaction()
  reactionHits.value = 0
  showReactionTarget()
}

function showReactionTarget() {
  reactionX.value = Math.floor(Math.random() * 80) + 10
  reactionY.value = Math.floor(Math.random() * 70) + 10
  reactionVisible.value = true
}

function hitReaction() {
  reactionHits.value++
  currentScore.value += 20
  reactionVisible.value = false

  if (reactionHits.value >= 10) {
    totalScore.value += 200
    return
  }

  reactionTimer = setTimeout(showReactionTarget, 500)
}

function reactionMiss() {
  if (reactionVisible.value) {
    reactionVisible.value = false
    reactionTimer = setTimeout(showReactionTarget, 800)
  }
}

function stopReaction() {
  if (reactionTimer) {
    clearTimeout(reactionTimer)
    reactionTimer = null
  }

  reactionVisible.value = false
}

const wastes = [
  { name: 'Botella de plástico', icon: '🥤', bin: 'Plástico' },
  { name: 'Periódico', icon: '📰', bin: 'Papel' },
  { name: 'Cáscara de banana', icon: '🍌', bin: 'Orgánico' },
  { name: 'Lata', icon: '🥫', bin: 'Metal' },
  { name: 'Caja de cartón', icon: '📦', bin: 'Papel' },
]

const bins = [
  { name: 'Plástico', icon: '♻️', class: 'plastic' },
  { name: 'Papel', icon: '📄', class: 'paper' },
  { name: 'Orgánico', icon: '🌱', class: 'organic' },
  { name: 'Metal', icon: '🥫', class: 'metal' },
]

const currentWaste = ref(wastes[0])
const ecoScore = ref(0)
const ecoMessage = ref('')

function startEco() {
  ecoScore.value = 0
  nextWaste()
}

function nextWaste() {
  currentWaste.value = wastes[Math.floor(Math.random() * wastes.length)]
  ecoMessage.value = ''
}

function sortWaste(bin: string) {
  if (bin === currentWaste.value.bin) {
    ecoScore.value += 20
    currentScore.value += 20
    ecoMessage.value = '✅ ¡Correcto!'
    setTimeout(nextWaste, 700)
  } else {
    ecoMessage.value = `❌ Incorrecto. Era ${currentWaste.value.bin}.`
  }
}

onUnmounted(() => {
  if (mathTimer) clearInterval(mathTimer)
  stopReaction()
})
</script>

<style scoped>
.my-games-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  height: calc(100vh - 112px);
  max-height: calc(100vh - 112px);
  min-height: 0;
  padding: 32px;
  color: #ffffff;
  overflow: hidden;
}

.hero,
.filters {
  flex-shrink: 0;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-row h1 {
  margin: 0;
  font-size: 34px;
}

.hero p {
  margin: 8px 0 0 50px;
  color: #aab3c5;
}

.player-score {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #151a26;
  border: 1px solid #292f3d;
  border-radius: 14px;
}

.player-score strong {
  font-size: 22px;
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.games-panel {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 6px;
  scrollbar-width: thin;
  scrollbar-color: rgba(129, 140, 248, 0.8) rgba(17, 22, 33, 0.7);
}

.games-panel::-webkit-scrollbar,
.dialog-scroll::-webkit-scrollbar {
  width: 8px;
}

.games-panel::-webkit-scrollbar-track,
.dialog-scroll::-webkit-scrollbar-track {
  background: rgba(17, 22, 33, 0.7);
  border-radius: 999px;
}

.games-panel::-webkit-scrollbar-thumb,
.dialog-scroll::-webkit-scrollbar-thumb {
  background: rgba(129, 140, 248, 0.8);
  border-radius: 999px;
  border: 2px solid rgba(17, 22, 33, 0.8);
}

.games-panel::-webkit-scrollbar-thumb:hover,
.dialog-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 153, 255, 0.95);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  min-height: 0;
}

.game-card {
  overflow: hidden;
  background: #151a26;
  border: 1px solid #292f3d;
  border-radius: 20px;
  transition: 0.25s ease;
}

.game-card:hover {
  transform: translateY(-6px);
  border-color: #6750a4;
}

.game-cover {
  position: relative;
  height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.difficulty {
  position: absolute;
  left: 14px;
  bottom: 14px;
  padding: 5px 10px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.35);
  font-size: 12px;
}

.players {
  position: absolute;
  right: 14px;
  bottom: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.35);
  font-size: 12px;
}

.game-info {
  padding: 20px !important;
}

.category {
  color: #a58bd8;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.game-info h2 {
  margin: 5px 0 8px;
  font-size: 20px;
}

.game-info p {
  min-height: 42px;
  color: #9099aa;
  font-size: 14px;
  line-height: 1.5;
}

.game-meta {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  color: #9ba4b5;
  font-size: 13px;
}

.game-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.game-dialog {
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  background: #111621 !important;
  color: white;
  overflow: hidden;
}

.game-dialog :deep(.v-toolbar) {
  position: sticky;
  top: 0;
  z-index: 2;
  background: rgba(17, 22, 33, 0.96);
  backdrop-filter: blur(8px);
}

.dialog-score {
  margin-right: 20px;
  font-weight: bold;
}

.dialog-scroll {
  flex: 1;
  min-height: 0;
  max-height: calc(90vh - 72px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(129, 140, 248, 0.8) rgba(17, 22, 33, 0.7);
}

.game-area {
  min-height: 0;
  padding: 30px;
  text-align: center;
}

.game-area h2 {
  margin-bottom: 8px;
}

.instruction {
  color: #9099aa;
}

.memory-grid {
  max-width: 560px;
  margin: 30px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.memory-card {
  aspect-ratio: 1;
  border: 0;
  border-radius: 14px;
  background: #272e3d;
  color: white;
  font-size: 34px;
  cursor: pointer;
  transition: 0.2s;
}

.memory-card:hover {
  transform: scale(1.04);
}

.memory-card.flipped {
  background: #6750a4;
}

.memory-card.matched {
  background: #2e7d32;
}

.win-message {
  margin-top: 20px;
  padding: 15px;
  border-radius: 12px;
  background: #1b3a25;
  color: #7ee787;
}

.math-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.math-game {
  margin-top: 80px;
}

.math-game h2 {
  font-size: 52px;
  margin-bottom: 45px;
}

.answers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 500px;
  margin: auto;
  gap: 15px;
}

.result-screen {
  padding-top: 80px;
}

.result-screen h2 {
  font-size: 32px;
}

.word-game {
  max-width: 600px;
  margin: auto;
}

.scrambled {
  margin: 50px 0;
  padding: 25px;
  border-radius: 16px;
  background: #1d2432;
  color: #b79cff;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 10px;
}

.feedback {
  margin-top: 20px;
  font-size: 18px;
}

.reaction-zone {
  position: relative;
  height: 350px;
  margin: 25px 0;
  overflow: hidden;
  border-radius: 20px;
  background: #181e2b;
  border: 2px dashed #343c4d;
}

.reaction-target {
  position: absolute;
  width: 65px;
  height: 65px;
  transform: translate(-50%, -50%);
  border: 0;
  border-radius: 50%;
  background: #ff5252;
  color: white;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0 0 25px rgba(255, 82, 82, 0.5);
}

.reaction-score {
  font-size: 18px;
}

.waste-object {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 40px 0;
  font-size: 70px;
}

.waste-object strong {
  font-size: 22px;
}

.bins {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.bin {
  padding: 25px 10px;
  border: 2px solid #303747;
  border-radius: 15px;
  background: #1a202d;
  color: white;
  cursor: pointer;
  font-size: 15px;
  transition: 0.2s;
}

.bin:hover {
  transform: translateY(-4px);
  border-color: #6750a4;
}

.bin span {
  display: block;
  margin-bottom: 8px;
  font-size: 30px;
}

@media (max-width: 1000px) {
  .games-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .my-games-page {
    height: auto;
    max-height: none;
    padding: 20px;
    overflow: visible;
  }

  .hero {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .games-panel {
    max-height: 60vh;
    overflow-y: auto;
  }

  .games-grid {
    grid-template-columns: 1fr;
  }

  .memory-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .bins {
    grid-template-columns: repeat(2, 1fr);
  }

  .math-game h2 {
    font-size: 36px;
  }
}
</style>
