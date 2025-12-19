<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Navigation Bar -->
    <header class="fixed w-full nav-glass z-50 shadow-sm">
      <div class="container mx-auto">
        <div class="lg:max-w-[86rem] mx-auto flex justify-between items-center py-4">
          <!-- Logo -->
          <router-link to="/" class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
              <i class="fas fa-cube text-white text-xl"></i>
            </div>
            <span class="text-xl font-bold text-gray-800 dark:text-white">
              AppBuilder<span class="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">Pro</span>
            </span>
          </router-link>
          
          <!-- Desktop Menu -->
          <nav class="hidden lg:flex items-center space-x-8">
            <a href="#home" class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-medium">Home</a>
            <a href="#packages" class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-medium">Packages</a>
            <a href="#about" class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-medium">About</a>
            <a href="#contact" class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-medium">Contact</a>
            <a href="#faq" class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-medium">FAQ</a>
            <button @click="openAuthModal" class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-medium">Login</button>
            <router-link to="/dashboard" class="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-5 py-2.5 rounded-lg hover:shadow-lg transition font-medium">Make App</router-link>
          </nav>
          
          <!-- Dark Mode Toggle & Mobile Menu Button -->
          <div class="flex items-center space-x-4">
            <!-- Login Button for Mobile -->
            <button @click="openAuthModal" class="lg:hidden text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-medium">
              <i class="fas fa-user"></i>
            </button>
            
            <!-- Dark Mode Toggle -->
            <button @click="toggleDarkMode" class="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:shadow transition">
              <i class="fas fa-moon dark:hidden"></i>
              <i class="fas fa-sun hidden dark:block"></i>
            </button>
            
            <!-- Mobile Menu Button -->
            <button @click="toggleMobileMenu" class="lg:hidden p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:shadow transition">
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </div>
        
        <!-- Mobile Menu -->
        <div v-show="mobileMenuOpen" class="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col space-y-4">
            <a href="#home" @click="closeMobileMenu" class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-medium py-2">Home</a>
            <a href="#packages" @click="closeMobileMenu" class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-medium py-2">Packages</a>
            <a href="#about" @click="closeMobileMenu" class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-medium py-2">About</a>
            <a href="#contact" @click="closeMobileMenu" class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-medium py-2">Contact</a>
            <a href="#faq" @click="closeMobileMenu" class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-medium py-2">FAQ</a>
            <button @click="openAuthModal" class="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition font-medium py-2 text-left">Login</button>
            <router-link to="/dashboard" @click="closeMobileMenu" class="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2.5 rounded-lg hover:shadow-lg transition font-medium text-center mt-2">Make App</router-link>
          </div>
        </div>
      </div>
    </header>
    
    <!-- Hero Section -->
    <section id="home" class="section-padding pt-24 hero-gradient text-white relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/5"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/5"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5"></div>
      </div>
      
      <div class="container mx-auto max-w-8xl px-4 relative z-10">
        <div class="lg:max-w-[86rem] mx-auto items-center justify-center flex flex-col md:flex-row md:justify-between md:items-center md:space-y-0 md:space-x-10 md:py-10 w-full gap-6"> 
          <div class="items-center md:items-start">
            <div class="md:w-full mb-10 md:mb-0">
              <h1 class="text-4xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight text-center md:text-left">
                Build Custom Business Applications 
                <span class="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">in Minutes</span>
              </h1>
              <p class="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                Transform your business processes with our powerful platform that generates custom CRUD applications tailored to your needs.
              </p>
              <div class="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#packages" class="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
                  <span>View Packages</span>
                  <i class="fas fa-arrow-right"></i>
                </a>
                <a href="#about" class="glass-effect text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition flex items-center justify-center gap-2">
                  <span>Learn More</span>
                  <i class="fas fa-play-circle"></i>
                </a>
              </div>
            </div>
          </div>
          
          <!-- App Preview Slider -->
          <div class="mt-16 mx-auto md:mt-0 md:mx-0 md:w-1/2 relative">
            <DashboardSlider />
          </div>
        </div>
      </div>
    </section>

    <!-- Packages Section -->
    <!-- <PackagesSection @view-package="openPackageModal" @buy-package="openPurchaseModal" /> -->

    <!-- About Us Section -->
    <AboutSection />

    <!-- Contact Us Section -->
    <ContactSection />

    <!-- FAQ Section -->
    <FAQSection />

    <!-- Footer -->
    <Footer />

    <!-- Package Details Modal -->
    <!-- <PackageModal 
      :show="showPackageModal" 
      :package="selectedPackage" 
      @close="closePackageModal" 
    />
 
    <PurchaseModal 
      :show="showPurchaseModal" 
      :package="selectedPackage" 
      @close="closePurchaseModal" 
      @success="handlePurchaseSuccess"
    />
 
    <AuthModal 
      :show="showAuthModal" 
      @close="closeAuthModal" 
      @login="handleLogin"
      @register="handleRegister"
    /> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDarkModeStore } from '@/stores/darkMode'
import { useAuthStore } from '@/stores/authStore'
import DashboardSlider from '@/components/Website/DashboardSlider.vue'
// import PackagesSection from '@/components/Website/PackagesSection.vue'
// import AboutSection from '@/components/Website/AboutSection.vue'
// import ContactSection from '@/components/Website/ContactSection.vue'
// import FAQSection from '@/components/Website/FAQSection.vue'
// import Footer from '@/components/Website/Footer.vue'
// import PackageModal from '@/components/Website/Modals/PackageModal.vue'
// import PurchaseModal from '@/components/Website/Modals/PurchaseModal.vue'
// import AuthModal from '@/components/Website/Modals/AuthModal.vue'

const router = useRouter()
const darkModeStore = useDarkModeStore()
const authStore = useAuthStore()

// State
const mobileMenuOpen = ref(false)
const showPackageModal = ref(false)
const showPurchaseModal = ref(false)
const showAuthModal = ref(false)
const selectedPackage = ref(null)

// Toggle dark mode
const toggleDarkMode = () => {
  darkModeStore.toggleDarkMode()
}

// Mobile menu handlers
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Package modal handlers
const openPackageModal = (packageType) => {
  selectedPackage.value = packageType
  showPackageModal.value = true
}

const closePackageModal = () => {
  showPackageModal.value = false
  selectedPackage.value = null
}

// Purchase modal handlers
const openPurchaseModal = (packageType) => {
  selectedPackage.value = packageType
  showPurchaseModal.value = true
}

const closePurchaseModal = () => {
  showPurchaseModal.value = false
  selectedPackage.value = null
}

// Auth modal handlers
const openAuthModal = () => {
  showAuthModal.value = true
  closeMobileMenu()
}

const closeAuthModal = () => {
  showAuthModal.value = false
}

// Form handlers
const handleLogin = async (credentials) => {
  try {
    await authStore.login(credentials)
    closeAuthModal()
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  }
}

const handleRegister = async (userData) => {
  try {
    await authStore.register(userData)
    closeAuthModal()
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration failed:', error)
  }
}

const handlePurchaseSuccess = () => {
  closePurchaseModal()
  router.push('/dashboard')
}

// Smooth scroll for anchor links
const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      
      const targetId = this.getAttribute('href')
      if (targetId === '#') return
      
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        })
      }
    })
  })
}

// Fade-in animation on scroll
const fadeElements = ref([])

const setupFadeAnimation = () => {
  fadeElements.value = document.querySelectorAll('.fade-in')
  
  const fadeInOnScroll = () => {
    fadeElements.value.forEach(element => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible')
      }
    })
  }
  
  window.addEventListener('scroll', fadeInOnScroll)
  fadeInOnScroll() // Initial check
  
  return () => {
    window.removeEventListener('scroll', fadeInOnScroll)
  }
}

// Initialize
onMounted(() => {
  smoothScroll()
  const cleanup = setupFadeAnimation()
  
  onUnmounted(() => {
    cleanup()
  })
})
</script>

<style scoped>
/* Hero gradient styles */
.hero-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.dark .hero-gradient {
  background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
}

/* Common section styles */
.section-padding {
  padding-top: 6rem;
  padding-bottom: 6rem;
}

/* Glass effect styles */
.nav-glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.dark .nav-glass {
  background: rgba(17, 24, 39, 0.8);
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Feature icon styles */
.feature-icon {
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
}

/* Floating animation */
.floating-animation {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

/* Fade-in animation */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>