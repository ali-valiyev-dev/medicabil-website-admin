<template>
  <q-scroll-area class="fit q-pt-lg" :horizontal-thumb-style="{ opacity: 0 }">
    <q-list>
      <div
        v-for="menuItem in menuItems"
        :key="menuItem.label"
        clickable
        @click="activeTab = menuItem.label"
      >
        <MenuItem
          v-if="!menuItem.children"
          :to="menuItem.to"
          :icon="menuItem.icon"
          :label="menuItem.label"
          :isActive="isActiveMenuItem(menuItem)"
          @item-clicked="handleMenuItemClick(menuItem)"
        />

        <DropdownMenuItem
          v-else
          :label="menuItem.label"
          :icon="menuItem.icon"
          :activeTab="activeTab"
        >
          <MenuItem
            v-for="childItem in menuItem.children"
            :key="childItem.label"
            :to="childItem.to"
            :label="childItem.label"
            :isActive="isActiveMenuItem(childItem)"
            @item-clicked="handleMenuItemClick(childItem)"
          />
        </DropdownMenuItem>
      </div>
    </q-list>
  </q-scroll-area>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { MenuItem, DropdownMenuItem } from 'src/components'

const route = useRoute()
const activeMenuItem = ref(null)
const activeTab = ref(null)

const menuItems = ref([
  {
    to: '/',
    icon: 'fa-solid fa-chart-pie',
    label: 'Pano',
  },
  {
    icon: 'fa-solid fa-object-group',
    label: 'Görünüm',
    children: [{ to: '/header-menu', label: 'Üst Menü' }],
  },
  {
    to: '/slider',
    icon: 'fa-solid fa-image',
    label: 'Slider',
  },
  {
    to: '/faq',
    icon: 'fa-solid fa-circle-question',
    label: 'SSS',
  },
  {
    to: '/center-of-excellence',
    icon: 'fa-solid fa-hospital',
    label: 'Center Of Excellence',
  },
  {
    to: '/blog',
    icon: 'fa-solid fa-pen-nib',
    label: 'Blog',
  },
  {
    to: '/step-page',
    icon: 'fa-solid fa-shoe-prints',
    label: 'Adım Sayfası',
  },
  {
    to: '/news',
    icon: 'fa-solid fa-newspaper',
    label: 'Haber',
  },
  {
    to: '/physician',
    icon: 'fa-solid fa-stethoscope',
    label: 'Observer Physicians',
  },
  {
    to: '/vlog',
    icon: 'fa-solid fa-video',
    label: 'Vlog',
  },
  {
    to: '/unit',
    icon: 'fa-solid fa-building',
    label: 'Üniteler',
  },
  {
    to: '/doctor',
    icon: 'fa-solid fa-user-doctor',
    label: 'Hekimler',
  },
  {
    to: '/service',
    icon: 'fa-solid fa-briefcase-medical',
    label: 'Hizmet Alanı',
  },
  {
    to: '/page',
    icon: 'fa-solid fa-file-lines',
    label: 'Sayfa',
  },
  {
    to: '/user',
    icon: 'fa-solid fa-user-group',
    label: 'Kullanıcılar',
  },
  {
    to: '/redirect',
    icon: 'fa-solid fa-square-arrow-up-right',
    label: 'Yönlendirmeler',
  },
  {
    to: '/settings',
    icon: 'fa-solid fa-gear',
    label: 'Ayarlar',
  },
  {
    icon: 'fa-solid fa-ellipsis-h',
    label: 'Diğer',
    children: [
      { to: '/reference', label: 'Referanslar' },
      { to: '/cooperation', label: 'İşbirliği İşlemleri' },
      { to: '/online-forms', label: 'Online Formlar' },
      { to: '/observer-physician-forms', label: 'Observer Physician Forms' },
    ],
  },
])

function handleMenuItemClick(menuItem) {
  activeMenuItem.value = menuItem
}

function isActiveMenuItem(menuItem) {
  return activeMenuItem.value === menuItem
}

function setActiveMenuItemFromRoute() {
  const findActiveMenuItem = (items) => {
    for (const item of items) {
      if (item.to === route.path) {
        activeMenuItem.value = item
        return
      }
      if (item.children) {
        findActiveMenuItem(item.children)
      }
    }
  }
  findActiveMenuItem(menuItems.value)
}

watch(() => route.path, setActiveMenuItemFromRoute)

setActiveMenuItemFromRoute()
</script>
