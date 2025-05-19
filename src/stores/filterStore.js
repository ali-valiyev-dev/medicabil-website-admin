import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterStore = defineStore('filter', () => {
  const form = ref({
    title: '',
    date: null,
  })

  const resetForm = () => {
    form.value = {
      title: '',
      date: null,
    }
  }

  return { form, resetForm }
})
