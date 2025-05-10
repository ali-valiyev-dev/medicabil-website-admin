<template>
  <q-page padding>
    <q-card flat class="row justify-between">
      <PageHeader :breadcrumbs="[{ label: 'Slider' }]" />
      <q-btn unelevated noCaps color="secondary" label="Slide Ekle" icon="add_photo_alternate" />
    </q-card>

    <Filter />
    <Table />
  </q-page>
</template>

<script setup>
import { Filter, Table } from './components'
import { PageHeader } from 'src/components'
</script>
