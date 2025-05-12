<template>
  <q-dialog v-model="showEditDialog" persistent>
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Düzenle</div>
        <q-form class="column">
          <q-input v-model="form.title" label="Başlık" autogrow outlined />

          <q-input v-model="form.description" label="Açıklama" outlined />

          <q-uploader
            ref="uploaderRef"
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
          dense
          padding="sm lg"
          color="red-5"
          class="col"
          @click="showEditDialog = false"
        />

        <q-btn
          label="Kaydet"
          no-caps
          unelevated
          dense
          padding="sm lg"
          color="secondary"
          @click="editSlide"
          class="col"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDialogStore } from 'src/stores/dialogStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  row: Object,
})

const { showEditDialog } = storeToRefs(useDialogStore())

const form = ref({})
const uploaderRef = ref(null)

onMounted(async () => {
  form.value = props.row

  const response = await fetch(form.value.image)
  const blob = await response.blob()
  const file = new File([blob], form.value.image, { type: blob.type })

  uploaderRef.value.addFiles([file])
})

const editSlide = () => {
  console.log('Form data:', form.value)
  showEditDialog.value = false
}
</script>

<style scoped>
.q-form {
  gap: 16px;
}
</style>
