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
import { useFilterStore } from 'src/stores/filterStore'
import { storeToRefs } from 'pinia'

const { form } = storeToRefs(useFilterStore())
const { resetForm } = useFilterStore()

const statusOptions = ['Hepsi', 'Aktif', 'Devre dışı']
const sortOptions = ['Yüksek Öncelikten', 'Düşük Öncelikten']
</script>

<style scoped>
.date-input {
  border: none;
  border: 1px solid #ccc;
}
</style>
