<template>
  <q-dialog v-model="showEditDialog" persistent>
    <q-card style="width: 100%">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Düzenle</div>
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
import { reactive } from 'vue'
import { useMenuStore } from 'src/stores/dialogs/menuStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  form: Object,
})

const { showEditDialog } = storeToRefs(useMenuStore())

const localForm = reactive(props.form)

const emit = defineEmits(['edit'])

const editItem = () => {
  emit('edit')
}
</script>

<style scoped>
.q-form {
  gap: 16px;
}
</style>
