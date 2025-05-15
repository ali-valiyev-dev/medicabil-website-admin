<template>
  <q-dialog v-model="showEditDialog" persistent>
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Düzenle</div>
        <q-form class="column">
          <q-input v-model="form.oldUrl" label="Eski URL" autofocus outlined type="url" />
          <q-input v-model="form.newUrl" label="Yeni URL" outlined type="url" />
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
import { useRedirectStore } from 'src/stores/dialogs/redirectStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  row: Object,
})

const { showEditDialog } = storeToRefs(useRedirectStore())

const form = ref({})

const editItem = () => {
  console.log('Form data:', form.value)
  showEditDialog.value = false
}

onMounted(() => (form.value = props.row))
</script>

<style scoped>
.q-form {
  gap: 16px;
}
</style>
