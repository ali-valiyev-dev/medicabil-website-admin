<template>
  <q-dialog v-model="showAddDialog" persistent>
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Yeni Ekle</div>
        <q-form class="column">
          <q-input v-model="form.oldUrl" label="Eski URL" autofocus outlined />
          <q-input v-model="form.newUrl" label="Yeni URL" outlined />
        </q-form>
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
          @click="showAddDialog = false"
        />

        <q-btn
          label="Ekle"
          no-caps
          unelevated
          dense
          padding="sm lg"
          color="secondary"
          @click="addItem"
          class="col"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useRedirectStore } from 'src/stores/dialogs/redirectStore'
import { storeToRefs } from 'pinia'

const { showAddDialog } = storeToRefs(useRedirectStore())

const form = ref({
  oldUrl: 'https://www.medicabil.com/',
  newUrl: 'https://www.medicabil.com/',
})

const addItem = () => {
  console.log('Form data:', form.value)
  showAddDialog.value = false
}
</script>

<style scoped>
.q-form {
  gap: 16px;
}
</style>
