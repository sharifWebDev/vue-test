<template>
  <div>
    <!-- Sidebar -->
    <div 
      :class="[
        'sidebar w-64 bg-white dark:bg-gray-800 shadow-sm z-30 h-full transition-all duration-300',
        { 'collapsed': isCollapsed },
        { 'open': isMobileOpen },
        { 'fixed md:relative': true }
      ]"
      :style="{ width: isCollapsed && windowWidth >= 768 ? '70px' : '256px' }"
    >
      <!-- Sidebar Header with Collapse Button -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <!-- Logo -->
        <a href="/dashboard" class="flex items-center space-x-2">
          <div class="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <i class="fa fa-cube text-white text-xl" aria-hidden="true"></i>
          </div>
          <span 
            v-if="!isCollapsed || windowWidth < 768"
            class="logo-text text-lg font-bold text-gray-800 dark:text-white"
          >
            AppBuilder<span class="text-gray-600">Pro</span>
          </span>
        </a>
        
        <!-- Collapse Button (Desktop) -->
        <button 
          v-if="windowWidth >= 768"
          @click="toggleCollapse"
          class="hidden md:block p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <i 
            :class="[
              'fas text-sm',
              isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'
            ]"
          ></i>
        </button>
      </div> 

      <!-- Navigation -->
      <nav class="p-3 flex-1 overflow-y-scroll no-scrollbar max-h-[100vh-6.5rem]">
        <ul class="space-y-1">
          <li v-for="item in navigationItems" :key="item.id">
            <router-link 
              :to="item.route"
              :class="[
                'nav-item flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                { 'active': isActive(item.route) },
                { 'justify-center': isCollapsed && windowWidth >= 768 }
              ]"
              :title="item.text"
              @click="handleNavigation"
            >
              <i :class="[item.icon, 'w-5 text-center', isCollapsed && windowWidth >= 768 ? 'mx-auto' : '']"></i>
              <span 
                v-if="!isCollapsed || windowWidth < 768"
                class="sidebar-text text-sm"
              >
                {{ item.text }}
              </span>
            </router-link>
          </li>
        </ul>
      </nav>

         <!-- User Info -->
      <div class="p-4 border-gray-200 dark:border-gray-700 mt-5">
        <div class="flex items-center space-x-3">
          <div class="user-avatar w-10 h-10 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center">
            <span class="text-gray-600 dark:text-gray-400 text-sm font-medium">
              {{ props.user.initials || 'JD' }}
            </span>
          </div>
          <div 
            v-if="!isCollapsed || windowWidth < 768"
            class="user-info flex-1 min-w-0"
          >
            <p class="text-sm font-medium text-gray-800 dark:text-white truncate">
              {{ props.user.name || 'John Doe' }}
            </p>
            <p class="text-xs text-gray-600 dark:text-gray-400 truncate">
              {{ props.user.role || 'User' }}
            </p>
          </div>
        </div>
      </div>

      
      <!-- Footer -->
      <div class="absolute bottom-0 w-full p-1 border-t border-gray-200 dark:border-gray-700">
        <button 
          @click="toggleDarkMode"
          :class="[
            'flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors',
            { 'justify-center': isCollapsed && windowWidth >= 768 }
          ]"
        >
          <i :class="[
            'w-5 text-center',
            isDark ? 'fas fa-sun' : 'fas fa-moon'
          ]"></i>
          <span 
            v-if="!isCollapsed || windowWidth < 768"
            class="dark-mode-text sidebar-text text-sm"
          >
            {{ darkModeText }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSidebarStore } from '@/stores/sidebar';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      initials: 'JD',
      name: 'John Doe',
      role: 'User'
    })
  }
});

const router = useRouter();
const route = useRoute();
const sidebarStore = useSidebarStore();

const windowWidth = ref(window.innerWidth);
const isDark = ref(false);

const navigationItems = ref([
  {
    id: 'overview',
    text: 'Overview',
    icon: 'fas fa-chart-pie',
    route: '/dashboard'
  },
  {
    id: 'applications',
    text: 'My Applications',
    icon: 'fas fa-layer-group',
    route: '/dashboard/applications'
  },
  {
    id: 'builder',
    text: 'App Builder',
    icon: 'fas fa-tools',
    route: '/dashboard/builder'
  },
  {
    id: 'packages',
    text: 'Packages',
    icon: 'fas fa-box-open',
    route: '/dashboard/packages'
  },
  {
    id: 'billing',
    text: 'Billing',
    icon: 'fas fa-credit-card',
    route: '/dashboard/billing'
  },
  // hk-prod-size-types
  {
    id: 'hk-prod-size-types',
    text: 'Size Types',
    icon: 'fas fa-layer-group',
    route: '/dashboard/hk-prod-size-types'
  },
  {
    id: 'settings',
    text: 'Settings',
    icon: 'fas fa-cog',
    route: '/dashboard/settings'
  }
]);

const isCollapsed = computed(() => sidebarStore.isCollapsed);
const isMobileOpen = computed(() => sidebarStore.isMobileOpen);

const darkModeText = computed(() => {
  return isDark.value ? 'Light Mode' : 'Dark Mode';
});

const isActive = (routePath) => {
  return route.path === routePath || route.path.startsWith(routePath);
};

const toggleCollapse = () => {
  sidebarStore.toggleCollapse();
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('darkMode', isDark.value);
  applyDarkMode();
};

const applyDarkMode = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const checkDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedMode !== null) {
    isDark.value = savedMode === 'true';
  } else {
    isDark.value = prefersDark;
  }
  applyDarkMode();
};

const handleNavigation = () => {
  if (windowWidth.value < 768) {
    sidebarStore.closeMobile();
  }
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value >= 768) {
    sidebarStore.isMobileOpen = false;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  checkDarkMode();
  
  // Listen for system preference changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemChange = (e) => {
    // Only update if user hasn't set a preference manually
    if (localStorage.getItem('darkMode') === null) {
      isDark.value = e.matches;
      applyDarkMode();
    }
  };
  
  mediaQuery.addEventListener('change', handleSystemChange);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.sidebar {
  transition: all 0.3s ease;
}

.sidebar.collapsed {
  width: 70px !important;
}

.sidebar.collapsed .sidebar-text {
  display: none;
}

.sidebar.collapsed .logo-text {
  display: none;
}

.sidebar.collapsed .user-info {
  display: none;
}

.sidebar.collapsed .user-avatar {
  margin: 0 auto;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
}

/* Mobile styles */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
}

.nav-item.active {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  font-weight: 500;
}

.dark .nav-item.active {
  background-color: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
}
</style>