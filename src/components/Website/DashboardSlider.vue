<template>
  <div class="slider-container bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
    <div class="flex items-center justify-between mb-4">
      <div class="flex space-x-2">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div class="text-sm font-medium">AppBuilder Dashboard</div>
      <div class="flex space-x-2">
        <div class="w-2 h-2 rounded-full bg-white/50"></div>
        <div class="w-2 h-2 rounded-full bg-white/50"></div>
        <div class="w-2 h-2 rounded-full bg-white/50"></div>
      </div>
    </div>
    
    <div class="relative">
      <button @click="prevSlide" class="slider-nav prev">
        <i class="fas fa-chevron-left"></i>
      </button>
      
      <div class="slider-track gap-3" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <!-- Slide 1: User Management -->
        <div class="slider-slide" :class="{ 'slide-fade': currentSlide === 0 }">
          <UserManagementSlide />
        </div>
        
        <!-- Slide 2: Analytics Dashboard -->
        <div class="slider-slide" :class="{ 'slide-fade': currentSlide === 1 }">
          <AnalyticsSlide />
        </div>
        
        <!-- Slide 3: Project Management -->
        <div class="slider-slide" :class="{ 'slide-fade': currentSlide === 2 }">
          <ProjectManagementSlide />
        </div>
      </div>
      
      <button @click="nextSlide" class="slider-nav next">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    
    <!-- Slider Dots -->
    <div class="slider-dots">
      <div 
        v-for="index in totalSlides" 
        :key="index"
        class="slider-dot" 
        :class="{ 'active': currentSlide === index - 1 }"
        @click="goToSlide(index - 1)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// import UserManagementSlide from './SliderSlides/UserManagementSlide.vue'
// import AnalyticsSlide from './SliderSlides/AnalyticsSlide.vue'
// import ProjectManagementSlide from './SliderSlides/ProjectManagementSlide.vue'

const currentSlide = ref(0)
const totalSlides = 3
let autoSlideInterval

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides
  resetAutoSlide()
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides
  resetAutoSlide()
}

const goToSlide = (index) => {
  currentSlide.value = index
  resetAutoSlide()
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 5000)
}

const resetAutoSlide = () => {
  clearInterval(autoSlideInterval)
  startAutoSlide()
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  clearInterval(autoSlideInterval)
})
</script>

<style scoped>
.slider-container {
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
}

.slider-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slider-slide {
  min-width: 100%;
  transition: opacity 0.5s ease;
}

.slider-dots {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.slider-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.slider-dot.active {
  background-color: white;
  transform: scale(1.2);
}

.slider-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.slider-nav:hover {
  background: rgba(255, 255, 255, 0.3);
}

.slider-nav.prev {
  left: 15px;
}

.slider-nav.next {
  right: 15px;
}

.slide-fade {
  animation: slideFade 0.8s ease-in-out;
}

@keyframes slideFade {
  from {
    opacity: 0.7;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>