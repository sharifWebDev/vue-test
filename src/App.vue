<script setup>
import { computed, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import WebsiteLayout from '@/layouts/WebsiteLayout.vue'

const route = useRoute() 
const layout = computed(() => {
  return route.meta.layoutComponent || markRaw(WebsiteLayout)
})
</script>

<template>
  <component :is="layout">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in"> 
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </router-view>
  </component>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>