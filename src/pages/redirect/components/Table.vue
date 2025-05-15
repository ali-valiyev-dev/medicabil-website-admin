<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="id"
    :pagination="{ rowsPerPage: 10 }"
    separator="cell"
    flat
    bordered
    dense
    class="q-mt-lg"
  >
    <template #header="props">
      <q-th
        v-for="col in props.cols"
        :key="col.name"
        :props="props"
        class="text-body1 text-white bg-light-blue-9"
      >
        {{ col.label }}
      </q-th>
    </template>

    <template #body-cell="props">
      <q-td :props="props">
        <div class="text-body2 text-grey-9">
          {{ props.row[props.col.field] }}
        </div>
      </q-td>
    </template>

    <template #body-cell-date="props">
      <q-td :props="props">
        <div class="text-body2 text-grey-9">
          {{ format(new Date(props.row.date), 'dd.MM.yyyy') }}
        </div>
      </q-td>
    </template>

    <template #body-cell-actions="props">
      <q-td :props="props" style="width: 200px">
        <q-btn
          label="Düzenle"
          no-caps
          unelevated
          dense
          padding="xs md"
          color="secondary"
          class="q-mr-sm"
          @click="editRow(props.row)"
        />
        <q-btn
          label="Sil"
          no-caps
          unelevated
          dense
          padding="xs md"
          color="red-5"
          @click="deleteRow(props.row)"
        />
      </q-td>
    </template>

    <template #no-data>
      <div class="full-width text-center flex items-center text-grey-8">
        <div class="row items-center q-mx-auto text-body1 q-py-sm">
          <q-icon name="warning" size="sm" color="warning" class="q-mr-xs" /> Sonuç bulunamadı
        </div>
      </div>
    </template>
  </q-table>

  <EditDialog :row="selectedRow" v-if="showEditDialog" />
  <DeleteDialog :rowId="selectedRow.id" v-if="showDeleteDialog" />
</template>

<script setup>
import { ref } from 'vue'
import { format } from 'date-fns'
import { sampleData } from '../data'
import { useRedirectStore } from 'src/stores/dialogs/redirectStore'
import { storeToRefs } from 'pinia'
import { EditDialog, DeleteDialog } from '../components'

const { showEditDialog, showDeleteDialog } = storeToRefs(useRedirectStore())

const rows = ref(sampleData)
const selectedRow = ref(null)

const columns = ref([
  { name: 'id', label: '#', align: 'left', field: 'id' },
  { name: 'newUrl', label: 'Yeni URL', align: 'left', field: 'newUrl' },
  { name: 'oldUrl', label: 'Eski URL', align: 'left', field: 'oldUrl' },
  { name: 'date', label: 'Tarih', align: 'center', field: 'date' },
  { name: 'actions', label: 'İşlem', align: 'center' },
])

function editRow(row) {
  selectedRow.value = row
  showEditDialog.value = true
}

function deleteRow(row) {
  selectedRow.value = row
  showDeleteDialog.value = true
}
</script>
