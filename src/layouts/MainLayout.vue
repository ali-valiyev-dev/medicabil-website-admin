<template>
  <q-layout view="hHh lpR lFr">
    <Header v-model:drawerLeft="drawerLeft" v-model:drawerRight="drawerRight" />

    <q-drawer
      v-model="drawerLeft"
      bordered
      mini-to-overlay
      show-if-above
      :mini="miniState"
      @mouseenter="miniState = false"
      @mouseleave="miniState = true"
      :breakpoint="1024"
      :width="$q.screen.lt.sm ? $q.screen.width : 250"
    >
      <q-btn
        unelevated
        dense
        icon="close"
        class="lt-md q-ma-sm z-max no-padding absolute-top-right"
        @click="drawer = false"
      />
      <LeftMenuList />
    </q-drawer>

    <q-drawer
      side="right"
      v-model="drawerRight"
      bordered
      overlay
      :breakpoint="1024"
      :width="$q.screen.lt.sm ? $q.screen.width : 350"
    >
      <q-scroll-area class="fit">
        <div class="row no-wrap items-center justify-between q-pa-md">
          <div class="text-h6">Genel Ayarlar</div>
          <q-btn unelevated round dense icon="close" @click="drawerRight = false" />
        </div>
        <q-separator />
        <q-list padding>
          <q-item>
            <q-item-section>
              <q-item-label>Cache</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn noCaps rounded label="Temizle" icon-right="delete" color="red-5" unelevated />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>SITEMAP</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                noCaps
                rounded
                label="Güncelle"
                icon-right="autorenew"
                color="secondary"
                unelevated
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Debug Mode Aç/Kapat</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-checkbox color="secondary" v-model="debugMode" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-white text-center">
      <div class="text-body2 text-grey-9 q-py-md">© 2022 Medicabil - All Rights Reserved.</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { LeftMenuList, Header } from 'src/components'

const $q = useQuasar()

const drawerLeft = ref(false)
const drawerRight = ref(false)
const miniState = ref($q.screen.gt.md)
const debugMode = ref(false)
</script>
