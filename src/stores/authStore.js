import { defineStore } from "pinia";
import axiosClient from "@/axiosClient";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("authToken") || null, // Retrieve token from localStorage
    user: null, // Store user data here
  }),

  actions: {
    // Set the token in state and store it in localStorage
    setToken(token) {
      this.token = token;
      localStorage.setItem("authToken", token);
    },

    // Login action
    async login(credentials) {
      try {
        const response = await axiosClient.post("/login", credentials);
        this.token = response.data.token;
        localStorage.setItem("authToken", this.token);
      } catch (error) {
        console.log("Error logging in:", error);
        return false;
      }
    },

    // Fetch user data
    async getUser() {
      try {
        const response = await axiosClient.get("/user"); // Get user data from API
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },

    // Logout action
    logout() {
      this.token = null;
      localStorage.removeItem("authToken"); // Remove token from localStorage
      window.location.href = "/login"; // Redirect to login page
    },
  },
});
