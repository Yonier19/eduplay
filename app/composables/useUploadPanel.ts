import { ref } from 'vue'

const uploadPanelOpen = ref(false)
const loading = ref(false)
const success = ref(false)
const error = ref('')

const openUploadPanel = () => {
  uploadPanelOpen.value = true
}

const closeUploadPanel = () => {
  uploadPanelOpen.value = false
  resetState()
}

const setLoading = (value: boolean) => {
  loading.value = value
}

const setSuccess = (value: boolean) => {
  success.value = value
}

const setError = (message: string) => {
  error.value = message
}

const resetState = () => {
  loading.value = false
  success.value = false
  error.value = ''
}

export function useUploadPanel() {
  return {
    uploadPanelOpen,
    loading,
    success,
    error,
    openUploadPanel,
    closeUploadPanel,
    setLoading,
    setSuccess,
    setError,
    resetState
  }
}
