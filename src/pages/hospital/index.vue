<template>
  <q-page padding>
    <q-card flat class="row justify-between">
      <PageHeader :breadcrumbs="[{ label: 'Hastane Liste İşlemleri' }]" />
      <q-btn
        unelevated
        noCaps
        color="secondary"
        label="Yeni Ekle"
        icon="fa-solid fa-plus"
        @click="showAddDialog = true"
      />
    </q-card>

    <Filter />
    <Table />
    <AddDialog v-if="showAddDialog" />
  </q-page>
</template>

<script setup>
import { useHospitalStore } from 'src/stores/dialogs/hospitalStore'
import { storeToRefs } from 'pinia'
import { Filter, Table, AddDialog } from './components'
import { PageHeader } from 'src/components'

const { showAddDialog } = storeToRefs(useHospitalStore())
</script>
