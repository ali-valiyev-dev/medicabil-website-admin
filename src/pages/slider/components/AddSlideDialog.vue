<template>
  <q-dialog v-model="showAddSlideDialog" persistent>
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Yeni Slide Ekle</div>
        <q-form class="column">
          <q-input v-model="form.title" label="Başlık" autogrow autofocus outlined />

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

          <q-input v-model="form.targetLink" label="Hedef Bağlantı" autogrow outlined />

          <q-input v-model="form.buttonTitle" label="Buton Başlığı" autogrow outlined />

          <div class="row no-wrap items-center">
            <q-input v-model="form.order" type="number" outlined class="col">
              <template v-slot:prepend>
                <div class="text-body1">Sıralama Numarası:</div>
              </template>
            </q-input>

            <q-toggle
              v-model="form.isActive"
              :label="form.isActive ? 'Aktif' : 'Devre dışı'"
              color="secondary"
              checked-icon="check"
              unchecked-icon="close"
              size="xl"
              class="col flex-center"
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
          @click="showAddSlideDialog = false"
        />

        <q-btn
          label="Ekle"
          no-caps
          unelevated
          dense
          padding="sm lg"
          color="secondary"
          @click="addSlide"
          class="col"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useDialogStore } from 'src/stores/dialogStore'
import { storeToRefs } from 'pinia'

const { nextOrder, showAddSlideDialog } = storeToRefs(useDialogStore())

const form = ref({
  title: '',
  date: new Date(),
  description: '',
  image: null,
  targetLink: '',
  buttonTitle: '',
  order: nextOrder.value,
  isActive: true,
})

const addSlide = () => {
  console.log('Form data:', form.value)
  showAddSlideDialog.value = false
}
</script>

<style scoped>
.q-form {
  gap: 16px;
}
</style>
