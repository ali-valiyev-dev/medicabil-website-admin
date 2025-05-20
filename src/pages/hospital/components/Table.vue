<template>
  <q-table
    :rows="filteredRows"
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

    <template #body-cell-image="props">
      <q-td :props="props">
        <q-img :src="props.row.image" alt="Görsel" />
      </q-td>
    </template>

    <template #body-cell-status="props">
      <q-td :props="props">
        <div class="text-body2" :class="props.row.isActive ? 'text-secondary' : 'text-red-5'">
          {{ props.row.isActive ? 'Aktif' : 'Devre dışı' }}
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
import { ref, computed } from 'vue'
import { sampleData } from '../data'
import { normalize } from 'src/utils/helpers'
import { useFilterStore } from 'src/stores/filterStore'
import { useHospitalStore } from 'src/stores/dialogs/hospitalStore'
import { storeToRefs } from 'pinia'
import { EditDialog, DeleteDialog } from '../components'

const { form } = storeToRefs(useFilterStore())
const { nextOrder, showEditDialog, showDeleteDialog } = storeToRefs(useHospitalStore())

nextOrder.value =
  sampleData?.length > 0 ? Math.max(...sampleData.map((slide) => slide.order)) + 1 : 1

const rows = ref(sampleData)
const selectedRow = ref(null)

const columns = ref([
  { name: 'id', label: '#', align: 'left', field: 'id' },
  { name: 'title', label: 'Başlık', align: 'left', field: 'title' },
  { name: 'description', label: 'Açıklama', align: 'left', field: 'description' },
  { name: 'image', label: 'Görsel', align: 'center', field: 'image' },
  { name: 'status', label: 'Durum', align: 'center', field: 'status' },
  { name: 'order', label: 'Sıralama', align: 'center', field: 'order' },
  { name: 'actions', label: 'İşlem', align: 'center' },
])

const filteredRows = computed(() => {
  const { title, statusFilter, sortOrder } = form.value
  let filtered = rows.value

  if (title) {
    filtered = filtered.filter((row) => normalize(row.title).includes(normalize(title)))
  }

  if (statusFilter === 'Aktif') {
    filtered = filtered.filter((row) => row.isActive === true)
  } else if (statusFilter === 'Devre dışı') {
    filtered = filtered.filter((row) => row.isActive === false)
  }

  if (sortOrder === 'Yüksek Öncelikten') {
    filtered = filtered.sort((a, b) => b.order - a.order)
  } else {
    filtered = filtered.sort((a, b) => a.order - b.order)
  }

  return filtered
})

function editRow(row) {
  selectedRow.value = row
  showEditDialog.value = true
}

function deleteRow(row) {
  selectedRow.value = row
  showDeleteDialog.value = true
}
</script>
