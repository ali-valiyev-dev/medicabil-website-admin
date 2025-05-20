<template>
  <q-dialog v-model="showDeleteDialog" persistent>
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Sil</div>

        <div class="text-body1 text-grey-8">
          Silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
        </div>
      </q-card-section>

      <q-card-actions class="q-pa-md">
        <q-btn
          label="İptal"
          no-caps
          unelevated
          outline
          dense
          padding="sm lg"
          color="grey-9"
          class="col"
          @click="showDeleteDialog = false"
        />

        <q-btn
          label="Onayla"
          no-caps
          unelevated
          dense
          padding="sm lg"
          color="red-5"
          @click="deleteItem"
          class="col"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useMagazineStore } from 'src/stores/dialogs/magazineStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  rowId: Number,
})

const { showDeleteDialog } = storeToRefs(useMagazineStore())

const deleteItem = () => {
  console.log('Deleting slide with ID:', props.rowId)
  showDeleteDialog.value = false
}
</script>

<style scoped>
.q-form {
  gap: 16px;
}
</style>
