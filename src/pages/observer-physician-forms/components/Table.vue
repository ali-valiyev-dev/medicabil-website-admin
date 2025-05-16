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
    class="q-mt-lg my-sticky-last-column-table"
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

    <template #body-cell-image="props">
      <q-td :props="props" class="cursor-pointer" @click="showImageDialog(props.row.image)">
        <q-icon name="image" color="secondary" size="sm" />
      </q-td>
    </template>

    <template #body-cell="props">
      <q-td :props="props">
        <div class="text-body2 text-grey-9">
          {{ props.row[props.col.field] }}
        </div>
      </q-td>
    </template>

    <template #body-cell-actions="props">
      <q-td :props="props">
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

  <q-dialog v-model="imageDialog.visible">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Resim</div>
        <div class="q-mb-md flex flex-center">
          <img
            v-if="imageDialog.image"
            :src="imageDialog.image"
            style="width: 100%; height: auto"
            class="rounded-borders"
          />
          <div v-else class="text-grey-7">Resim bulunamadı</div>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          label="Kapat"
          no-caps
          unelevated
          dense
          padding="sm lg"
          color="secondary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <DeleteDialog :rowId="selectedRow.id" v-if="showDeleteDialog" />
</template>

<script setup>
import { ref } from 'vue'
import { sampleData } from '../data'
import { useOnlineFormsStore } from 'src/stores/dialogs/onlineFormsStore'
import { storeToRefs } from 'pinia'
import { DeleteDialog } from '../components'

const { showDeleteDialog } = storeToRefs(useOnlineFormsStore())

const rows = ref(sampleData)
const selectedRow = ref(null)
const imageDialog = ref({
  visible: false,
  image: null,
})

const columns = ref([
  { name: 'id', label: '#', align: 'center', field: 'id' },
  { name: 'name', label: 'Ad Soyad', align: 'center', field: 'name' },
  { name: 'gender', label: 'Cinsiyet', align: 'center', field: 'gender' },
  { name: 'image', label: 'Resim', align: 'center', field: 'image' },
  { name: 'passport', label: 'Pasaport', align: 'center', field: 'passport' },
  { name: 'citizwn', label: 'Uyruk', align: 'center', field: 'citizwn' },
  { name: 'residence', label: 'İkamet', align: 'center', field: 'residence' },
  { name: 'birthDate', label: 'Doğum Tarihi', align: 'center', field: 'birthDate' },
  { name: 'email', label: 'E-posta', align: 'center', field: 'email' },
  { name: 'phone', label: 'Telefon', align: 'center', field: 'phone' },
  { name: 'workAdress', label: 'Çalışma Adresi', align: 'center', field: 'workAdress' },
  { name: 'workTitle', label: 'Unvan', align: 'center', field: 'workTitle' },
  { name: 'arriveDate', label: 'Geliş Tarihi', align: 'center', field: 'arriveDate' },
  { name: 'departureDate', label: 'Ayrılış Tarihi', align: 'center', field: 'departureDate' },
  { name: 'placeOfStay', label: 'Konaklama Yeri', align: 'center', field: 'placeOfStay' },
  { name: 'feverorChills', label: 'Ateş/Titreme', align: 'center', field: 'feverorChills' },
  {
    name: 'vomitedOrHadDiarrhoea',
    label: 'Kusma/İshal',
    align: 'left',
    field: 'vomitedOrHadDiarrhoea',
  },
  {
    name: 'chronicDiseaseOrConditio',
    label: 'Kronik Hastalık',
    align: 'left',
    field: 'chronicDiseaseOrConditio',
  },
  {
    name: 'otherHealthProblems',
    label: 'Diğer Sağlık Sorunları',
    align: 'left',
    field: 'otherHealthProblems',
  },
  {
    name: 'mainSurgicalInterests',
    label: 'Cerrahi İlgi Alanları',
    align: 'left',
    field: 'mainSurgicalInterests',
  },
  { name: 'sozlesme', label: 'Sözleşme', align: 'left', field: 'sozlesme' },
  { name: 'kvkk', label: 'KVKK', align: 'left', field: 'kvkk' },
  { name: 'actions', label: 'İşlem', align: 'center' },
])

function deleteRow(row) {
  selectedRow.value = row
  showDeleteDialog.value = true
}

function showImageDialog(imageUrl) {
  imageDialog.value.image = imageUrl
  imageDialog.value.visible = true
}
</script>

<style lang="scss">
.q-table {
  th:last-child,
  td:last-child {
    background-color: #fff;
    position: sticky;
    right: 0;
    z-index: 1;
  }
}
</style>
