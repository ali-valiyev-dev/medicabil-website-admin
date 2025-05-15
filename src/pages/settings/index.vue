<template>
  <q-page padding>
    <q-card flat class="row justify-between">
      <PageHeader :breadcrumbs="[{ label: 'Yönlendirmeler' }]" />
    </q-card>
    <q-form class="row gap q-mt-lg">
      <!-- col-1 -->
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

      <!-- col-2 -->
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

      <!-- col-3 -->
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
import { ref } from 'vue'
import { PageHeader } from 'src/components'

const form = ref({
  siteUrl: 'https://www.medicabil.com',
  appName: 'Medicabil',
  emailSenderName: 'Medicabil',
  emailSenderAddress: 'noreply@medicabildevde.com',
  adminEmail: 'santral@medicabil.com',
  reportErrors: '',
  twitter: 'https://twitter.com/Medicabil',
  facebook: 'https://www.facebook.com/Medicabil',
  googleAnalytics: 'UA-97870502-1',
  viber: '905323360868',
  foreignContactEmails: 'samet.bilgen@medicabil.com,medicabilhastanesi@gmail.com',
  thesisFormMail: 'aysun.yilmazlar@medicabil.com, ik@medicabil.com',
  foreignFormsMail: 'medicabilhastanesi@gmail.com,samet.bilgen@medicabil.com',
  visitorPhysicianFormMail: 'samet.bilgen@medicabil.com,medicabilhastanesi@gmail.com',
  siteVerification: '',
  supportEmail: 'info@medicabil.com',
  supervisorMail: 'info@medicabil.com,medicabilhastanesi@gmail.com,samet.bilgen@medicabil.com',
  youtube: 'https://www.youtube.com/user/medicabilhastanesi',
  instagram: 'https://www.instagram.com/medicabil/',
  githubSecret: '',
  googleTagManager: 'GTM-TG48TZD',
  whatsapp: '905323360868',
  onlineDrFormMail: 'medicabilhastanesi@gmail.com,samet.bilgen@medicabil.com',
  jobFormMail: 'medicabilhastanesi@gmail.com',
  contactFormMail: 'info@medicabil.com,medicabilhastanesi@gmail.com',
})
</script>

<style scoped>
.gap {
  gap: 16px;
}
</style>
