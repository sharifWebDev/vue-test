<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm z-20">
    <div class="flex items-center justify-between p-3">
      <!-- Left side: Mobile Menu Button and Breadcrumb -->
      <div class="flex items-center space-x-3">
        <!-- Mobile Menu Button -->
        <button 
          @click="$emit('toggle-mobile-sidebar')"
          class="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <g id="Group_28009" data-name="Group 28009" transform="translate(0 16) rotate(-90)">
              <rect id="Rectangle_18283" data-name="Rectangle 18283" width="2" height="7" rx="1" fill="#9da3ae"></rect>
              <rect id="Rectangle_16236" data-name="Rectangle 16236" width="2" height="11" rx="1" transform="translate(14)" fill="#9da3ae"></rect>
              <rect id="Rectangle_18284" data-name="Rectangle 18284" width="2" height="16" rx="1" transform="translate(7)" fill="#9da3ae"></rect>
            </g>
          </svg>
        </button>
        
        <!-- Desktop Sidebar Toggle Button -->
        <button 
          @click="$emit('toggle-sidebar')"
          class="hidden md:block p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <g id="Group_28009" data-name="Group 28009" transform="translate(0 16) rotate(-90)">
              <rect id="Rectangle_18283" data-name="Rectangle 18283" width="2" height="7" rx="1" fill="#9da3ae"></rect>
              <rect id="Rectangle_16236" data-name="Rectangle 16236" width="2" height="11" rx="1" transform="translate(14)" fill="#9da3ae"></rect>
              <rect id="Rectangle_18284" data-name="Rectangle 18284" width="2" height="16" rx="1" transform="translate(7)" fill="#9da3ae"></rect>
            </g>
          </svg>
        </button>

        <!-- Website Link -->
        <a 
          class="btn bg-gray-50 dark:bg-gray-700 mx-4 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700" 
          href="/" 
          target="_blank"
          title="Browse Website"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path d="M56,48a8,8,0,1,0,8,8A8,8,0,0,0,56,48Zm-.829,14.808a6.858,6.858,0,0,1-4.39-11.256,7.6,7.6,0,0,1,.077.93,2.966,2.966,0,0,0,.382,2.26,3.729,3.729,0,0,1,.362,1.08c.1.341.5.519.77.729.552.423,1.081.916,1.666,1.288.387.246.628.368.515.84a2.98,2.98,0,0,1-.313.951,1.927,1.927,0,0,0,.321.861c.288.288.575.553.889.813C55.938,61.706,55.4,62.229,55.171,62.808Zm5.678-1.959a6.808,6.808,0,0,1-3.56,1.888,2.844,2.844,0,0,1,.842-1.129,2.865,2.865,0,0,0,.757-.937,6.506,6.506,0,0,1,.522-.893c.272-.419-.67-1.051-.975-1.184a10.052,10.052,0,0,1-1.814-1.13c-.435-.306-1.318.16-1.808-.054A9.462,9.462,0,0,1,53,56.166c-.6-.454-.574-.984-.574-1.654.472.017,1.144-.131,1.458.249.1.12.439.655.667.465.186-.155-.138-.779-.2-.925-.193-.451.439-.626.762-.932.422-.4,1.326-1.024,1.254-1.309s-.9-1.1-1.394-.969c-.073.019-.719.7-.844.8q0-.332.01-.663c0-.14-.26-.283-.248-.373.031-.227.664-.64.821-.821-.11-.069-.487-.392-.6-.345-.276.115-.588.194-.863.309a1.756,1.756,0,0,0-.025-.274,6.792,6.792,0,0,1,1.743-.506l.542.218.382.454.382.394.334.108.53-.5L57,49.536v-.321a6.782,6.782,0,0,1,2.9,1.146c-.155.014-.326.037-.518.061a1.723,1.723,0,0,0-.268-.1c.251.54.513,1.073.779,1.606.284.569.915,1.18,1.026,1.781.131.708.04,1.352.111,2.185a3.732,3.732,0,0,0,.9,1.714,1.812,1.812,0,0,0,.707.086A6.815,6.815,0,0,1,60.849,60.849Z" transform="translate(-48 -48)" fill="#717580"></path>
          </svg>
        </a>
        
       <Breadcrumb />
      </div>
      
      <!-- Right side: User Menu -->
      <div class="flex items-center space-x-3">
        <!-- Search Button (Mobile) -->
        <button class="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
          <i class="fas fa-search"></i>
        </button>
        
        <!-- Notifications Dropdown -->
        <div class="relative">
          <button 
            @click="toggleNotificationDropdown"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 relative"
          >
            <i class="fas fa-bell"></i>
            <span 
              v-if="unreadNotificationsCount > 0"
              class="notification-badge bg-red-500 text-white rounded-full"
            >
              {{ unreadNotificationsCount }}
            </span>
          </button>
          
          <!-- Notification Dropdown -->
          <div 
            v-if="notificationDropdownOpen"
            class="notification-dropdown absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50 border border-gray-200 dark:border-gray-700"
          >
            <!-- Notification Header -->
            <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div class="flex justify-between items-center">
                <h3 class="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                <div class="flex items-center space-x-2">
                  <button 
                    @click="markAllAsRead"
                    class="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Mark all as read
                  </button>
                  <button 
                    @click="openNotificationSettings"
                    class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <i class="fas fa-cog text-sm"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Notification List -->
            <div class="max-h-96 overflow-y-auto">
              <div 
                v-for="notification in notifications" 
                :key="notification.id"
                :class="[
                  'notification-item px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer',
                  { 'unread': notification.unread }
                ]"
                @click="markAsRead(notification)"
              >
                <div class="flex items-start space-x-3">
                  <div :class="['p-2 rounded-lg', notification.typeClass]">
                    <i :class="notification.icon"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-800 dark:text-white">
                      {{ notification.title }}
                    </p>
                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                      {{ notification.message }}
                    </p>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        {{ notification.time }}
                      </span>
                      <span 
                        v-if="notification.unread"
                        class="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full"
                      >
                        New
                      </span>
                    </div>
                  </div>
                  <button 
                    @click.stop="removeNotification(notification)"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <i class="fas fa-times text-xs"></i>
                  </button>
                </div>
              </div>
              
              <!-- Empty State -->
              <div 
                v-if="notifications.length === 0"
                class="px-4 py-8 text-center"
              >
                <i class="fas fa-bell-slash text-gray-400 text-2xl mb-2"></i>
                <p class="text-gray-500 dark:text-gray-400 text-sm">No notifications</p>
                <p class="text-gray-400 dark:text-gray-500 text-xs mt-1">You're all caught up!</p>
              </div>
            </div>
            
            <!-- Notification Footer -->
            <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <a href="#all-notifications" class="block text-center text-sm text-primary-600 dark:text-primary-400 hover:underline">
                View all notifications
              </a>
            </div>
          </div>
        </div>
        
        <!-- User Avatar -->
        <div class="relative">
          <button 
            @click="toggleUserDropdown"
            class="flex items-center space-x-2 p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700"
          >
            <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span class="text-primary-600 dark:text-primary-400 text-xs font-medium">{{ props.user.initials || 'JD' }}</span>
            </div>
            <span class="text-gray-700 dark:text-gray-300 hidden md:block text-sm">{{ props.user.name || 'User' }}</span>
            <i class="fas fa-chevron-down text-gray-500 dark:text-gray-400 text-xs"></i>
          </button>
          
          <!-- User Dropdown -->
          <div 
            v-if="userDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700"
          >
            <div class="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
              <p class="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
              <p class="font-medium text-gray-800 dark:text-white text-sm">{{ props.user.email || 'user@example.com' }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ props.user.role || 'User' }}</p>
            </div>
            <a href="#profile" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Profile
            </a>
            <a href="#settings" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Account Settings
            </a>
            <div class="border-t border-gray-100 dark:border-gray-700 my-1"></div>
            <a href="/" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Back to Website
            </a>
            <a 
              href="#" 
              @click.prevent="logout"
              class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useSidebarStore } from '@/stores/sidebar';
import Breadcrumb from '../core/Breadcrumb.vue';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      initials: 'JD',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'User'
    })
  }
});

const emit = defineEmits(['toggle-sidebar', 'toggle-mobile-sidebar', 'logout']);

const sidebarStore = useSidebarStore();
const windowWidth = ref(window.innerWidth);
const notificationDropdownOpen = ref(false);
const userDropdownOpen = ref(false);

const notifications = ref([
  {
    id: 1,
    title: 'Application built successfully',
    message: 'Your app "Inventory Manager" has been successfully built and deployed.',
    time: '2 hours ago',
    type: 'success',
    unread: true,
    icon: 'fas fa-check-circle text-sm',
    typeClass: 'notification-success'
  },
  {
    id: 2,
    title: 'Storage limit warning',
    message: 'You\'ve used 85% of your available storage. Consider upgrading your plan.',
    time: '5 hours ago',
    type: 'warning',
    unread: true,
    icon: 'fas fa-exclamation-triangle text-sm',
    typeClass: 'notification-warning'
  },
  {
    id: 3,
    title: 'New feature available',
    message: 'AI-powered form builder is now available for all Pro users.',
    time: 'Yesterday',
    type: 'info',
    unread: false,
    icon: 'fas fa-info-circle text-sm',
    typeClass: 'notification-info'
  },
  {
    id: 4,
    title: 'Payment received',
    message: 'Your payment of $49.99 for the Pro plan has been processed successfully.',
    time: '2 days ago',
    type: 'success',
    unread: false,
    icon: 'fas fa-credit-card text-sm',
    typeClass: 'notification-success'
  }
]);

const unreadNotificationsCount = computed(() => {
  return notifications.value.filter(n => n.unread).length;
});

const toggleNotificationDropdown = () => {
  notificationDropdownOpen.value = !notificationDropdownOpen.value;
  userDropdownOpen.value = false;
};

const toggleUserDropdown = () => {
  userDropdownOpen.value = !userDropdownOpen.value;
  notificationDropdownOpen.value = false;
};

const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.unread = false;
  });
};

const markAsRead = (notification) => {
  notification.unread = false;
};

const removeNotification = (notification) => {
  const index = notifications.value.findIndex(n => n.id === notification.id);
  if (index !== -1) {
    notifications.value.splice(index, 1);
  }
};

const openNotificationSettings = () => {
  alert('Notification settings would open here');
};

const logout = () => {
  emit('logout');
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      notificationDropdownOpen.value = false;
      userDropdownOpen.value = false;
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 18px;
  height: 18px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-dropdown {
  width: 380px;
  max-height: 500px;
  overflow-y: auto;
}

@media (max-width: 640px) {
  .notification-dropdown {
    width: 300px;
    right: -50px;
  }
}

.notification-item.unread {
  background-color: rgba(59, 130, 246, 0.05);
}

.dark .notification-item.unread {
  background-color: rgba(59, 130, 246, 0.1);
}

/* Notification type colors */
.notification-success {
  background-color: #d1fae5;
  color: #065f46;
}

.dark .notification-success {
  background-color: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.notification-warning {
  background-color: #fef3c7;
  color: #92400e;
}

.dark .notification-warning {
  background-color: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
}

.notification-error {
  background-color: #fee2e2;
  color: #991b1b;
}

.dark .notification-error {
  background-color: rgba(239, 68, 68, 0.2);
  color: #f87171;
}

.notification-info {
  background-color: #dbeafe;
  color: #1e40af;
}

.dark .notification-info {
  background-color: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
}

/* Scrollbar styling */
.notification-dropdown::-webkit-scrollbar {
  width: 6px;
}

.notification-dropdown::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.dark .notification-dropdown::-webkit-scrollbar-track {
  background: #374151;
}

.notification-dropdown::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.dark .notification-dropdown::-webkit-scrollbar-thumb {
  background: #6b7280;
}
</style>