<template>
  <q-dialog v-model="showEditDialog" persistent>
    <q-card style="width: 100%">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Düzenle</div>
        <q-form class="column">
          <q-input v-model="form.title" label="Başlık" outlined />
          <q-input v-model="form.folderUrl" label="Klasör URL" outlined />

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

          <q-select
            v-model="form.groupTitle"
            use-input
            clearable
            label="Grup Başlığı"
            outlined
            class="col"
            :options="groupTitleOptions"
            @filter="filterBranches"
          />

          <div class="row no-wrap">
            <q-input
              v-model="form.order"
              type="number"
              outlined
              class="q-mr-md"
              style="max-width: 250px"
            >
              <template #prepend>
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
              class="q-mx-auto"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          label="İptal"
          no-caps
          unelevated
          outline
          dense
          padding="sm lg"
          color="grey-9"
          class="col-2"
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
          class="col-2"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMagazineStore } from 'src/stores/dialogs/magazineStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  row: Object,
})

const { showEditDialog } = storeToRefs(useMagazineStore())

const form = ref({})
const uploaderRef = ref(null)
const groupTitleOptions = ref(['2022 Dergiler', 'E-Kitap'])

const filterBranches = (val, update) => {
  update(() => {
    const needle = val.toLowerCase()
    groupTitleOptions.value = ['2022 Dergiler', 'E-Kitap'].filter((option) =>
      option.toLowerCase().includes(needle),
    )
  })
}

onMounted(async () => {
  form.value = { ...props.row }

  const response = await fetch(form.value.image)
  const blob = await response.blob()
  const file = new File([blob], form.value.image, { type: blob.type })

  uploaderRef.value.addFiles([file])
})

const editItem = () => {
  console.log('Form data:', form.value)
  showEditDialog.value = false
}
</script>

<style scoped>
.q-form {
  gap: 16px;
}
</style>
