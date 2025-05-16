import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOnlineFormsStore = defineStore('onlineFormsStore', () => {
  const showDeleteDialog = ref(false)

  return {
    showDeleteDialog,
  }
})
