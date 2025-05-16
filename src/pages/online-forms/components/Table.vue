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

    <template #body-cell-message="props">
      <q-td :props="props" class="cursor-pointer" @click="showMessageDialog(props.row.message)">
        <q-icon name="message" color="secondary" size="sm" />
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

  <q-dialog v-model="messageDialog.visible">
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Mesaj</div>

        <div class="text-body1 text-grey-8">
          {{ messageDialog.text }}
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
const messageDialog = ref({
  visible: false,
  text: '',
})

const columns = ref([
  { name: 'id', label: '#', align: 'left', field: 'id' },
  { name: 'name', label: 'Ad Soyad', align: 'left', field: 'name' },
  { name: 'email', label: 'E-posta', align: 'left', field: 'email' },
  { name: 'phone', label: 'Telefon', align: 'left', field: 'phone' },
  { name: 'message', label: 'Mesaj', align: 'center', field: 'message' },
  { name: 'unit', label: 'Ünite', align: 'left', field: 'unit' },
  { name: 'date', label: 'Tarih', align: 'center', field: 'date' },
  { name: 'time', label: 'Saat', align: 'center', field: 'time' },
  { name: 'confirmDate', label: 'Onay Tarihi', align: 'center', field: 'confirmDate' },
  { name: 'actionStatus', label: 'Durum', align: 'center', field: 'actionStatus' },
  { name: 'paymentDetails', label: 'Ödeme Detayları', align: 'center', field: 'paymentDetails' },
  { name: 'createdAt', label: 'Oluşturulma Tarihi', align: 'center', field: 'createdAt' },
  { name: 'actions', label: 'İşlem', align: 'center' },
])

function deleteRow(row) {
  selectedRow.value = row
  showDeleteDialog.value = true
}

function showMessageDialog(message) {
  messageDialog.value.text = message
  messageDialog.value.visible = true
}
</script>
