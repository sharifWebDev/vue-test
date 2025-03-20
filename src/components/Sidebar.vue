<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <router-link to="/" class="sidebar-logo">
        <img src="../assets/logo.svg" alt="Logo" />
      </router-link>
    </div>
    
    <ul class="sidebar-menu">
      <SidebarItem icon="home" label="Home" to="/" />
      <SidebarItem icon="check-square" label="Item" to="/item" />
      <SidebarItem icon="dollar-sign" label="Products" to="/products" />
      
      <SidebarDropdown icon="users" label="Users" v-if="canAccess('user_management')">
        <SidebarItem icon="user" label="All Users" to="/users" />
        <SidebarItem icon="user-plus" label="Add User" to="/users/create" />
      </SidebarDropdown>
    </ul>
  </aside>
</template>

<script>
import SidebarItem from "@/components/SidebarItem.vue";
import SidebarDropdown from "@/components/SidebarDropdown.vue";

export default {
  components: {
    SidebarItem,
    SidebarDropdown
  },
  methods: {
    canAccess(permission) {
      // Replace with actual permission logic
      return true;
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: #1e1e2d;
  color: #ffffff;
  padding: 10px;
}
.sidebar-header {
  text-align: center;
  padding: 15px 0;
}
.sidebar-logo img {
  height: 40px;
  padding: 4px;
}
.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
