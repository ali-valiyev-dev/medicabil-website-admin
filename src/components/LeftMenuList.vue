<template>
  <q-scroll-area class="fit q-pt-xl" :horizontal-thumb-style="{ opacity: 0 }">
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
    to: '/slider',
    icon: 'fa-solid fa-image',
    label: 'Slider',
  },
  {
    to: '/center-of-excellence',
    icon: 'fa-solid fa-hospital',
    label: 'Center Of Excellence',
  },
  // {
  //   icon: 'fa-solid fa-book-open',
  //   label: 'Rehber',
  //   children: [
  //     { to: '/rehber/haberler', label: 'Haberler' },
  //   ],
  // },
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
