<template>
  <q-dialog v-model="showEditDialog" persistent>
    <q-card style="width: 100%; max-width: 1150px">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Düzenle</div>
        <q-form class="column">
          <div class="row no-wrap">
            <q-input v-model="form.title" label="Başlık" outlined class="col q-mr-md" />
            <q-input v-model="form.description" label="Açıklama" outlined class="col" />
          </div>

          <q-editor
            v-model="form.resume"
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

          <q-uploader
            ref="uploaderRef"
            label="Dosyaları yüklemek için buraya bırakın"
            max-files="1"
            flat
            bordered
            hide-upload-btn
            class="full-width"
            thumbnail-fit="contain"
            color="secondary"
          />

          <div class="row no-wrap">
            <q-select
              v-model="form.doctorTitle"
              use-input
              clearable
              label="Ünvan"
              outlined
              class="col q-mr-md"
              :options="doctorTitleOptions"
              @filter="filterDoctorTitles"
            />
            <q-input v-model="form.name" label="Ad" outlined class="col q-mr-md" />
            <q-input v-model="form.surname" label="Soyad" outlined class="col" />
          </div>

          <div class="row no-wrap">
            <q-input
              v-model="form.specialization"
              label="Uzmanlık Alanı"
              outlined
              class="col q-mr-md"
            />
            <q-input
              v-model="form.appointmentLink"
              label=" Randevu URL"
              outlined
              class="col q-mr-md"
            />
            <q-input v-model="form.targetLink" label="Hedef Bağlantı" outlined class="col" />
          </div>

          <div class="row no-wrap">
            <q-select
              v-model="form.branch"
              use-input
              clearable
              label="Hastane"
              outlined
              class="col q-mr-md"
              :options="branchOptions"
              @filter="filterBranches"
            />
            <q-select
              v-model="form.service"
              use-input
              clearable
              label="Hizmet Alanı"
              outlined
              class="col q-mr-md"
              :options="serviceOptions"
              @filter="filterServices"
            />
            <q-select
              v-model="form.unit"
              use-input
              clearable
              label="Ünite"
              outlined
              class="col"
              :options="uniteOptions"
              @filter="filterUnites"
            />
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

            <div class="row no-wrap q-gutter-md">
              <q-toggle
                v-model="form.isActive"
                :label="form.isActive ? 'Aktif' : 'Devre dışı'"
                color="secondary"
                checked-icon="check"
                unchecked-icon="close"
                size="xl"
              />

              <q-toggle
                v-model="form.hasAppointment"
                label="Randevusu var mı?"
                color="secondary"
                checked-icon="check"
                unchecked-icon="close"
                size="xl"
              />

              <q-toggle
                v-model="form.vitrine"
                label="Vitrine"
                color="secondary"
                checked-icon="check"
                unchecked-icon="close"
                size="xl"
              />
            </div>
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
          class="col-1"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDoctorStore } from 'src/stores/dialogs/doctorStore'
import { storeToRefs } from 'pinia'
import { marked } from 'marked'

const props = defineProps({
  row: Object,
})

const { showEditDialog } = storeToRefs(useDoctorStore())

const form = ref({})
const uploaderRef = ref(null)

const doctorTitleOptions = ref(['Prof.Dr.', 'Op. Dr.', 'Uzm. Dr.'])
const branchOptions = ref(['Nilüfer Hastanesi', 'Yıldırım Hastanesi'])
const serviceOptions = ref(['Ortopedi', 'Kardiyoloji', 'Nöroloji'])
const uniteOptions = ref(['Acil Srvis', 'Poliklinikler', 'Check Up'])

const filterDoctorTitles = (val, update) => {
  update(() => {
    const needle = val.toLowerCase()
    doctorTitleOptions.value = ['Prof.Dr.', 'Op. Dr.', 'Uzm. Dr.'].filter((option) =>
      option.toLowerCase().includes(needle),
    )
  })
}

const filterBranches = (val, update) => {
  update(() => {
    const needle = val.toLowerCase()
    branchOptions.value = ['Nilüfer Hastanesi', 'Yıldırım Hastanesi'].filter((option) =>
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

const filterUnites = (val, update) => {
  update(() => {
    const needle = val.toLowerCase()
    uniteOptions.value = ['Acil Srvis', 'Poliklinikler', 'Check Up'].filter((option) =>
      option.toLowerCase().includes(needle),
    )
  })
}

onMounted(async () => {
  form.value = { ...props.row }
  form.value.resume = marked(form.value.resume || '')

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
