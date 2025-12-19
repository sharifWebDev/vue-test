<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Website Header -->
    <WebsiteHeader />
    
    <!-- Main Content -->
    <main class="pt-16">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- Website Footer -->
    <WebsiteFooter />
  </div>
</template>

<script setup>
import WebsiteHeader from '@/components/Website/WebsiteHeader.vue'
import WebsiteFooter from '@/components/Website/WebsiteFooter.vue'
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>