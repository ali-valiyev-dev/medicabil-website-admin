import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
  const nextOrder = ref(0)
  const showAddSlideDialog = ref(false)
  const showEditDialog = ref(false)

  return {
    nextOrder,
    showAddSlideDialog,
    showEditDialog,
  }
})
