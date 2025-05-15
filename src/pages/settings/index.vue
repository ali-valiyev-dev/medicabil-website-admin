<template>
  <q-page padding>
    <q-card flat class="row justify-between">
      <PageHeader :breadcrumbs="[{ label: 'Yönlendirmeler' }]" />
      <q-btn
        unelevated
        noCaps
        color="secondary"
        label="Kaydet"
        icon="fa-solid fa-save"
        :disable="!isChanged"
        @click="saveSettings"
      />
    </q-card>
    <q-form class="row gap q-mt-lg">
      <div class="column col gap">
        <q-input outlined label="Site URL Adresi" v-model="form.siteUrl" />
        <q-input outlined label="Uygulama İsmi" v-model="form.appName" />
        <q-input outlined label="E-posta Gönderim Adı" v-model="form.emailSenderName" />
        <q-input outlined label="E-posta Gönderim Adresi" v-model="form.emailSenderAddress" />
        <q-input outlined label="Admin Eposta Adresi" v-model="form.adminEmail" />
        <q-input outlined label="Hataları Bildir" v-model="form.reportErrors" />

        <q-input
          outlined
          label="Yabancı İletişim sayfasında E-posta"
          v-model="form.foreignContactEmails"
        />
        <q-input outlined label="Thesis Form | Mail to" v-model="form.thesisFormMail" />
        <q-input outlined label="Foreign Forms | Mail to" v-model="form.foreignFormsMail" />
        <q-input
          outlined
          label="Visitor Physician Form | Mail to"
          v-model="form.visitorPhysicianFormMail"
        />
      </div>

      <div class="column col gap">
        <q-input
          outlined
          label="Site Sahipliği doğrulama kodları"
          v-model="form.siteVerification"
        />
        <q-input outlined label="Destek E-postası" v-model="form.supportEmail" />
        <q-input outlined label="settings.supervisor_mail_address" v-model="form.supervisorMail" />
        <q-input outlined label="Github Secret" v-model="form.githubSecret" />
        <q-input outlined label="Google Analitiks" v-model="form.googleAnalytics" />
        <q-input outlined label="Google Tag Manager" v-model="form.googleTagManager" />
        <q-input outlined label="Online Dr Form | Mail to" v-model="form.onlineDrFormMail" />
        <q-input outlined label="Job Form | Mail to" v-model="form.jobFormMail" />
        <q-input outlined label="Contact Form | Mail to" v-model="form.contactFormMail" />
      </div>

      <div class="column col gap">
        <q-input outlined label="Twitter" v-model="form.twitter" />
        <q-input outlined label="Facebook" v-model="form.facebook" />
        <q-input outlined label="YouTube" v-model="form.youtube" />
        <q-input outlined label="İnstagram" v-model="form.instagram" />
        <q-input outlined label="WhatsApp" v-model="form.whatsapp" />
        <q-input outlined label="Viber" v-model="form.viber" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { PageHeader } from 'src/components'
import { sampleData } from './data'

function fetchSettings() {
  return Promise.resolve({ ...sampleData })
}

const form = ref({})

const originalForm = ref({})

function isDeepEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

const isChanged = computed(() => !isDeepEqual(form.value, originalForm.value))

async function loadSettings() {
  const data = await fetchSettings()
  form.value = { ...data }
  originalForm.value = { ...data }
}

function saveSettings() {
  originalForm.value = { ...form.value }
}

onMounted(loadSettings)
</script>

<style scoped>
.gap {
  gap: 16px;
}
</style>
