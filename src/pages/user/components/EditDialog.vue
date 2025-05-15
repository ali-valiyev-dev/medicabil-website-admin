<template>
  <q-dialog v-model="showEditDialog" persistent>
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Düzenle</div>
        <q-form class="column">
          <q-input v-model="form.name" label="Ad" autofocus outlined />
          <q-input v-model="form.email" label="E-Posta" outlined />
          <q-input
            v-model="form.password"
            label="Parola"
            outlined
            type="password"
            :rules="[(val) => val.length >= 4 || 'Parola en az 4 karakter olmalıdır']"
            hide-bottom-space
          />
          <q-input
            v-model="form.confirmPassword"
            label="Parolayı Onayla"
            outlined
            type="password"
            :error="!!form.password && !!form.confirmPassword && !passwordsMatch"
            error-message="Parolalar eşleşmiyor"
            hide-bottom-space
          />

          <q-select
            v-model="form.authority"
            use-input
            clearable
            label="Yetki"
            outlined
            :options="authorityOptions"
            @filter="filterAuthorities"
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
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from 'src/stores/dialogs/userStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  row: Object,
})

const { showEditDialog } = storeToRefs(useUserStore())

const form = ref({})

const authorityOptions = ref(['Writer', 'Visitor', 'SEO', 'Moderator', 'Doctor', 'Admin'])

const passwordsMatch = computed(() => {
  return form.value.password === form.value.confirmPassword
})

const filterAuthorities = (val, update) => {
  update(() => {
    const needle = val.toLowerCase()
    authorityOptions.value = ['Writer', 'Visitor', 'SEO', 'Moderator', 'Doctor', 'Admin'].filter(
      (option) => option.toLowerCase().includes(needle),
    )
  })
}

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
