<template>
  <q-page padding>
    <q-card flat class="row justify-between">
      <PageHeader :breadcrumbs="[{ label: 'Online Formlar' }]" />
    </q-card>

    <Table />
  </q-page>
</template>

<script setup>
import { Table } from './components'
import { PageHeader } from 'src/components'
</script>
