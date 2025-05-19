<template>
  <q-dialog v-model="showEditDialog" persistent>
    <q-card style="width: 100%">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Düzenle</div>
        <q-form class="column">
          <q-input v-model="form.title" label="Başlık" autofocus outlined />

          <q-input v-model="form.order" type="number" outlined>
            <template #prepend>
              <div class="text-body1">Sıralama Numarası:</div>
            </template>
          </q-input>
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
import { usePrefixStore } from 'src/stores/dialogs/prefixStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  row: Object,
})

const { showEditDialog } = storeToRefs(usePrefixStore())

const form = ref({})

onMounted(async () => {
  form.value = { ...props.row }
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
