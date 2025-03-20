<template>
    <tr>
      <td>{{ product.name }}</td>
      <td>{{ product.category }}</td>
      <td>{{ product.price | currency }}</td>
      <td>
        <button @click="$emit('edit', product)">Edit</button>
        <button @click="$emit('delete', product.id)">Delete</button>
      </td>
    </tr>
  </template>
  
  <script setup>
  defineProps({ product: Object });
  </script>
  
  <style scoped>
  button { margin: 5px; padding: 5px 10px; cursor: pointer; }
  </style>
  