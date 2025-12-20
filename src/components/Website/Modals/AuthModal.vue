<template>
  <div 
    id="authModal" 
    class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-all duration-300"
    :class="{
      'opacity-0 invisible scale-95': !show,
      'opacity-100 visible scale-100': show
    }"
    @click="closeModal"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden transform transition-all duration-300">
      <!-- Gradient Top Border -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-500 via-purple-500 to-pink-500"></div>
      
      <!-- Animated Background Elements -->
      <div
        class="absolute -top-20 -right-20 w-40 h-40 bg-gray-200 dark:bg-gray-900 rounded-full opacity-20 animate-pulse">
      </div>
      <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20 animate-pulse"></div>
      
      <div class="relative z-10">
        <!-- Header -->
        <div class="text-center mb-8">
          <div
            class="w-16 h-16 bg-gradient-to-r from-gray-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i class="fas fa-cube text-white text-2xl"></i>
          </div>
          <h2 class="text-3xl font-bold bg-gradient-to-r from-gray-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mt-2 text-sm">Sign in to your AppBuilder Pro account</p>
        </div>

        <!-- Tab Navigation -->
        <div class="flex bg-gray-100 dark:bg-gray-700 rounded-2xl p-1 mb-8">
          <button 
            @click="activeTab = 'login'"
            class="tab-button flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center"
            :class="{
  'bg-white dark:bg-gray-800 text-gray-600 shadow-sm': activeTab === 'login',
  'text-gray-600 dark:text-gray-400': activeTab !== 'login'
            }"
          >
            <i class="fas fa-sign-in-alt mr-2 text-sm"></i>
            Login
          </button>
          <button 
            @click="activeTab = 'register'"
            class="tab-button flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center"
            :class="{
  'bg-white dark:bg-gray-800 text-gray-600 shadow-sm': activeTab === 'register',
  'text-gray-600 dark:text-gray-400': activeTab !== 'register'
            }"
          >
            <i class="fas fa-user-plus mr-2 text-sm"></i>
            Register
          </button>
        </div>

        <!-- Login Form -->
        <form 
          v-if="activeTab === 'login'" 
          @submit.prevent="handleLogin"
          class="space-y-5"
        >
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <div class="relative">
              <input 
                v-model="loginForm.email"
                type="email" 
                class="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:text-white transition-all duration-300 pl-11"
                placeholder="your@email.com" 
                required
              >
              class="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div class="relative">
              <input 
                v-model="loginForm.password"
                :type="showLoginPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:text-white transition-all duration-300 pl-11 pr-11"
                placeholder="••••••••" 
                required
              >
              <i class="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              <button 
                type="button" 
                @click="showLoginPassword = !showLoginPassword"
                class="password-toggle absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <i :class="showLoginPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
              </button>
            </div>
          </div>
          
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input v-model="loginForm.remember" type="checkbox"
                class="w-4 h-4 text-gray-600 rounded focus:ring-gray-500">
              <span class="text-gray-700 dark:text-gray-300">Remember me</span>
            </label>
            <button 
              type="button" 
              @click="showForgotPassword = true"
              class="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors font-medium"
            >
              Forgot password?
            </button>
          </div>
          
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-gradient-to-r from-gray-500 to-purple-600 text-white py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{ 'hover:scale-[1.02] active:scale-[0.98]': !loading }"
          >
            <i class="fas fa-sign-in-alt mr-2"></i>
            {{ loading ? 'Signing In...' : 'Sign In to Account' }}
          </button>
        </form>

        <!-- Register Form -->
        <form 
          v-else 
          @submit.prevent="handleRegister"
          class="space-y-5"
        >
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <div class="relative">
              <input 
                v-model="registerForm.name"
                type="text" 
                class="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:text-white transition-all duration-300 pl-11"
                placeholder="John Doe" 
                required
              >
              <i class="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <div class="relative">
              <input 
                v-model="registerForm.email"
                type="email" 
                class="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:text-white transition-all duration-300 pl-11"
                placeholder="your@email.com" 
                required
              >
              class="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div class="relative">
              <input 
                v-model="registerForm.password"
                :type="showRegisterPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:text-white transition-all duration-300 pl-11 pr-11"
                placeholder="••••••••" 
                required
              >
              <i class="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              <button 
                type="button" 
                @click="showRegisterPassword = !showRegisterPassword"
                class="password-toggle absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <i :class="showRegisterPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
              </button>
            </div>
          </div>
          
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
            <div class="relative">
              <input 
                v-model="registerForm.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:text-white transition-all duration-300 pl-11 pr-11"
                placeholder="••••••••" 
                required
              >
              <i class="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              <button 
                type="button" 
                @click="showConfirmPassword = !showConfirmPassword"
                class="password-toggle absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
              </button>
            </div>
          </div>
          
          <label class="flex items-start space-x-3 text-sm cursor-pointer">
            <input v-model="registerForm.terms" type="checkbox"
              class="w-4 h-4 text-gray-600 rounded focus:ring-gray-500 mt-0.5">
            <span class="text-gray-700 dark:text-gray-300">
              I agree to the <a href="#"
                class="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-medium">Terms
                of Service</a> and <a href="#"
                class="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-medium">Privacy
                Policy</a>
            </span>
          </label>
          
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-gradient-to-r from-gray-500 to-purple-600 text-white py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{ 'hover:scale-[1.02] active:scale-[0.98]': !loading }"
          >
            <i class="fas fa-user-plus mr-2"></i>
            {{ loading ? 'Creating Account...' : 'Create New Account' }}
          </button>
        </form>
      </div>

      <!-- Close Button -->
      <button 
        @click="closeModal"
        class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        <i class="fas fa-times text-sm"></i>
      </button>
    </div>
  </div>

  <!-- Forgot Password Modal -->
  <ForgotPasswordModal 
    :show="showForgotPassword" 
    @close="showForgotPassword = false"
    @submit="handleForgotPassword"
  />
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import ForgotPasswordModal from './ForgotPasswordModal.vue'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close', 'login', 'register'])

// Form state
const activeTab = ref('login')
const showForgotPassword = ref(false)
const loading = ref(false)

// Login form
const loginForm = ref({
  email: '',
  password: '',
  remember: false
})

const showLoginPassword = ref(false)

// Register form
const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
})

const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)

// Methods
const closeModal = (event) => {
  if (event.target.id === 'authModal') {
    emit('close')
  }
}

const handleLogin = async () => {
  if (!loginForm.value.email || !loginForm.value.password) {
    return
  }

  loading.value = true
  try {
    await emit('login', loginForm.value)
    // Reset form
    loginForm.value = { email: '', password: '', remember: false }
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  if (!registerForm.value.name || !registerForm.value.email || !registerForm.value.password) {
    return
  }

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }

  if (!registerForm.value.terms) {
    alert('Please accept the terms and conditions')
    return
  }

  loading.value = true
  try {
    await emit('register', registerForm.value)
    // Reset form
    registerForm.value = { 
      name: '', 
      email: '', 
      password: '', 
      confirmPassword: '', 
      terms: false 
    }
  } catch (error) {
    console.error('Registration error:', error)
  } finally {
    loading.value = false
  }
}

const handleForgotPassword = async (email) => {
  console.log('Forgot password for:', email)
  // Implement forgot password logic
}
</script>