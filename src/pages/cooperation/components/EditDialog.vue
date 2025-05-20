<template>
  <q-dialog v-model="showEditDialog" persistent>
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Düzenle</div>
        <q-form class="column">
          <q-input v-model="form.title" label="Başlık" autofocus outlined />
          <q-input v-model="form.website" label="Website" outlined />

          <q-uploader
            v-model="form.image"
            label="Dosyaları yüklemek için buraya bırakın"
            max-files="1"
            flat
            bordered
            hide-upload-btn
            class="full-width"
            thumbnail-fit="contain"
            color="secondary"
          />
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
          @click="showEditDialog = false"
        />

        <q-btn
          label="Düzenle"
          no-caps
          unelevated
          dense
          padding="sm lg"
          color="secondary"
          @click="editItem"
          class="col"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCooperationStore } from 'src/stores/dialogs/cooperationStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  row: Object,
})

const { showEditDialog } = storeToRefs(useCooperationStore())

const form = ref({})
const uploaderRef = ref(null)

const editItem = () => {
  console.log('Form data:', form.value)
  showEditDialog.value = false
}

onMounted(async () => {
  form.value = { ...props.row }

  const response = await fetch(form.value.image)
  const blob = await response.blob()
  const file = new File([blob], form.value.image, { type: blob.type })

  uploaderRef.value.addFiles([file])
})
</script>

<style scoped>
.q-form {
  gap: 16px;
}
</style>
