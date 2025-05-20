<template>
  <q-page padding>
    <q-card flat class="row justify-between">
      <PageHeader :breadcrumbs="[{ label: 'Dergi' }]" />
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
import { useMagazineStore } from 'src/stores/dialogs/magazineStore'
import { storeToRefs } from 'pinia'
import { Filter, Table, AddDialog } from './components'
import { PageHeader } from 'src/components'

const { showAddDialog } = storeToRefs(useMagazineStore())
</script>
