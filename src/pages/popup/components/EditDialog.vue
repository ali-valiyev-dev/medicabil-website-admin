<template>
  <q-dialog v-model="showEditDialog" persistent>
    <q-card style="width: 100%; max-width: 1150px">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Düzenle</div>
        <q-form class="column">
          <div class="row no-wrap">
            <q-input v-model="form.title" label="Başlık" outlined class="col q-mr-md" />
            <q-input v-model="form.targetLink" label="Hedef Bağlantı" outlined class="col" />
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

          <div class="row items-start no-wrap">
            <q-input
              v-model="form.startDate"
              label="Başlangıç Tarih"
              outlined
              placeholder="GG.AA.YYYY"
              mask="##.##.####"
              :rules="[(val) => (val && val.length === 10) || 'Lütfen geçerli bir tarih giriniz']"
              class="col q-mr-md"
            >
              <template #prepend>
                <q-icon name="event" color="secondary" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.startDate" mask="DD.MM.YYYY" minimal>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template #append>
                <q-icon
                  v-if="form.startDate"
                  name="cancel"
                  class="cursor-pointer q-mr-xs"
                  @click="form.startDate = null"
                />
              </template>
            </q-input>

            <q-input
              v-model="form.endDate"
              label="Bitiş Tarih"
              outlined
              placeholder="GG.AA.YYYY"
              mask="##.##.####"
              :rules="[(val) => (val && val.length === 10) || 'Lütfen geçerli bir tarih giriniz']"
              class="col"
            >
              <template #prepend>
                <q-icon name="event" color="secondary" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.endDate" mask="DD.MM.YYYY" minimal>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template #append>
                <q-icon
                  v-if="form.endDate"
                  name="cancel"
                  class="cursor-pointer q-mr-xs"
                  @click="form.endDate = null"
                />
              </template>
            </q-input>

            <q-toggle
              v-model="form.isActive"
              :label="form.isActive ? 'Aktif' : 'Devre dışı'"
              color="secondary"
              checked-icon="check"
              unchecked-icon="close"
              size="xl"
              class="q-mx-lg"
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
import { usePopupStore } from 'src/stores/dialogs/popupStore'
import { storeToRefs } from 'pinia'
import { marked } from 'marked'

const props = defineProps({
  row: Object,
})

const { showEditDialog } = storeToRefs(usePopupStore())

const form = ref({})
const uploaderRef = ref(null)

onMounted(async () => {
  form.value = { ...props.row }
  form.value.content = marked(form.value.content || '')

  if (form.value.image) {
    const response = await fetch(form.value.image)
    const blob = await response.blob()
    const file = new File([blob], form.value.image, { type: blob.type })
    uploaderRef.value.addFiles([file])
  }
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
