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
import { ref, computed } from 'vue'
import { format, isWithinInterval, parse } from 'date-fns'
import { sampleData } from '../data'
import { normalize } from 'src/utils/helpers'
import { useFilterStore } from 'src/stores/filterStore'
import { useGalleryStore } from 'src/stores/dialogs/galleryStore'
import { storeToRefs } from 'pinia'
import { EditDialog, DeleteDialog } from '../components'

const { form } = storeToRefs(useFilterStore())
const { showEditDialog, showDeleteDialog } = storeToRefs(useGalleryStore())

const rows = ref(sampleData)
const selectedRow = ref(null)

const columns = ref([
  { name: 'id', label: '#', align: 'left', field: 'id' },
  { name: 'description', label: 'Açıklama', align: 'left', field: 'description' },
  { name: 'targetLink', label: 'Hedef Bağlantı', align: 'left', field: 'targetLink' },
  { name: 'image', label: 'Görsel', align: 'center', field: 'image' },
  { name: 'date', label: 'Tarih', align: 'center', field: 'date' },
  { name: 'actions', label: 'İşlem', align: 'center' },
])

const filteredRows = computed(() => {
  const { description, date } = form.value
  let filtered = rows.value

  if (description) {
    filtered = filtered.filter((row) => normalize(row.description).includes(normalize(description)))
  }

  if (date) {
    if (typeof date === 'string') {
      filtered = filtered.filter((row) => {
        const rowDate = format(new Date(row.date), 'dd.MM.yyyy')
        return rowDate === date
      })
    } else if (date.from && date.to) {
      const from = parse(date.from, 'dd.MM.yyyy', new Date())
      const to = parse(date.to, 'dd.MM.yyyy', new Date())

      filtered = filtered.filter((row) => {
        const rowDate = new Date(row.date)
        const adjustedTo = new Date(to)

        return isWithinInterval(rowDate, {
          start: from,
          end: adjustedTo.setDate(adjustedTo.getDate() + 1),
        })
      })
    }
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
