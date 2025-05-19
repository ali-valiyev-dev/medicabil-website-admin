<template>
  <q-page padding>
    <q-card flat class="row justify-between">
      <PageHeader :breadcrumbs="[{ label: 'Yönlendirmeler' }]" />
      <q-btn unelevated noCaps color="secondary" label="Kaydet" icon="fa-solid fa-save" />
    </q-card>
    <q-form class="row gap q-mt-lg">
      <div class="column col gap">
        <q-input outlined label="Yatak Sayısı" v-model="form.bedCount" />
        <q-input outlined label="Birinci Kart Bağlantısı" v-model="form.firstCardLink" />
        <q-input outlined label="Birinci Kart Başlığı" v-model="form.firstCardTitle" />
        <q-input outlined label="Üçüncü Kart Bağlantısı" v-model="form.thirdCardLink" />
        <q-input outlined label="Üçüncü Kart Başlığı" v-model="form.thirdCardTitle" />
        <q-input outlined label="İkinci Kart Bağlantısı" v-model="form.secondCardLink" />
        <q-input outlined label="İkinci Kart Başlığı" v-model="form.secondCardTitle" />
        <q-input outlined label="Tecrübe" v-model="form.experience" />
        <q-input outlined label="Metin" v-model="form.text" />
        <q-input outlined label="Metin Başlığı" v-model="form.textTitle" />
        <q-input outlined label="Beşinci Interaktiv Resmi" v-model="form.fifthInteractiveImage" />
        <q-input outlined label="Beşinci Interaktiv Yazısı" v-model="form.fifthInteractiveText" />
        <q-input
          outlined
          label="Dördüncü Interaktiv Bağlantısı"
          v-model="form.fourthInteractiveLink"
        />
        <q-input outlined label="Birinci Interaktiv Resmi" v-model="form.firstInteractiveImage" />
        <q-input outlined label="Birinci Interaktiv Yazısı" v-model="form.firstInteractiveText" />
        <q-input
          outlined
          label="Altıncı Interaktiv Bağlantısı"
          v-model="form.sixthInteractiveLink"
        />
      </div>

      <div class="column col gap">
        <q-input outlined label="Interaktiv Yazısı" v-model="form.interactiveText" />
        <q-input
          outlined
          label="Üçüncü Interaktiv Bağlantısı"
          v-model="form.thirdInteractiveLink"
        />
        <q-input outlined label="Interaktiv Başlığı" v-model="form.interactiveTitle" />
        <q-input
          outlined
          label="İkinci Interaktiv Bağlantısı"
          v-model="form.secondInteractiveLink"
        />
        <q-input outlined label="Ana Sayfa Logo URL" v-model="form.homepageLogoUrl" />
        <q-input outlined label="Orta Yazı Başlığı" v-model="form.middleTextTitle" />
        <q-input outlined label="Telefon Numarası" v-model="form.phoneNumber" />
        <q-input outlined label="Ana Sayfa Açıklama" v-model="form.homepageDescription" />
        <q-input outlined label="Destek e-posta Adresi" v-model="form.supportEmail" />
        <q-input outlined label="Birinci Kart Resmi" v-model="form.firstCardImage" />
        <q-input outlined label="Birinci Kart Metni" v-model="form.firstCardText" />
        <q-input outlined label="Üçüncü Kart Resmi" v-model="form.thirdCardImage" />
        <q-input outlined label="Üçüncü Kart Metni" v-model="form.thirdCardText" />
        <q-input outlined label="İkinci Kart Resmi" v-model="form.secondCardImage" />
        <q-input outlined label="İkinci Kart Metni" v-model="form.secondCardText" />
        <q-input outlined label="Kapalı Alan" v-model="form.closedArea" />
      </div>

      <div class="column col gap">
        <q-input outlined label="Uzman Sağlık Personeli" v-model="form.expertHealthStaff" />
        <q-input outlined label="Metin Buton Yazısı" v-model="form.textButtonText" />
        <q-input outlined label="Metin Buton Linki" v-model="form.textButtonLink" />
        <q-input
          outlined
          label="Beşinci Interaktiv Bağlantısı"
          v-model="form.fifthInteractiveLink"
        />
        <q-input outlined label="Dördüncü Interaktiv Resmi" v-model="form.fourthInteractiveImage" />
        <q-input outlined label="Dördüncü Interaktiv Yazısı" v-model="form.fourthInteractiveText" />
        <q-input
          outlined
          label="Birinci Interaktiv Bağlantısı"
          v-model="form.firstInteractiveLink"
        />
        <q-input outlined label="Altıncı Interaktiv Resmi" v-model="form.sixthInteractiveImage" />
        <q-input outlined label="Altıncı Interaktiv Yazısı" v-model="form.sixthInteractiveText" />
        <q-input outlined label="Üçüncü Interaktiv Resmi" v-model="form.thirdInteractiveImage" />
        <q-input outlined label="Üçüncü Interaktiv Yazısı" v-model="form.thirdInteractiveText" />
        <q-input outlined label="İkinci Interaktiv Resmi" v-model="form.secondInteractiveImage" />
        <q-input outlined label="İkinci Interaktiv Yazısı" v-model="form.secondInteractiveText" />
        <q-input outlined label="Orta Yazı" v-model="form.middleText" />
        <q-input outlined label="Orta Yazı Video" v-model="form.middleTextVideo" />
        <q-input
          outlined
          label="Ana Sayfa Hizmetler Görsel Url"
          v-model="form.homepageServicesImageUrl"
        />
        <q-input outlined label="Ana Sayfa Başlığı" v-model="form.homepageTitle" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'
import { PageHeader } from 'src/components'

const form = reactive({})
</script>

<style scoped>
.gap {
  gap: 16px;
}
</style>
