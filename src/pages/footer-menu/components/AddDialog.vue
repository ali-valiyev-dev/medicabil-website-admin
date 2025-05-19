<template>
  <q-dialog v-model="showAddDialog" persistent>
    <q-card style="width: 100%">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Yeni Ekle</div>
        <q-form class="column">
          <q-input v-model="localForm.label" label="Başlık" autofocus outlined />
          <q-input v-model="localForm.link" label="Link" outlined />
          <q-input
            v-model.number="localForm.index"
            label="Pozisyon"
            type="number"
            outlined
            min="1"
          />
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
import { reactive } from 'vue'
import { useFooterMenuStore } from 'src/stores/dialogs/footerMenuStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  form: Object,
})

const { showAddDialog } = storeToRefs(useFooterMenuStore())

const localForm = reactive(props.form)

const emit = defineEmits(['add'])

const addItem = () => {
  emit('add')
}
</script>

<style scoped>
.q-form {
  gap: 16px;
}
</style>
