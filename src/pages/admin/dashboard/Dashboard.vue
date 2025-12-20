<template>
  <!-- Page Header -->
  <div class="mb-6">
    <h1 class="text-xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
    <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">Welcome back, John! Here's what's happening with your
      applications.</p>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
    <div
      class="dashboard-card bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-gray-600 dark:text-gray-400">Active Applications</p>
          <h3 class="text-xl font-bold text-gray-800 dark:text-white mt-1">12</h3>
        </div>
        <div class="p-2.5 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
          <i class="fas fa-layer-group text-gray-600 dark:text-gray-400 text-lg"></i>
        </div>
      </div>
      <div class="mt-4">
        <div class="flex items-center text-xs text-green-600 dark:text-green-400">
          <i class="fas fa-arrow-up mr-1 text-xs"></i>
          <span>2 new this month</span>
        </div>
      </div>
    </div>

    <div
      class="dashboard-card bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-gray-600 dark:text-gray-400">Current Package</p>
          <h3 class="text-xl font-bold text-gray-800 dark:text-white mt-1">Standard</h3>
        </div>
        <div class="p-2.5 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <i class="fas fa-box-open text-green-600 dark:text-green-400 text-lg"></i>
        </div>
      </div>
      <div class="mt-4">
        <div class="flex items-center text-xs text-gray-600 dark:text-gray-400">
          <i class="far fa-calendar-alt mr-1.5"></i>
          <span>Renews Oct 15</span>
        </div>
      </div>
    </div>

    <div
      class="dashboard-card bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-gray-600 dark:text-gray-400">Builds This Month</p>
          <h3 class="text-xl font-bold text-gray-800 dark:text-white mt-1">7</h3>
        </div>
        <div class="p-2.5 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
          <i class="fas fa-tools text-purple-600 dark:text-purple-400 text-lg"></i>
        </div>
      </div>
      <div class="mt-4">
        <div class="flex items-center text-xs text-green-600 dark:text-green-400">
          <i class="fas fa-arrow-up mr-1 text-xs"></i>
          <span>3 more than last month</span>
        </div>
      </div>
    </div>

    <div
      class="dashboard-card bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-medium text-gray-600 dark:text-gray-400">Storage Used</p>
          <h3 class="text-xl font-bold text-gray-800 dark:text-white mt-1">2.4 GB</h3>
        </div>
        <div class="p-2.5 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
          <i class="fas fa-database text-yellow-600 dark:text-yellow-400 text-lg"></i>
        </div>
      </div>
      <div class="mt-4">
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div class="bg-yellow-500 h-1.5 rounded-full" style="width: 60%"></div>
        </div>
        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">4 GB total available</p>
      </div>
    </div>
  </div>

  <!-- Recent Activity & Quick Actions -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Recent Activity -->
    <div class="lg:col-span-2">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center mb-5">
          <h2 class="font-semibold text-gray-800 dark:text-white">Recent Activity</h2>
          <a href="#" class="text-xs text-gray-600 dark:text-gray-400 hover:underline">View All</a>
        </div>

        <div class="space-y-4">
          <div class="flex items-start space-x-3">
            <div class="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg mt-0.5">
              <i class="fas fa-check text-green-600 dark:text-green-400 text-sm"></i>
            </div>
            <div class="flex-1">
              <p class="text-gray-800 dark:text-white text-sm">Application "Inventory Manager" was built successfully
              </p>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">2 hours ago</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="p-2 bg-gray-50 dark:bg-gray-900/30 rounded-lg mt-0.5">
              <i class="fas fa-upload text-gray-600 dark:text-gray-400 text-sm"></i>
            </div>
            <div class="flex-1">
              <p class="text-gray-800 dark:text-white text-sm">You imported a new database schema</p>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Yesterday</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg mt-0.5">
              <i class="fas fa-download text-purple-600 dark:text-purple-400 text-sm"></i>
            </div>
            <div class="flex-1">
              <p class="text-gray-800 dark:text-white text-sm">Application "CRM System" was exported</p>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">3 days ago</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg mt-0.5">
              <i class="fas fa-exclamation text-yellow-600 dark:text-yellow-400 text-sm"></i>
            </div>
            <div class="flex-1">
              <p class="text-gray-800 dark:text-white text-sm">Payment for Standard plan was processed</p>
              <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">1 week ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div>
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700">
        <h2 class="font-semibold text-gray-800 dark:text-white mb-5">Quick Actions</h2>

        <div class="space-y-3">
          <a href="#builder"
            class="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="p-2 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
              <i class="fas fa-plus text-gray-600 dark:text-gray-400 text-sm"></i>
            </div>
            <span class="text-gray-700 dark:text-gray-300 text-sm">Create New App</span>
          </a>

          <a href="#packages"
            class="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <i class="fas fa-box-open text-green-600 dark:text-green-400 text-sm"></i>
            </div>
            <span class="text-gray-700 dark:text-gray-300 text-sm">Upgrade Package</span>
          </a>

          <a href="#billing"
            class="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="p-2 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
              <i class="fas fa-file-invoice text-gray-600 dark:text-gray-400 text-sm"></i>
            </div>
            <span class="text-gray-700 dark:text-gray-300 text-sm">View Invoices</span>
          </a>

          <a href="#settings"
            class="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div class="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <i class="fas fa-cog text-purple-600 dark:text-purple-400 text-sm"></i>
            </div>
            <span class="text-gray-700 dark:text-gray-300 text-sm">Account Settings</span>
          </a>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { ref } from "vue";
</script>

<style scoped>
 
</style>
