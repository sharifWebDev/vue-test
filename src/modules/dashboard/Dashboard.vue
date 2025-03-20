<template>
 <div class="page-header d-print-none">
    <div class="container-xl">
      <div class="row g-2 align-items-center justify-content-between">
        <div class="col">
          <div class="page-pretitle">Overview</div>
          <h2 class="page-title">Dashboard</h2>
        </div>
        <div class="col-auto">
          <!-- item list -->
           <router-link to="/item" class="btn btn-primary">Item List</router-link>
        </div>
      </div>
    </div>
  </div>

  
  <div class="page-body item">
    <div class="container-xl">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h3 class="card-title">Dashboard</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12">
                <!-- <font-awesome-icon :icon="['fas', 'home']" class="text-blue-500 text-xl" /> -->
              Welcome to Dashboard
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
