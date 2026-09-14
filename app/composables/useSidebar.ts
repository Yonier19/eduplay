import { ref } from 'vue'

export function useSidebar() {
  const sidebarOpen = ref(true)
  const sidebarCollapsed = ref(false)

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const collapseSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  return {
    sidebarOpen,
    sidebarCollapsed,
    toggleSidebar,
    collapseSidebar
  }
}
