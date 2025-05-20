<template>
  <q-header bordered class="bg-primary">
    <q-toolbar class="row no-wrap items-center q-py-sm">
      <q-btn
        dense
        flat
        round
        unelevated
        icon="menu"
        aria-label="Menu"
        class="lt-lg q-mr-md"
        @click="toggleDrawer('drawerLeft')"
      />
      <q-toolbar-title class="row col items-center">
        <router-link to="/" style="text-decoration: none; height: 34px">
          <img src="~assets/medicabil_text_logo.png" alt="Medicabil Logo" height="100%" />
        </router-link>
      </q-toolbar-title>

      <q-space />

      <ContentLanguage class="q-mr-md" />
      <q-btn flat round icon="settings" @click="toggleDrawer('drawerRight')" />
      <q-btn-dropdown flat rounded noCaps>
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section avatar>
              <q-icon name="logout" color="secondary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <template #label>
          <q-item class="q-pr-none">
            <q-item-section side>
              <q-avatar size="30px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Ali Valiyev</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import ContentLanguage from './ContentLanguage.vue'

const props = defineProps(['drawerLeft', 'drawerRight'])
const emit = defineEmits(['update:drawerLeft', 'update:drawerRight'])

const toggleDrawer = (drawer) => {
  emit(`update:${drawer}`, !props[drawer])
}
</script>
