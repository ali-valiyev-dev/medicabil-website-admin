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
    <template v-slot:header="props">
      <q-th
        v-for="col in props.cols"
        :key="col.name"
        :props="props"
        class="text-body1 text-white bg-light-blue-9"
      >
        {{ col.label }}
      </q-th>
    </template>

    <template v-slot:body-cell-image="props">
      <q-td :props="props">
        <q-img :src="props.row.image" alt="Görsel" />
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props" style="width: 200px">
        <q-btn
          label="Düzenle"
          no-caps
          unelevated
          dense
          padding="xs md"
          color="secondary"
          class="q-mr-sm"
          @click="editRow(row)"
        />
        <q-btn
          label="Sil"
          no-caps
          unelevated
          dense
          padding="xs md"
          color="red-5"
          @click="deleteRow(row)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref, computed } from 'vue'
import { format, isWithinInterval, parse } from 'date-fns'
import { sliderData } from '../data'
import { normalize } from 'src/utils/helpers'
import { useFilterStore } from 'src/stores/filterStore'
import { storeToRefs } from 'pinia'

const { form } = storeToRefs(useFilterStore())

const rows = ref(sliderData)

const columns = ref([
  { name: 'title', required: true, label: 'Başlık', align: 'left', field: 'title', sortable: true },
  { name: 'description', label: 'Açıklama', align: 'left', field: 'description', sortable: true },
  { name: 'image', label: 'Görsel', align: 'center', field: 'image', sortable: false },
  { name: 'status', label: 'Durum', align: 'center', field: 'status', sortable: true },
  { name: 'order', label: 'Sıralama', align: 'center', field: 'order', sortable: true },
  {
    name: 'date',
    label: 'Tarih',
    align: 'center',
    field: 'date',
    format: (val) => {
      return format(new Date(val), 'dd.MM.yyyy')
    },
    sortable: true,
  },
  { name: 'actions', label: 'İşlem', align: 'center' },
])

const filteredRows = computed(() => {
  let filtered = rows.value

  if (form.value.title) {
    filtered = filtered.filter((row) => normalize(row.title).includes(normalize(form.value.title)))
  }

  if (form.value.statusFilter !== 'Hepsi') {
    filtered = filtered.filter((row) => row.status === form.value.statusFilter)
  }

  if (form.value.sortOrder === 'Yüksek Öncelikten') {
    filtered = filtered.sort((a, b) => b.order - a.order)
  } else if (form.value.sortOrder === 'Düşük Öncelikten') {
    filtered = filtered.sort((a, b) => a.order - b.order)
  }

  if (form.value.date) {
    if (typeof form.value.date === 'string') {
      filtered = filtered.filter((row) => {
        const rowDate = format(new Date(row.date), 'dd.MM.yyyy')
        return rowDate === form.value.date
      })
    } else if (form.value.date.from && form.value.date.to) {
      const from = parse(form.value.date.from, 'dd.MM.yyyy', new Date())
      const to = parse(form.value.date.to, 'dd.MM.yyyy', new Date())

      filtered = filtered.filter((row) => {
        const rowDate = new Date(row.date)
        return isWithinInterval(rowDate, { start: from, end: to })
      })
    }
  }

  return filtered
})

function editRow(row) {
  console.log('Edit:', row)
}

function deleteRow(row) {
  console.log('Delete:', row)
}
</script>
