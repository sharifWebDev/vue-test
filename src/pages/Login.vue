<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { success, error } from "toastr";

const authStore = useAuthStore();
const router = useRouter();
const errorMessage = ref("");
const loadingBtn = ref(false);
 

onMounted(() => {
  if (authStore.user || authStore.user?.role === "admin") {
    router.push("/dashboard");
  }
});

const form = ref({
  email: "",
  password: "",
});

const errors = ref({
  email: [],
  password: [],
});

// Validate a single field
const validateField = (field) => {
  if (!form.value[field]) {
    errors.value[field] = [`The ${field.replace("_", " ")} field is required.`];
  }
  else if (field === "email" && !validateEmail(form.value[field])) {
    errors.value[field] = [`The ${field.replace("_", " ")} field is invalid.`];
  }
   else {
    errors.value[field] = []; // Clear errors if field is valid
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
 
// Validate the entire form
const validateForm = () => {
  Object.keys(form.value).forEach((field) => validateField(field));
  return Object.values(errors.value).every(
    (errorArray) => errorArray.length === 0
  );
};

const handleSubmit = async () => {
  if (!validateForm()) return;  

  try {
    loadingBtn.value = true;
    await authStore.login(form.value);
    success("Login successful!");
    router.push("/dashboard");
  } catch (err) {
    loadingBtn.value = false;
    if (err.response && err.response.status === 422) {
      errors.value = err.response.data.errors;
    } else {
      error("An error occurred!");
      errorMessage.value = "An error occurred!";
      console.log("An error occurred:", err);
    }
  } finally {
    setTimeout(() => (loadingBtn.value = false), 300);
  }
};

onMounted(() => {
  if (authStore.user && authStore.user.role === "admin") {
    router.push("/dashboard");
  }
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Login
      </h2>

      <form @submit.prevent="handleSubmit" class="py-2">
        <!-- Email Field -->
        <div class="pb-4">
          <label class="block text-gray-600 font-medium pb-1">Email</label>
          <input
            type="email"
            v-model="form.email"
            placeholder="Enter your email"
            class="form-control "
             :class="{ 'is-invalid':  errors.email.length }"
            @keyup="validateField('email')"
          />
          <p v-if="errors.email.length" class="text-red-500 text-sm mt-1">
            {{ errors.email[0] }}
          </p>
        </div>

        <!-- Password Field -->
        <div class="pb-4">
          <label class="block text-gray-600 font-medium pb-1">Password</label>
          <input
            type="password"
            v-model="form.password"
            placeholder="Enter your password"
            class="form-control "
             :class="{ 'is-invalid':  errors.password.length }"
            @keyup="validateField('password')"
          />
          <p v-if="errors.password.length" class="text-red-500 text-sm mt-1">
            {{ errors.password[0] }}
          </p>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          :disabled="loadingBtn"
        >
          <span
            v-if="loadingBtn"
            class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"
          ></span>
          <span>{{ loadingBtn ? "Logging in..." : "Login" }}</span>
        </button>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-center mt-2">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.invalid-feedback {
  color: red;
  font-size: 0.875em;
}
.is-invalid {
  border-color: red;
  background-color: rgba(255, 214, 214, 0.2);
}
</style>
