<template>
    <DefaultLayout>
      <div v-if="product">
        <p>{{ product.title }}</p>
        <p>{{ product.slug }}</p>
        <p>{{ product.price }}</p>
        <p>{{ product.discount }}</p>
        <p>{{ product.stock }}</p>
        <p>{{ product.category.title }}</p>
        <p>{{ product.subcategory.title }}</p>
        <p>{{ product.brand.title }}</p>
        <p>{{ product.sku }}</p>
        <p>{{ product.seo_title }}</p>
        <p>{{ product.seo_description }}</p>
        <router-link to="/products"><button>Back</button></router-link>
      </div>
     <!-- Correctly emit event on click -->
    <p @click="$emit('show-child')">Show Child Component</p>
  </DefaultLayout>
</template>

<script setup>
 
 import { computed } from 'vue';
 import { useProductStore } from '@/stores/productStore';
 import { useRoute } from 'vue-router';
 
 const store = useProductStore();
 const route = useRoute();
 
 const product = computed(() => store.products.find(p => p.id == route.params.id));

 defineProps({
   product: Object,
 });
 
 defineEmits(["show-child"]);
 
  </script>
  
  <style scoped>
  button { margin-top: 10px; }
  </style>
  