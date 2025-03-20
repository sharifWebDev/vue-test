<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import PreLoader from "@/components/core/PreLoader.vue";
import Sidebar from "@/components/Sidebar.vue";

const authStore = useAuthStore();
const router = useRouter();
const isSidebarOpen = ref(true);
const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

// Logout Function
const logout = () => {
  authStore.logout();
  router.push("/login"); // Redirect to login after logout
};
</script>

<template>
  <div class="page" style="min-height: calc(100vh - 10px); display: flex; flex-direction: row">
    <Sidebar/>
    <div class="page-wrapper">

      <AlertMessages
        :errors="errors"
        :errorMessage="errorMessage"
        :successMessage="successMessage"
        @clearErrors="clearErrors"
        @clearSuccess="clearSuccess"
      />

      <div
        v-if="isLoading"
        class="min-h-full bg-gray-200 flex items-center justify-center"
      >
        <PreLoader />
      </div>

      <main class="content main" v-else>
       <router-view />
      </main>

      <footer class="footer footer-transparent d-print-none">
        <div class="container-xl">
          <div class="row text-center align-items-center flex-row-reverse">
            <div class="col-lg-auto ms-lg-auto">
              <ul class="list-inline list-inline-dots mb-0">
                <li class="list-inline-item">
                  <a
                    href="https://tabler.io/docs"
                    target="_blank"
                    class="link-secondary"
                    rel="noopener"
                    >Documentation</a
                  >
                </li>
                <li class="list-inline-item">
                  <a href="./license.html" class="link-secondary">License</a>
                </li>
                <li class="list-inline-item">
                  <a
                    href="https://github.com/tabler/tabler"
                    target="_blank"
                    class="link-secondary"
                    rel="noopener"
                    >Source code</a
                  >
                </li>
                <li class="list-inline-item">
                  <a
                    href="https://github.com/sponsors/codecalm"
                    target="_blank"
                    class="link-secondary"
                    rel="noopener"
                  >
                    <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon text-pink icon-filled icon-inline"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                      />
                    </svg>
                    Sponsor
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-12 col-lg-auto mt-3 mt-lg-0">
              <ul class="list-inline list-inline-dots mb-0">
                <li class="list-inline-item">
                  Copyright &copy; 2023
                  <a href="." class="link-secondary">Tabler</a>. All rights
                  reserved.
                </li>
                <li class="list-inline-item">
                  <a
                    href="./changelog.html"
                    class="link-secondary"
                    rel="noopener"
                  >
                    v1.0.0-beta20
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
