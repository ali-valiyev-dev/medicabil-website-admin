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
        @click="showAddSlideDialog = true"
      />
    </q-card>

    <Filter />
    <Table />
    <AddSlideDialog v-if="showAddSlideDialog" />
  </q-page>
</template>

<script setup>
import { useDialogStore } from 'src/stores/dialogStore'
import { storeToRefs } from 'pinia'
import { Filter, Table, AddSlideDialog } from './components'
import { PageHeader } from 'src/components'

const { showAddSlideDialog } = storeToRefs(useDialogStore())
</script>
