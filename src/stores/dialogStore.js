import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
  const nextOrder = ref(0)
  const showDialog = ref(false)

  const openDialog = () => {
    showDialog.value = true
  }

  const closeDialog = () => {
    showDialog.value = false
  }

  return {
    nextOrder,
    showDialog,
    openDialog,
    closeDialog,
  }
})
