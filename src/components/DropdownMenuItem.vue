<template>
  <q-expansion-item v-model="isHide" :icon="icon" :label="label" class="text-grey-8">
    <q-list>
      <slot></slot>
    </q-list>
  </q-expansion-item>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'

export default defineComponent({
  name: 'MenuItem',
  props: {
    label: String,
    icon: String,
    activeTab: String,
  },
  setup(props) {
    const isHide = ref(false)

    const isActive = computed(() => props.label !== props.activeTab)

    watch(isActive, (newValue) => {
      if (newValue) isHide.value = false
    })

    return {
      isHide,
    }
  },
})
</script>
