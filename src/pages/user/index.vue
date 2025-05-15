<template>
  <q-page padding>
    <q-card flat class="row justify-between">
      <PageHeader :breadcrumbs="[{ label: 'Kullanıcı' }]" />
      <q-btn
        unelevated
        noCaps
        color="secondary"
        label="Yeni Ekle"
        icon="fa-solid fa-plus"
        @click="showAddDialog = true"
      />
    </q-card>

    <Table />
    <AddDialog v-if="showAddDialog" />
  </q-page>
</template>

<script setup>
import { useUserStore } from 'src/stores/dialogs/userStore'
import { storeToRefs } from 'pinia'
import { Table, AddDialog } from './components'
import { PageHeader } from 'src/components'

const { showAddDialog } = storeToRefs(useUserStore())
</script>
