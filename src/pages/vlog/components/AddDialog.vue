<template>
  <q-dialog v-model="showAddDialog" persistent>
    <q-card style="width: 100%; max-width: 1150px">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Yeni Ekle</div>
        <q-form class="column">
          <div class="row no-wrap">
            <q-input v-model="form.title" label="Başlık" autofocus outlined class="col q-mr-md" />

            <q-input v-model="form.description" label="Açıklama" outlined class="col" />
          </div>

          <q-editor
            v-model="form.content"
            paragraph-tag="p"
            placeholder="İçeriğinizi buraya yazın..."
            :toolbar="[
              ['undo', 'redo'],
              ['left', 'center', 'right', 'justify'],
              ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
              ['token', 'hr', 'link', 'custom_btn'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                },
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7'],
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana',
                  ],
                },
                'removeFormat',
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
              ['print', 'fullscreen'],
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana',
            }"
          />

          <div class="row no-wrap">
            <q-select
              v-model="form.doctor"
              use-input
              clearable
              label="Hekim"
              outlined
              class="col q-mr-md"
              :options="doctorOptions"
              @filter="filterDoctors"
            />
            <q-select
              v-model="form.service"
              use-input
              clearable
              label="Hizmet Alanı"
              outlined
              class="col"
              :options="serviceOptions"
              @filter="filterServices"
            />
          </div>

          <div class="row no-wrap">
            <q-input
              v-model="form.targetLink"
              label="Hedef Bağlantı"
              outlined
              class="col q-mr-md"
            />
            <q-input v-model="form.videoLink" label="Video Bağlantısı" outlined class="col" />
          </div>

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
          class="col-1"
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
          class="col-1"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useVlogStore } from 'src/stores/dialogs/vlogStore'
import { storeToRefs } from 'pinia'

const DEFAULT_TARGET_LINK = 'https://dev.medicabil.com/tr/vlog/'

const { nextOrder, showAddDialog } = storeToRefs(useVlogStore())

const form = ref({
  title: '',
  description: '',
  content: '',
  doctor: null,
  service: null,
  targetLink: DEFAULT_TARGET_LINK,
  videoLink: '',
  order: nextOrder.value,
  isActive: true,
})

const doctorOptions = ref(['Dr. Ali', 'Dr. Ayşe', 'Dr. Mehmet'])
const serviceOptions = ref(['Ortopedi', 'Kardiyoloji', 'Nöroloji'])

const filterDoctors = (val, update) => {
  update(() => {
    const needle = val.toLowerCase()
    doctorOptions.value = ['Dr. Ali', 'Dr. Ayşe', 'Dr. Mehmet'].filter((option) =>
      option.toLowerCase().includes(needle),
    )
  })
}

const filterServices = (val, update) => {
  update(() => {
    const needle = val.toLowerCase()
    serviceOptions.value = ['Ortopedi', 'Kardiyoloji', 'Nöroloji'].filter((option) =>
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
