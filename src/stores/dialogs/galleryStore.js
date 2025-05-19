import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGalleryStore = defineStore('galleryStore', () => {
  const showAddDialog = ref(false)
  const showEditDialog = ref(false)
  const showDeleteDialog = ref(false)

  return {
    showAddDialog,
    showEditDialog,
    showDeleteDialog,
  }
})
