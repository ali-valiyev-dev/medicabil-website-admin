<template>
  <q-btn-dropdown unelevated dense no-wrap auto-close class="q-pl-sm rounded-borders">
    <template v-slot:label>
      <div class="row items-center">
        <img :src="selectedLangFlag" class="q-mr-sm" />
        <span>{{ selectedLang?.code }}</span>
      </div>
    </template>

    <q-list>
      <q-item
        v-for="lang in filteredLanguages"
        :key="lang.value"
        clickable
        v-close-popup
        @click="changeLanguage(lang)"
      >
        <q-item-section avatar style="min-width: 16px" class="q-pr-sm">
          <q-img width="20px" :src="flagURL(lang.flag)" alt="Flag" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ lang.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const languages = [
  { label: 'Türkçe', value: 'tr-TR', code: 'TR', flag: 'tr' },
  { label: 'English', value: 'en-US', code: 'EN', flag: 'gb' },
  { label: 'Русский', value: 'ru-RU', code: 'RU', flag: 'ru' },
  { label: 'العربية', value: 'ar-AR', code: 'AR', flag: 'sa' },
  { label: 'Shqip', value: 'sq-SQ', code: 'SQ', flag: 'al' },
]

const { locale } = useI18n()

const selectedLang = ref(null)

const selectedLangFlag = computed(() => flagURL(selectedLang.value?.flag, '20x15'))
const filteredLanguages = computed(() =>
  languages.filter((lang) => lang.value !== selectedLang.value?.value),
)

const flagURL = (flag, size = '16x12') => `https://flagcdn.com/${size}/${flag}.png`

function changeLanguage(lang) {
  selectedLang.value = lang
  locale.value = lang.value
  localStorage.setItem('user-locale', lang.value)
}

onMounted(() => {
  const savedLocale = localStorage.getItem('user-locale') || 'tr-TR'
  selectedLang.value = languages.find((l) => l.value == savedLocale)
})
</script>
