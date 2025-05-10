<template>
  <q-form class="row q-mt-lg">
    <q-input v-model="form.title" clearable label="Başlık" outlined class="col q-mr-md" />
    <q-select
      v-model="form.statusFilter"
      :options="statusOptions"
      label="Durum"
      outlined
      class="col q-mr-md"
    />
    <q-select
      v-model="form.sortOrder"
      :options="sortOptions"
      label="Sıralama"
      outlined
      class="col q-mr-md"
    />

    <q-input
      readonly
      borderless
      v-model="formattedDate"
      label="Tarih Aralığı"
      class="date-input col q-mr-md q-px-md rounded-borders"
    >
      <template v-slot:append>
        <q-icon name="cancel" class="cursor-pointer q-mr-xs" @click="form.date = null" />

        <q-icon name="event" color="secondary" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="form.date" mask="DD.MM.YYYY" range minimal>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-btn
      noCaps
      color="secondary"
      label="Temizle"
      icon="filter_list_off"
      unelevated
      class="col-auto"
      @click="resetForm"
    />
  </q-form>
</template>

<script setup>
import { computed } from 'vue'
import { useFilterStore } from 'src/stores/filterStore'
import { storeToRefs } from 'pinia'

const { form } = storeToRefs(useFilterStore())
const { resetForm } = useFilterStore()

const formattedDate = computed(() => {
  if (form.value.date) {
    if (typeof form.value.date === 'string') {
      return form.value.date
    } else if (form.value.date.from && form.value.date.to) {
      return `${form.value.date.from} - ${form.value.date.to}`
    }
  }
  return ''
})

const statusOptions = ['Hepsi', 'Aktif', 'Devre dışı']
const sortOptions = ['Yüksek Öncelikten', 'Düşük Öncelikten']
</script>

<style scoped>
.date-input {
  border: none;
  border: 1px solid #ccc;
}
</style>
