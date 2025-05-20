<template>
  <q-dialog v-model="showAddDialog" persistent>
    <q-card style="width: 100%">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Yeni Ekle</div>
        <q-form class="column">
          <q-input v-model="form.title" label="Başlık" autofocus outlined class="col" />
          <q-input v-model="form.folderUrl" label="Klasör URL" outlined class="col" />

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
          class="col-2"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useMagazineStore } from 'src/stores/dialogs/magazineStore'
import { storeToRefs } from 'pinia'

const { nextOrder, showAddDialog } = storeToRefs(useMagazineStore())

const form = ref({
  title: '',
  folderUrl: '',
  image: null,
  groupTitle: null,
  order: nextOrder.value,
  isActive: true,
})

const groupTitleOptions = ref(['2022 Dergiler', 'E-Kitap'])

const filterBranches = (val, update) => {
  update(() => {
    const needle = val.toLowerCase()
    groupTitleOptions.value = ['2022 Dergiler', 'E-Kitap'].filter((option) =>
      option.toLowerCase().includes(needle),
    )
  })
}

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
