import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterStore = defineStore('filter', () => {
  const form = ref({
    sortOrder: 'Yüksek Öncelikten',
    statusFilter: 'Tümü',
  })

  const resetForm = () => {
    form.value = {
      title: '',
      sortOrder: 'Yüksek Öncelikten',
      statusFilter: 'Tümü',
      date: null,
    }
  }

  return { form, resetForm }
})
