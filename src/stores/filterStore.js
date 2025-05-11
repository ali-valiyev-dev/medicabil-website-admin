import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterStore = defineStore('filter', () => {
  const form = ref({
    title: '',
    statusFilter: 'Hepsi',
    sortOrder: 'Yüksek Öncelikten',
    date: null,
  })

  const resetFilters = () => {
    form.value = {
      title: '',
      statusFilter: 'Hepsi',
      sortOrder: 'Yüksek Öncelikten',
      date: null,
    }
  }

  return { form, resetFilters }
})
