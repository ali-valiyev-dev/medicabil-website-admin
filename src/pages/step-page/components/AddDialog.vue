<template>
  <q-dialog v-model="showAddDialog" persistent>
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Yeni Ekle</div>
        <q-form class="column">
          <q-input v-model="form.title" label="Başlık" autofocus outlined />

          <q-input v-model="form.description" label="Açıklama" type="textarea" outlined />

          <q-uploader
            v-model="form.image"
            label="Dosyaları yüklemek için buraya bırakın"
            max-files="1"
            flat
            bordered
            hide-upload-btn
            class="full-width"
            thumbnail-fit="contain"
          />

          <div class="row no-wrap">
            <q-input v-model="form.targetLink" label="Hedef Bağlantı" outlined class="col" />

            <q-toggle
              v-model="form.isActive"
              :label="form.isActive ? 'Aktif' : 'Devre dışı'"
              color="secondary"
              checked-icon="check"
              unchecked-icon="close"
              size="xl"
              class="col-4 flex-center"
            />
          </div>
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
import { useStepPageStore } from 'src/stores/dialogs/stepPageStore'
import { storeToRefs } from 'pinia'

const { showAddDialog } = storeToRefs(useStepPageStore())

const form = ref({
  title: '',
  date: new Date(),
  description: '',
  image: null,
  targetLink: '',
  buttonTitle: '',
  isActive: true,
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
