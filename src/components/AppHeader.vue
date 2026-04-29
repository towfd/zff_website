<template>
  <header class="bg-white sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center h-16 lg:h-20 justify-between">

        <!-- Logo -->
        <RouterLink to="/" class="flex-shrink-0">
          <img src="@/assets/head_logo.png" alt="EFF Logo" class="h-12 w-auto" />
        </RouterLink>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-8">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="text-gray-600 hover:text-[#8dc63f] font-medium text-sm whitespace-nowrap transition-colors duration-150"
            active-class="text-[#8dc63f]"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <!-- Desktop Search -->
        <div class="hidden lg:flex items-center flex-shrink-0 border border-gray-300 rounded overflow-hidden">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Any enter a part#"
            class="px-3 py-2 bg-gray-100 text-sm text-gray-700 placeholder-gray-400 outline-none w-48"
            @keyup.enter="handleSearch"
          />
          <button
            class="px-5 py-2 bg-[#8dc63f] hover:bg-[#7ab530] text-white text-sm font-semibold transition-colors duration-150"
            @click="handleSearch"
          >
            Search
          </button>
        </div>

        <!-- Mobile: right side -->
        <div class="flex items-center gap-3 ml-auto lg:hidden">
          <!-- Mobile Search toggle -->
          <button @click="searchOpen = !searchOpen" class="text-gray-500 hover:text-gray-700 p-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>
          <!-- Hamburger -->
          <button @click="menuOpen = !menuOpen" class="text-gray-500 hover:text-gray-700 p-1">
            <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </div>

      <!-- Mobile Search Bar -->
      <div v-if="searchOpen" class="lg:hidden pb-3">
        <div class="flex border border-gray-300 rounded overflow-hidden">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Any enter a part#"
            class="flex-1 px-3 py-2 bg-gray-100 text-sm text-gray-700 placeholder-gray-400 outline-none"
            @keyup.enter="handleSearch"
          />
          <button
            class="px-4 py-2 bg-[#8dc63f] hover:bg-[#7ab530] text-white text-sm font-semibold transition-colors"
            @click="handleSearch"
          >
            Search
          </button>
        </div>
      </div>

      <!-- Mobile Nav Menu -->
      <nav v-if="menuOpen" class="lg:hidden border-t border-gray-100 py-3 flex flex-col gap-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="px-2 py-2.5 text-gray-700 hover:text-[#8dc63f] hover:bg-gray-50 rounded font-medium text-sm transition-colors"
          active-class="text-[#8dc63f] bg-gray-50"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>

    <!-- Bottom accent line -->
    <div class="h-0.5 bg-gradient-to-r from-[#8dc63f] via-[#8dc63f] to-[#4fc3c3]" />
  </header>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')

const navItems = [
  { label: 'About Us', to: '/about' },
  { label: 'Product', to: '/product' },
  { label: 'Application', to: '/application' },
  { label: 'News', to: '/news' },
  { label: 'Support', to: '/support' },
  { label: 'Partnerships', to: '/partnerships' },
]

const handleSearch = () => {
  // TODO: implement search
}
</script>
