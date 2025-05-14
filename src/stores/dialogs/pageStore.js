import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePageStore = defineStore('pageStore', () => {
  const nextOrder = ref(0)
  const showAddDialog = ref(false)
  const showEditDialog = ref(false)
  const showDeleteDialog = ref(false)

  return {
    nextOrder,
    showAddDialog,
    showEditDialog,
    showDeleteDialog,
  }
})
