<template>
  <q-dialog v-model="dialogStore.showDialog" persistent>
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Yeni Slide Ekle</div>
        <q-form class="column">
          <q-input v-model="form.title" label="Başlık" autogrow autofocus outlined />

          <q-input v-model="form.description" label="Açıklama" type="textarea" outlined />

          <q-select v-model="form.language" :options="languages" label="Dil" outlined />

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
              v-model="form.active"
              :label="form.active"
              color="secondary"
              checked-icon="check"
              unchecked-icon="close"
              false-value="Devre dışı"
              true-value="Aktif"
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
          dense
          padding="sm lg"
          color="red-5"
          class="col"
          @click="dialogStore.closeDialog"
        />

        <q-btn
          label="Kaydet"
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
import { onMounted, ref } from 'vue'
import { useDialogStore } from 'src/stores/dialogStore'

const dialogStore = useDialogStore()

const languages = ['Türkçe', 'İngilizce', 'Rusça', 'Arapça', 'Arnavutça']

const form = ref({
  title: '',
  description: '',
  language: 'Türkçe',
  image: null,
  targetLink: '',
  active: 'Aktif',
  buttonTitle: '',
  order: dialogStore.nextOrder,
})

const addSlide = () => {
  console.log('Form data:', form.value)
  dialogStore.closeDialog()
}

onMounted(() => {
  console.log('Dialog mounted')
})
</script>

<style scoped>
.q-form {
  gap: 16px;
}
</style>
