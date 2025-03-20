<script setup>
import { useRoute } from "vue-router";
import DefaultLayout from "./layouts/DefaultLayout.vue";

const route = useRoute();
</script>

<template>
  <main>
    <DefaultLayout />
  </main>
</template>
