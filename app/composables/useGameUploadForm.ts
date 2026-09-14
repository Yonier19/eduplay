import { reactive } from 'vue'
import type { UploadGameForm } from '@/types/game'

export function useGameUploadForm() {
  const form = reactive<UploadGameForm>({
    name: '',
    description: '',
    category: '',
    subject: '',
    age: '',
    platform: '',
    difficulty: '',
    tags: [],
    gameFile: null,
    coverImage: null,
    screenshots: [],
    visibility: 'public',
    comments: true,
    ratings: true
  })

  const errors = reactive<Record<string, string>>({})

  const validateForm = (): boolean => {
    errors.name = ''
    errors.description = ''
    errors.category = ''
    errors.subject = ''
    errors.age = ''
    errors.difficulty = ''
    errors.gameFile = ''

    if (!form.name.trim()) {
      errors.name = 'El nombre del juego es requerido'
    }

    if (!form.description.trim()) {
      errors.description = 'La descripción es requerida'
    } else if (form.description.length < 10) {
      errors.description = 'La descripción debe tener al menos 10 caracteres'
    }

    if (!form.category) {
      errors.category = 'Debes seleccionar una categoría'
    }

    if (!form.subject) {
      errors.subject = 'Debes seleccionar el nivel educativo'
    }

    if (!form.age) {
      errors.age = 'Debes seleccionar el rango de edad'
    }

    if (!form.difficulty) {
      errors.difficulty = 'Debes seleccionar la dificultad'
    }

    if (!form.gameFile) {
      errors.gameFile = 'Debes subir el código HTML del juego'
    }

    return Object.values(errors).every(error => !error)
  }

  const submit = async (): Promise<boolean> => {
    if (!validateForm()) {
      return false
    }

    // Simular envío
    console.log('Formulario válido. Datos:', form)
    return true
  }

  const saveDraft = () => {
    // Guardar en localStorage
    const draft = JSON.stringify(form)
    localStorage.setItem('gameUploadDraft', draft)
    console.log('Borrador guardado')
  }

  const loadDraft = () => {
    const draft = localStorage.getItem('gameUploadDraft')
    if (draft) {
      const parsed = JSON.parse(draft)
      Object.assign(form, parsed)
      return true
    }
    return false
  }

  const reset = () => {
    form.name = ''
    form.description = ''
    form.category = ''
    form.subject = ''
    form.age = ''
    form.platform = ''
    form.difficulty = ''
    form.tags = []
    form.gameFile = null
    form.coverImage = null
    form.screenshots = []
    form.visibility = 'public'
    form.comments = true
    form.ratings = true
    Object.keys(errors).forEach(key => {
      errors[key] = ''
    })
  }

  return {
    form,
    errors,
    validateForm,
    submit,
    saveDraft,
    loadDraft,
    reset
  }
}
