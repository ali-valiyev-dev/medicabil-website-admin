import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useObserverPhysicianForms = defineStore('observerPhysicianForms', () => {
  const showDeleteDialog = ref(false)

  return {
    showDeleteDialog,
  }
})
