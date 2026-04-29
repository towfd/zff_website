<template>
  <div class="flex flex-col min-h-screen bg-gray-50 text-gray-900">
    <AppHeader />
    <main class="flex-1 w-full">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>
