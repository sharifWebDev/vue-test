<template>
  <tr>
    <td>{{ product.title }}</td> 
    <td>{{ product.price }}</td>
    <td>{{ product.discount }}</td>
    <td>{{ product.stock }}</td>
    <td>{{ product.category.title }}</td>
    <td>{{ product.subcategory.title }}</td>
    <td>{{ product.brand.title }}</td>
    <td>{{ product.sku }}</td>
    <td>
      <button 
        @click="handleEdit" 
        class="btn btn-primary btn-sm me-2 edit" 
        :disabled="loading.edit"
        >
        <span v-if="loading.edit">
          <span class="spinner-border spinner-border-sm"></span> Edit
        </span>
        <span v-else>Edit</span>
      </button>

      <!-- view -->
       <button class="btn btn-info btn-sm me-2"
       @click="handleView"
       :disabled="loading.view">

       <span v-if="loading.view">
          <span class="spinner-border spinner-border-sm"></span> View
        </span>
        <span v-else>View</span>
       </button>

      
      <button 
        @click="handleDelete" 
        class="btn btn-danger btn-sm delete" 
        :disabled="loading.delete"
      >
      <span v-if="loading.delete">
          <span class="spinner-border spinner-border-sm"></span> Delete
        </span>
        <span v-else>Delete</span>
      </button>
    </td>
  </tr>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["edit", "view", "delete"]);

const loading = ref({
  edit: false,
  view: false,
  delete: false
});

const handleEdit = () => {
  loading.value.edit = true;
  setTimeout(() => {
    emit("edit");
    loading.value.edit = false;
  }, 1000); // Simulating API call delay
};

const handleView = () => {
  loading.value.view = true;
  setTimeout(() => {
    emit("view");
    loading.value.view = false;
  }, 1000); // Simulating API call delay
};

const handleDelete = () => {
  loading.value.delete = true;
  setTimeout(() => {
    emit("delete");
    loading.value.delete = false;
  }, 1000); // Simulating API call delay
};
</script>

<style scoped>
button {
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.spinner-border {
  width: 15px;
  height: 15px;
  border-width: 2px;
}
</style>
