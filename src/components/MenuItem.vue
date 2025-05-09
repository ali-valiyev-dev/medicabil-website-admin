<template>
  <q-item
    :to="to"
    class="full-width"
    :class="{ 'bg-active': isActive }"
    active-class="q-item-no-link-highlighting"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :color="isActive ? 'primary' : 'grey-8'" :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{
          'text-primary': isActive,
          'text-grey-8': !isActive,
          'q-pl-lg': !icon,
        }"
      >
        {{ label }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
const { to, icon, label, isActive } = defineProps({
  to: String,
  icon: String,
  label: String,
  isActive: Boolean,
})
</script>

<style scoped>
.bg-active {
  background-color: rgba(0, 85, 150, 0.15);
}
</style>
