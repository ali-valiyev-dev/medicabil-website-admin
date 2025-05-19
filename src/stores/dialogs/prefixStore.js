import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePrefixStore = defineStore('prefixStore', () => {
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
