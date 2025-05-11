<template>
  <q-page padding>
    <q-card flat class="row justify-between">
      <PageHeader :breadcrumbs="[{ label: 'Slider' }]" />
      <q-btn
        unelevated
        noCaps
        color="secondary"
        label="Slide Ekle"
        icon="add_photo_alternate"
        @click="dialogStore.openDialog"
      />
    </q-card>

    <Filter />
    <Table />
    <AddSlideDialog v-if="dialogStore.showDialog" />
  </q-page>
</template>

<script setup>
import { Filter, Table, AddSlideDialog } from './components'
import { PageHeader } from 'src/components'
import { useDialogStore } from 'src/stores/dialogStore'

const dialogStore = useDialogStore()
</script>
