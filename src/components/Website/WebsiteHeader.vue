<template>
  <header class="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm z-50 transition-colors duration-300">
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
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/home" 
            class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
            :class="{ 'text-primary-600 dark:text-primary-400 font-medium': $route.name === 'Home' }"
          >
            Home
          </router-link>
          <router-link 
            to="/features" 
            class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
            :class="{ 'text-primary-600 dark:text-primary-400 font-medium': $route.name === 'Features' }"
          >
            Features
          </router-link>
          <router-link 
            to="/pricing" 
            class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
            :class="{ 'text-primary-600 dark:text-primary-400 font-medium': $route.name === 'Pricing' }"
          >
            Pricing
          </router-link>
          <router-link 
            to="/contact" 
            class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
            :class="{ 'text-primary-600 dark:text-primary-400 font-medium': $route.name === 'Contact' }"
          >
            Contact
          </router-link>
          
          <!-- Dashboard Button -->
          <router-link 
            to="/" 
            class="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
            v-if="isAuthenticated"
          >
            Dashboard
          </router-link>
          
          <!-- Login Button -->
          <router-link 
            to="/login" 
            class="text-primary-600 dark:text-primary-400 hover:underline"
            v-else
          >
            Login
          </router-link>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        >
          <i :class="showMobileMenu ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div 
        v-if="showMobileMenu"
        class="md:hidden mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
      >
        <div class="space-y-4">
          <router-link 
            to="/home" 
            @click="closeMobileMenu"
            class="block py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            :class="{ 'text-primary-600 dark:text-primary-400 font-medium': $route.name === 'Home' }"
          >
            Home
          </router-link>
          <router-link 
            to="/features" 
            @click="closeMobileMenu"
            class="block py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            :class="{ 'text-primary-600 dark:text-primary-400 font-medium': $route.name === 'Features' }"
          >
            Features
          </router-link>
          <router-link 
            to="/pricing" 
            @click="closeMobileMenu"
            class="block py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            :class="{ 'text-primary-600 dark:text-primary-400 font-medium': $route.name === 'Pricing' }"
          >
            Pricing
          </router-link>
          <router-link 
            to="/contact" 
            @click="closeMobileMenu"
            class="block py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            :class="{ 'text-primary-600 dark:text-primary-400 font-medium': $route.name === 'Contact' }"
          >
            Contact
          </router-link>
          
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <router-link 
              to="/" 
              @click="closeMobileMenu"
              class="block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition text-center font-medium"
              v-if="isAuthenticated"
            >
              Go to Dashboard
            </router-link>
            <router-link 
              to="/login" 
              @click="closeMobileMenu"
              class="block text-primary-600 dark:text-primary-400 hover:underline text-center"
              v-else
            >
              Login
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'

const showMobileMenu = ref(false)

const isAuthenticated = computed(() => {
  return localStorage.getItem('isAuthenticated') === 'true'
})

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}
</script>