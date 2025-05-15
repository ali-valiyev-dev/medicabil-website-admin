<template>
  <q-dialog v-model="showAddDialog" persistent>
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6 text-grey-9 q-mb-md">Yeni Ekle</div>
        <q-form class="column">
          <q-input v-model="form.name" label="Ad" autofocus outlined />
          <q-input v-model="form.email" label="E-Posta" outlined type="email" />
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
          class="col"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from 'src/stores/dialogs/userStore'
import { storeToRefs } from 'pinia'

const { showAddDialog } = storeToRefs(useUserStore())

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  authority: null,
})

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
