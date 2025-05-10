<template>
  <div>
    <div class="text-h6 text-grey-9">
      {{ breadcrumbs[breadcrumbs.length - 1].label }}
    </div>

    <q-breadcrumbs
      active-color="secondary"
      separator-color="secondary"
      align="center"
      class="text-subtitle1"
    >
      <q-breadcrumbs-el label="Admin" to="/" />

      <q-breadcrumbs-el
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        :label="breadcrumb.label"
        :to="breadcrumb.to"
        class="text-grey-8"
      />
    </q-breadcrumbs>
  </div>
</template>

<script setup>
defineProps({
  breadcrumbs: Array,
})
</script>
