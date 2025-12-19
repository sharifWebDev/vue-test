import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useDarkModeStore = defineStore('darkMode', () => {
  const isDark = ref(false);

  // Initialize from localStorage or system preference
  const initialize = () => {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode !== null) {
      isDark.value = savedMode === 'true';
    } else {
      isDark.value = prefersDark;
    }
    
    applyDarkMode();
  };

  // Toggle dark mode
  const toggle = () => {
    isDark.value = !isDark.value;
    localStorage.setItem('darkMode', isDark.value);
    applyDarkMode();
  };

  // Set dark mode
  const setDark = (value) => {
    isDark.value = value;
    localStorage.setItem('darkMode', value);
    applyDarkMode();
  };

  // Apply dark mode to HTML element
  const applyDarkMode = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Listen for system preference changes
  const watchSystemPreference = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if user hasn't set a preference manually
      if (localStorage.getItem('darkMode') === null) {
        isDark.value = e.matches;
        applyDarkMode();
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup function
    return () => mediaQuery.removeEventListener('change', handleChange);
  };

  onMounted(() => {
    initialize();
    watchSystemPreference();
  });

  return {
    isDark,
    toggle,
    setDark,
    initialize,
    applyDarkMode
  };
});