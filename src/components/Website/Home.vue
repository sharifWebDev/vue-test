<template>
  <div class="website-home">
    <!-- Hero Section -->
    <section class="pt-20 pb-16 px-4">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Build Professional Applications
            <span class="text-primary-600 block">Without Writing Code</span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            AppBuilder Pro helps you create custom applications with our drag-and-drop builder. 
            No coding required. Launch your app in minutes.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link 
              to="/register" 
              class="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition font-semibold text-lg"
            >
              Get Started Free
            </router-link>
            <router-link 
              to="/features" 
              class="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition font-semibold text-lg"
            >
              Learn More
            </router-link>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features Preview -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto max-w-6xl px-4">
        <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Powerful Features
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <i class="fas fa-database text-blue-600 dark:text-blue-400 text-xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Database Integration</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Connect to any database and automatically generate forms, tables, and reports.
            </p>
          </div>
          <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <i class="fas fa-tools text-green-600 dark:text-green-400 text-xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Drag & Drop Builder</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Intuitive visual builder to create complex applications without coding.
            </p>
          </div>
          <div class="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <i class="fas fa-rocket text-purple-600 dark:text-purple-400 text-xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">One-Click Deployment</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Deploy your application with a single click to our secure cloud infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-16">
      <div class="container mx-auto max-w-4xl px-4 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Ready to Build Your Application?
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Join thousands of businesses that use AppBuilder Pro to create their custom applications.
        </p>
        <router-link 
          to="/register" 
          class="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition font-semibold text-lg"
        >
          <span>Start Free Trial</span>
          <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
// Home page component
</script>