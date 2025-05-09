<template>
  <q-page padding>
    <div class="text-h5">Banner Ekle</div>
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Admin" />
      <q-breadcrumbs-el label="Banner Ekle" />
    </q-breadcrumbs>

    <q-card bordered flat class="q-pa-md q-mt-md">
      <q-form class="row">
        <q-input
          v-model="form.title"
          clearable
          placeholder="Başlık ile ara..."
          outlined
          class="col q-mr-md"
        />
        <q-select
          v-model="statusFilter"
          :options="statusOptions"
          label="Durum"
          outlined
          class="col q-mr-md"
        />
        <q-select
          v-model="sortOrder"
          :options="sortOptions"
          label="Sıralama"
          outlined
          class="col q-mr-md"
        />

        <q-input outlined v-model="formattedDate" label="Tarih Aralığı ile ara" class="col q-mr-md">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="date"
                  mask="DD.MM.YYYY"
                  @update:model-value="onDateUpdate"
                  range
                  no-unset
                  today-btn
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-btn
          noCaps
          color="secondary"
          label="Temizle"
          icon="filter_list_off"
          unelevated
          class="col-auto q-mr-sm"
          @click="resetFilters"
        />

        <q-btn
          noCaps
          color="secondary"
          label="Ekle"
          icon="add_photo_alternate"
          unelevated
          class="col-auto"
        />
      </q-form>
    </q-card>

    <q-table
      :rows="filteredRows"
      :columns="columns"
      row-key="id"
      :pagination="{ rowsPerPage: 10 }"
      separator="cell"
      flat
      bordered
      class="q-mt-md"
    >
      <template v-slot:header="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="text-white bg-secondary"
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
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { format, isWithinInterval, parse } from 'date-fns'

import { sliderData } from './data.js'
import { normalize } from 'src/utils/helpers.js'

const form = ref({
  title: '',
})

const statusFilter = ref('Hepsi')
const statusOptions = ['Hepsi', 'Aktif', 'Devre dışı']

const sortOrder = ref('Yüksek Öncelikten')
const sortOptions = ['Yüksek Öncelikten', 'Düşük Öncelikten']

const date = ref(null)
const formattedDate = ref('')

const onDateUpdate = (selectedDate) => {
  date.value = selectedDate
  updateFormattedDate()
}

const updateFormattedDate = () => {
  if (date.value) {
    if (typeof date.value === 'string') {
      formattedDate.value = date.value
    } else if (date.value.from && date.value.to) {
      formattedDate.value = `${date.value.from} / ${date.value.to}`
    }
  } else {
    formattedDate.value = ''
  }
}

const rows = ref(sliderData)

const columns = ref([
  { name: 'id', required: true, label: '#', align: 'left', field: 'id', sortable: true },
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

  if (statusFilter.value !== 'Hepsi') {
    filtered = filtered.filter((row) => row.status === statusFilter.value)
  }

  if (sortOrder.value === 'Yüksek Öncelikten') {
    filtered = filtered.sort((a, b) => b.order - a.order)
  } else if (sortOrder.value === 'Düşük Öncelikten') {
    filtered = filtered.sort((a, b) => a.order - b.order)
  }

  if (date.value) {
    if (typeof date.value === 'string') {
      filtered = filtered.filter((row) => {
        const rowDate = format(new Date(row.date), 'dd.MM.yyyy')
        return rowDate === date.value
      })
    } else if (date.value.from && date.value.to) {
      const from = parse(date.value.from, 'dd.MM.yyyy', new Date())
      const to = parse(date.value.to, 'dd.MM.yyyy', new Date())

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

function resetFilters() {
  form.value.title = ''
  statusFilter.value = 'Hepsi'
  sortOrder.value = 'Yüksek Öncelikten'
  date.value = null
  formattedDate.value = ''
}
</script>
