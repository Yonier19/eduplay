# PlayEdu - Plataforma de Juegos Educativos

Una plataforma moderna de educación gamificada construida con **Vue 3**, **TypeScript**, **Tailwind CSS** y **Lucide Icons**.

## 🎮 Características

- **Dashboard interactivo**: Interfaz moderna con sidebar colapsable
- **Explorador de juegos**: Grid y lista views con búsqueda y filtrado
- **Panel de subida**: Formulario completo para publicar juegos educativos
- **Componentes reutilizables**: Biblioteca UI base profesional
- **Responsive design**: Funciona en desktop, tablet y mobile
- **Tema personalizado**: Paleta de colores educativa moderna
- **Composables**: Lógica de estado organizada y reutilizable

## 📁 Estructura del Proyecto

```
app/
├── components/
│   ├── ui/                          # Componentes base reutilizables
│   │   ├── BaseButton.vue
│   │   ├── BaseInput.vue
│   │   ├── BaseTextarea.vue
│   │   ├── BaseSelect.vue
│   │   ├── BaseSwitch.vue
│   │   ├── BaseBadge.vue
│   │   ├── BaseCard.vue
│   │   └── BaseIconButton.vue
│   │
│   ├── layout/                      # Layout principal
│   │   └── AppLayout.vue
│   │
│   ├── sidebar/                     # Componentes de navegación
│   │   ├── Sidebar.vue
│   │   ├── LogoPlatform.vue
│   │   ├── ProfileCard.vue
│   │   └── NavigationItem.vue
│   │
│   ├── topbar/                      # Barra superior
│   │   ├── TopBar.vue
│   │   └── SearchBar.vue
│   │
│   ├── home/                        # Sección hero
│   │   └── GameHero.vue
│   │
│   ├── games/                       # Explorador de juegos
│   │   ├── GameExplorer.vue
│   │   └── GameCard.vue
│   │
│   └── upload/                      # Panel de subida
│       ├── UploadGamePanel.vue
│       ├── GameUploadForm.vue
│       ├── PublicationSettings.vue
│       └── PublicationActions.vue
│
├── pages/                           # Vistas/Páginas
│   ├── Home.vue
│   ├── Library.vue
│   ├── MyGames.vue
│   └── Settings.vue
│
├── composables/                     # Lógica de estado
│   ├── useGames.ts
│   ├── useSidebar.ts
│   ├── useUploadPanel.ts
│   └── useGameUploadForm.ts
│
├── router/                          # Configuración de router
│   └── index.ts
│
├── data/                            # Datos mock
│   └── games.ts
│
├── types/                           # TypeScript types
│   └── game.ts
│
├── plugins/                         # Configuración de plugins
│   └── vuetify.ts
│
└── App.vue                          # Componente raíz
```

## 🎨 Componentes UI Base

Todos los componentes tienen variantes de estilo mediante props:

### Button
```vue
<BaseButton variant="primary" size="lg">
  Publicar Juego
</BaseButton>
```

**Variantes**: `primary`, `secondary`, `ghost`, `danger`
**Tamaños**: `sm`, `md`, `lg`

### Input
```vue
<BaseInput
  v-model="value"
  label="Nombre"
  placeholder="Ej..."
  :error="errorMessage"
  required
/>
```

### Select
```vue
<BaseSelect
  v-model="category"
  label="Categoría"
  :options="[
    { value: 'math', label: 'Matemáticas' },
    { value: 'science', label: 'Ciencias' }
  ]"
/>
```

### Switch (Toggle)
```vue
<BaseSwitch v-model="allowComments" label="Permitir comentarios" />
```

### Badge
```vue
<BaseBadge variant="success" size="md">
  Categoría
</BaseBadge>
```

## 🎮 Composables

### useGames()
Maneja el estado de juegos, búsqueda, filtrado y ordenamiento.

```typescript
const { 
  games,           // Array de juegos
  searchQuery,     // Búsqueda actual
  selectedCategory,// Categoría filtrada
  sortBy,          // Ordenamiento
  viewMode,        // 'grid' | 'list'
  filteredGames    // Juegos computados
} = useGames()
```

### useSidebar()
Controla el estado del sidebar.

```typescript
const {
  sidebarOpen,
  sidebarCollapsed,
  toggleSidebar,
  collapseSidebar
} = useSidebar()
```

### useUploadPanel()
Maneja el estado del panel de subida.

```typescript
const {
  uploadPanelOpen,
  loading,
  success,
  error,
  openUploadPanel,
  closeUploadPanel
} = useUploadPanel()
```

### useGameUploadForm()
Gestiona el formulario de subida con validación.

```typescript
const {
  form,            // Datos del formulario
  errors,          // Errores de validación
  validateForm,    // Validar
  submit,          // Enviar
  saveDraft,       // Guardar borrador
  loadDraft,       // Cargar borrador
  reset            // Limpiar
} = useGameUploadForm()
```

## 🎨 Paleta de Colores

- **Primary**: `#6D3DF5` (púrpura)
- **Secondary**: `#2495FF` (azul)
- **Accent**: `#8B5CF6` (púrpura brillante)
- **Success**: `#22C55E` (verde)
- **Warning**: `#F97316` (naranja)
- **Error**: `#F44336` (rojo)
- **Background**: `#050B1A` (azul oscuro)
- **Surface**: `#FFFFFF` (blanco)
- **Muted Text**: `#AAB3C5` (gris azulado)

## 📦 Dependencias

```json
{
  "vue": "^3.5.18",
  "vue-router": "^4.3.3",
  "pinia": "^2.1.7",
  "vuetify": "^3.9.5",
  "lucide-vue-next": "^0.395.0",
  "typescript": "^5.6.3"
}
```

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar servidor de desarrollo
```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5175`

### 3. Compilar para producción
```bash
npm run build
```

## 🎯 Características Implementadas

✅ **Dashboard completo** con sidebar y topbar
✅ **Explorador de juegos** con búsqueda, filtrado y ordenamiento
✅ **Vistas de grid y lista** intercambiables
✅ **Panel de subida** con formulario validado
✅ **Componentes reutilizables** tipados con TypeScript
✅ **Composables** para manejo de estado
✅ **Responsive design** (desktop, tablet, mobile)
✅ **Animaciones y transiciones** suaves
✅ **Accesibilidad** (labels, aria, focus states)
✅ **Datos mock** para demostración

## 🔄 Flujo de Interacción

1. **Buscar juegos**: Usa la barra de búsqueda en el topbar
2. **Filtrar**: Selecciona categoría y orden desde el explorador
3. **Ver juego**: Haz hover en una card para ver opciones
4. **Subir juego**: Click en "Subir Juego" para abrir el panel
5. **Rellenar formulario**: Completa todos los campos requeridos
6. **Configurar privacidad**: Selecciona visibilidad y permisos
7. **Publicar**: Click en "Publicar Juego" para enviar

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sidebar colapsado, layout en columna)
- **Tablet**: 640px - 1024px (sidebar estrecho, grid adaptado)
- **Desktop**: > 1024px (layout completo, grid de 4 columnas)

## 🛠️ Desarrollo

### Agregar nuevo componente UI
1. Crear archivo en `app/components/ui/Base[Nombre].vue`
2. Exportar desde componente
3. Usar en otros componentes con props tipadas

### Agregar nueva página
1. Crear archivo en `app/pages/[Nombre].vue`
2. Agregar ruta en `app/router/index.ts`
3. Agregar item de navegación en `Sidebar.vue`

### Modificar estado global
1. Crear/actualizar composable en `app/composables/`
2. Usar en componentes con `const { ... } = useComposableName()`

## 📄 Licencia

Proyecto educativo - Uso libre

## 👨‍💻 Stack Tecnológico

- **Frontend**: Vue 3 + TypeScript
- **Estilos**: Tailwind CSS (integrado mediante Vuetify)
- **Iconos**: Lucide Icons
- **Routing**: Vue Router 4
- **Estado**: Pinia (preparado)
- **Build**: Vite
- **UI Framework**: Vuetify 3 (base)

---

**Construido con ❤️ para la educación gamificada**
