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
          <div
            v-for="item in navItems"
            :key="item.label"
            class="relative"
            @mouseenter="openMenu(item.label)"
            @mouseleave="closeMenu"
          >
            <RouterLink
              :to="item.to"
              class="relative flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium text-sm whitespace-nowrap transition-colors duration-150 py-7"
              active-class="text-gray-900"
            >
              {{ item.label }}
              <svg
                v-if="item.dropdown"
                class="w-3 h-3 mt-0.5 transition-transform duration-200"
                :class="{ 'rotate-180': activeMenu === item.label }"
                fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <!-- Active underline -->
              <span
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8dc63f] transition-opacity duration-150"
                :class="$route.path.startsWith(item.to) ? 'opacity-100' : 'opacity-0'"
              />
            </RouterLink>

            <!-- Mega dropdown -->
            <Transition name="dropdown">
              <div
                v-if="item.dropdown && activeMenu === item.label"
                class="fixed left-0 right-0 bg-white shadow-xl border-t border-gray-100 z-50"
                :style="{ top: headerHeight + 'px' }"
                @mouseenter="openMenu(item.label)"
                @mouseleave="closeMenu"
              >
                <div class="max-w-7xl mx-auto px-8 py-8">
                  <!-- Wrap every 3 cols into a row -->
                  <div class="flex flex-col gap-8">
                    <div
                      v-for="(row, ri) in chunk(item.dropdown, 3)"
                      :key="ri"
                      class="grid grid-cols-3 gap-10"
                    >
                      <div v-for="col in row" :key="col.title">
                        <h3 class="font-bold text-gray-900 text-base mb-4">{{ col.title }}</h3>
                        <ul class="flex flex-col gap-3">
                          <li v-for="sub in col.items" :key="sub.label">
                            <RouterLink
                              :to="sub.to"
                              class="text-sm text-gray-600 hover:text-[#4a7c2f] transition-colors"
                              @click="activeMenu = null"
                            >
                              {{ sub.label }}
                            </RouterLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </nav>

        <!-- Desktop Search -->
        <div class="hidden lg:flex items-center flex-shrink-0 overflow-hidden">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Any enter a part#"
            class="px-3 py-2 bg-gray-100 border border-gray-300 text-sm text-gray-700 placeholder-gray-400 outline-none w-48 border-r-0"
            @keyup.enter="handleSearch"
          />
          <button
            class="px-5 py-2 bg-[#8dc63f] hover:bg-[#7ab530] text-white text-sm font-semibold transition-colors duration-150 border border-[#8dc63f]"
            @click="handleSearch"
          >
            Search
          </button>
        </div>

        <!-- Mobile: right side -->
        <div class="flex items-center gap-3 ml-auto lg:hidden">
          <button @click="searchOpen = !searchOpen" class="text-gray-500 hover:text-gray-700 p-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </button>
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
        <template v-for="item in navItems" :key="item.label">
          <RouterLink
            :to="item.to"
            class="px-2 py-2.5 text-gray-700 hover:text-[#4a7c2f] hover:bg-gray-50 rounded font-medium text-sm transition-colors"
            active-class="text-[#4a7c2f] bg-gray-50"
            @click="menuOpen = false"
          >
            {{ item.label }}
          </RouterLink>
          <!-- Mobile sub-items -->
          <template v-if="item.dropdown">
            <template v-for="col in item.dropdown" :key="col.title">
              <RouterLink
                v-for="sub in col.items"
                :key="sub.label"
                :to="sub.to"
                class="pl-6 py-2 text-gray-500 hover:text-[#4a7c2f] text-xs transition-colors"
                @click="menuOpen = false"
              >
                {{ sub.label }}
              </RouterLink>
            </template>
          </template>
        </template>
      </nav>
    </div>

    <!-- Bottom accent line -->
    <div class="h-0.5 bg-[#8dc63f]" />
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const menuOpen   = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const activeMenu  = ref(null)
const headerHeight = ref(80)

onMounted(() => {
  const el = document.querySelector('header')
  if (el) headerHeight.value = el.offsetHeight
})

let closeTimer = null

const openMenu = (label) => {
  clearTimeout(closeTimer)
  activeMenu.value = label
}
const closeMenu = () => {
  closeTimer = setTimeout(() => { activeMenu.value = null }, 80)
}

const navItems = [
  { label: 'About Us',     to: '/about' },
  {
    label: 'Product', to: '/product',
    dropdown: [
      {
        title: 'Power Module',
        items: [
          { label: 'IGBT Module',       to: '/product' },
          { label: 'Rectifier Module',  to: '/product' },
          { label: 'FRED Module',       to: '/product' },
          { label: 'SCR Module',        to: '/product' },
          { label: 'SiC MOSFET Module', to: '/product' },
        ],
      },
      {
        title: 'Discretes',
        items: [
          { label: 'IGBT Discretes',   to: '/product' },
          { label: 'Diode Discretes',  to: '/product' },
          { label: 'SCR Discretes',    to: '/product' },
          { label: 'Traic Discretes',  to: '/product' },
        ],
      },
      {
        title: 'Busbar',
        items: [],
      },
      {
        title: 'Relay',
        items: [],
      },
      {
        title: 'Fuse',
        items: [],
      },
    ],
  },
  { label: 'Application',  to: '/application' },
  { label: 'News',         to: '/news' },
  {
    label: 'Support', to: '/support',
    dropdown: [
      { title: 'Contact Us',      items: [] },
      { title: 'Download Center', items: [] },
    ],
  },
  { label: 'Partnerships', to: '/partnerships' },
]

const chunk = (arr, size) => {
  const result = []
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size))
  return result
}

const handleSearch = () => {
  // TODO: implement search
}
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
