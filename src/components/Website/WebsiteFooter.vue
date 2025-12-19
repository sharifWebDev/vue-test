<template>
  <footer class="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm z-50 transition-colors duration-300">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/home" class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <i class="fas fa-cube text-white text-xl"></i>
          </div>
          <span class="text-xl font-bold text-gray-800 dark:text-white">
            AppBuilder<span class="text-primary-600">Pro</span>
          </span>
        </router-link>
      
      </div> 
    </nav>
  </footer>
</template>

<script setup> 
 
</script>