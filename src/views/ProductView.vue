<template>
  <div>
    <!-- Hero -->
    <section class="w-full flex flex-col lg:flex-row">
      <div class="flex-1 flex items-center px-10 py-16 lg:px-16 lg:py-20 bg-white">
        <div class="max-w-lg">
          <h1 class="text-4xl lg:text-5xl font-extrabold text-[#4a5a1a] leading-tight mb-4">
            IGBT Modules
          </h1>
          <div class="w-44 h-1 bg-[#4a5a1a] mb-8" />
          <p class="text-gray-700 text-base leading-relaxed mb-10">
            Experience unique performance and reliability with EIT's IGBT modules along with application insights, product details, and more.
          </p>
          <button
            @click="showModal = true"
            class="inline-block px-8 py-3 bg-[#4a7c2f] hover:bg-[#3a6022] text-white font-bold text-base rounded transition-colors duration-200"
          >
            Get a Quote
          </button>
        </div>
      </div>
      <div class="flex-1 min-h-[320px] lg:min-h-[480px]">
        <img :src="heroImg" alt="IGBT Modules" class="w-full h-full object-cover" />
      </div>
    </section>

    <!-- Tagline banner -->
    <section class="w-full bg-gray-100 py-10 text-center">
      <p class="text-2xl lg:text-3xl font-extrabold italic text-gray-800 leading-snug">
        Tested and Trusted.<br />Your best IGBT Modules
      </p>
    </section>

    <!-- Services section -->
    <section class="w-full bg-white py-16 px-6 lg:px-16">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div class="flex-1 max-w-lg">
          <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
            <em>EIT</em> got you covered<br />
            we could be your daily<br />
            service!!
          </h2>
          <p class="text-gray-500 text-sm leading-relaxed mb-8">
            Built to solve our users problem, commitment in makin our users happy
            our vision is to make the users meet their expectations.
          </p>
          <ul class="flex flex-col gap-5 mb-10">
            <li v-for="item in features" :key="item" class="flex items-center gap-4">
              <span class="flex-shrink-0 w-9 h-9 rounded-full bg-[#4a7c2f] flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span class="text-gray-800 text-base font-medium">{{ item }}</span>
            </li>
          </ul>
          <RouterLink
            to="/contact"
            class="inline-block px-8 py-3 bg-[#4a7c2f] hover:bg-[#3a6022] text-white font-bold text-base rounded transition-colors duration-200"
          >
            Contact us
          </RouterLink>
        </div>
        <div class="flex-1 flex justify-center lg:justify-end">
          <img :src="servicesImg" alt="Services" class="w-full max-w-lg object-contain" />
        </div>
      </div>
    </section>

    <!-- Product Catalog -->
    <section class="w-full bg-gray-50 py-10">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-8 items-start">

        <!-- Sidebar filters -->
        <aside class="w-full lg:w-56 flex-shrink-0 bg-white border border-gray-200">
          <div v-for="group in filterGroups" :key="group.key">
            <!-- Group header -->
            <button
              class="w-full flex items-center justify-between px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
              @click="group.open = !group.open"
            >
              <span class="text-xs font-bold text-gray-800 tracking-wider uppercase">{{ group.label }}</span>
              <svg
                class="w-4 h-4 text-gray-500 transition-transform duration-200"
                :class="{ 'rotate-180': group.open }"
                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Options -->
            <div v-show="group.open" class="px-4 py-2 border-b border-gray-200">
              <label
                v-for="opt in group.options"
                :key="opt.value"
                class="flex items-center justify-between py-1.5 cursor-pointer group"
              >
                <div class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    :checked="activeFilters[group.key].includes(opt.value)"
                    @change="toggleFilter(group.key, opt.value)"
                    class="w-4 h-4 accent-[#4a7c2f] cursor-pointer"
                  />
                  <span class="text-sm text-gray-700 group-hover:text-[#4a7c2f] transition-colors">{{ opt.value }}</span>
                </div>
                <span class="text-xs text-gray-400">{{ getOptionCount(group.key, opt.value) }}</span>
              </label>
            </div>
          </div>
        </aside>

        <!-- Right: filters bar + list -->
        <div class="flex-1 min-w-0">

          <!-- Active filter tags -->
          <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-2 mb-5">
            <span class="text-sm text-gray-600 font-medium">Filter Selected :</span>
            <!-- Search query tag -->
            <span
              v-if="searchQuery"
              class="inline-flex items-center gap-1 px-3 py-1 bg-[#2d5016] text-white text-xs font-semibold rounded"
            >
              Part#: {{ route.query.q }}
              <button @click="clearSearchQuery" class="ml-1 hover:text-gray-200">✕</button>
            </span>
            <template v-for="group in filterGroups" :key="group.key">
              <span
                v-for="val in activeFilters[group.key]"
                :key="val"
                class="inline-flex items-center gap-1 px-3 py-1 bg-[#4a7c2f] text-white text-xs font-semibold rounded"
              >
                {{ val }}
                <button @click="removeFilter(group.key, val)" class="ml-1 hover:text-gray-200">✕</button>
              </span>
            </template>
            <button
              @click="clearAllFilters"
              class="inline-flex items-center gap-1 text-xs text-[#4a7c2f] font-semibold hover:underline ml-2"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 4h18M6 8l6 8 6-8" />
              </svg>
              Clear Filters
            </button>
          </div>

          <!-- Product cards -->
          <div class="flex flex-col gap-4">
            <div
              v-for="product in pagedProducts"
              :key="product.id"
              class="bg-white border border-gray-200 flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-4 sm:py-5 hover:shadow-md transition-shadow"
            >
              <!-- Image (hidden on mobile) -->
              <div class="hidden sm:flex flex-shrink-0 w-36 h-28 items-center justify-center bg-gray-50 rounded">
                <img :src="componentImg" :alt="product.name" class="w-full h-full object-contain p-2" />
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <p class="text-[#4a7c2f] text-xs font-semibold mb-1">{{ product.category }}</p>
                <h3 class="text-base sm:text-xl font-extrabold text-gray-900 mb-2 sm:mb-3 leading-tight">{{ product.name }}</h3>
                <!-- Specs -->
                <div class="flex flex-wrap gap-3 sm:gap-6">
                  <div class="text-center">
                    <p class="text-[10px] text-gray-400 mb-0.5">Ic nom (A)</p>
                    <p class="text-sm font-bold text-gray-800">{{ product.icNom }}</p>
                  </div>
                  <div class="text-center">
                    <p class="text-[10px] text-gray-400 mb-0.5">VCE SAT (V)</p>
                    <p class="text-sm font-bold text-gray-800">{{ product.vceSat }}</p>
                  </div>
                  <div class="text-center">
                    <p class="text-[10px] text-gray-400 mb-0.5">Ptot (W)</p>
                    <p class="text-sm font-bold text-gray-800">{{ product.ptot }}</p>
                  </div>
                  <div class="text-center">
                    <p class="text-[10px] text-gray-400 mb-0.5">RthJC (°C/W)</p>
                    <p class="text-sm font-bold text-gray-800">{{ product.rthJC }}</p>
                  </div>
                </div>
              </div>

              <!-- Buttons -->
              <div class="flex flex-col gap-2 flex-shrink-0">
                <button
                  @click="openQuotation(product)"
                  class="px-3 sm:px-5 py-2 bg-[#4a7c2f] hover:bg-[#3a6022] text-white text-xs font-bold tracking-wide transition-colors whitespace-nowrap"
                >
                  QUOTATION
                </button>
                <button class="px-3 sm:px-5 py-2 border border-gray-300 hover:border-[#4a7c2f] text-gray-700 hover:text-[#4a7c2f] text-xs font-bold tracking-wide transition-colors whitespace-nowrap">
                  DATASHEET
                </button>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex items-center justify-center gap-2 mt-8">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:border-[#4a7c2f] hover:text-[#4a7c2f] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ‹
            </button>
            <button
              v-for="p in visiblePages"
              :key="p"
              @click="p !== '…' && (currentPage = p)"
              :class="[
                'w-8 h-8 flex items-center justify-center border text-sm font-medium transition-colors',
                p === currentPage
                  ? 'bg-[#4a7c2f] border-[#4a7c2f] text-white'
                  : p === '…'
                  ? 'border-transparent text-gray-400 cursor-default'
                  : 'border-gray-300 text-gray-700 hover:border-[#4a7c2f] hover:text-[#4a7c2f]'
              ]"
            >
              {{ p }}
            </button>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:border-[#4a7c2f] hover:text-[#4a7c2f] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ›
            </button>
          </div>
          <div class="flex items-center justify-between mt-3 px-1">
            <p class="text-xs text-gray-400">
              Showing {{ (currentPage - 1) * pageSize + 1 }}–{{ Math.min(currentPage * pageSize, filteredProducts.length) }} of {{ filteredProducts.length }} products
            </p>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-400">Per page:</span>
              <button
                v-for="n in [5, 10]"
                :key="n"
                @click="pageSize = n; currentPage = 1"
                :class="[
                  'w-8 h-7 text-xs font-semibold border transition-colors',
                  pageSize === n
                    ? 'bg-[#4a7c2f] border-[#4a7c2f] text-white'
                    : 'border-gray-300 text-gray-600 hover:border-[#4a7c2f] hover:text-[#4a7c2f]'
                ]"
              >{{ n }}</button>
            </div>
          </div>

          <!-- Custom solutions banner -->
          <div class="mt-8 bg-[#2d5016] rounded px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p class="text-[#8dc63f] text-xs font-semibold uppercase tracking-wider mb-1">Custom Solutions</p>
              <h3 class="text-white text-xl font-extrabold mb-1">CAN'T FIND WHAT YOU NEED?</h3>
              <p class="text-gray-300 text-sm">Our engineering team can help you find the right module for your application.</p>
            </div>
            <RouterLink
              to="/contact"
              class="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#4a7c2f] hover:bg-[#3a6022] text-white text-sm font-bold rounded transition-colors"
            >
              CONTACT SALES TEAM
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </RouterLink>
          </div>

        </div>
      </div>
    </section>

    <QuotationModal v-model="showModal" :partNumber="selectedPartNumber" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import heroImg from '@/assets/product/hero.png'
import servicesImg from '@/assets/product/services.png'
import componentImg from '@/assets/product/component.png'
import QuotationModal from '@/components/QuotationModal.vue'
import { allProducts } from '@/data/products'

const route = useRoute()
const router = useRouter()
const showModal = ref(false)
const selectedPartNumber = ref('')

const openQuotation = (product) => {
  selectedPartNumber.value = product.name
  showModal.value = true
}
const pageSize = ref(10)

const features = [
  'Ultra-Low Conduction Loss',
  'Superior Thermal Stability',
  'Low Power Consumption',
]

// ── Mock data ──────────────────────────────────────────────
const CONFIGS   = ['Half-Bridge','Common Anode','Full Bridge','6in1','7in1','3-Level','Hybrid Pack','Single Switch']
const CHIPS     = ['Standard','Fast Switching']
const VOLTAGES  = ['650V','750V','1200V','1700V']
const HOUSINGS  = ['34mm','45mm','62mm','Econo Dual','Econo Pack2','Econo Pack3','Easy 1B','Easy 2B','Easy 3B','Econo PIM2','Econo PIM3','HPD','Pack4']

// ── Filters ────────────────────────────────────────────────
const countBy = (key) => (val) =>
  allProducts.filter(p => p[key] === val).length

const filterGroups = reactive([
  {
    key: 'configuration', label: 'Configuration', open: true,
    options: CONFIGS.map(v => ({ value: v, count: countBy('configuration')(v) })),
  },
  {
    key: 'chipType', label: 'Chip Type', open: true,
    options: CHIPS.map(v => ({ value: v, count: countBy('chipType')(v) })),
  },
  {
    key: 'voltage', label: 'Voltage (V)', open: true,
    options: VOLTAGES.map(v => ({ value: v, count: countBy('voltage')(v) })),
  },
  {
    key: 'housing', label: 'Housing', open: true,
    options: HOUSINGS.map(v => ({ value: v, count: countBy('housing')(v) })),
  },
])

const activeFilters = reactive({
  configuration: [],
  chipType: [],
  voltage: [],
  housing: [],
})

const hasActiveFilters = computed(() =>
  !!searchQuery.value || Object.values(activeFilters).some(arr => arr.length > 0)
)

// 同群組「未被選取」的選項：套用 filteredProducts（含自己群組 filter）→ 互斥屬性顯示 0
// 其餘（已選取的選項 / 其他群組的選項）：只套用其他群組的 filters，保持可切換
const getOptionCount = (groupKey, optValue) => {
  const ownSelected = activeFilters[groupKey]
  const isUncheckedSameGroup = ownSelected.length > 0 && !ownSelected.includes(optValue)

  if (isUncheckedSameGroup) {
    return filteredProducts.value.filter(p => p[groupKey] === optValue).length
  }

  return allProducts.filter(p => {
    if (p[groupKey] !== optValue) return false
    return Object.entries(activeFilters).every(([key, vals]) =>
      key === groupKey || vals.length === 0 || vals.includes(p[key])
    )
  }).length
}

const toggleFilter = (key, val) => {
  const arr = activeFilters[key]
  const idx = arr.indexOf(val)
  if (idx === -1) arr.push(val)
  else arr.splice(idx, 1)
  currentPage.value = 1
}

const removeFilter = (key, val) => {
  const arr = activeFilters[key]
  const idx = arr.indexOf(val)
  if (idx !== -1) arr.splice(idx, 1)
  currentPage.value = 1
}

const clearSearchQuery = () => {
  router.replace({ path: '/product' })
}

const clearAllFilters = () => {
  Object.keys(activeFilters).forEach(k => activeFilters[k].splice(0))
  router.replace({ path: '/product' })
  currentPage.value = 1
}

const searchQuery = computed(() => (route.query.q || '').toLowerCase())

const filteredProducts = computed(() => {
  return allProducts.filter(p => {
    const matchesSearch = !searchQuery.value || p.name.toLowerCase().includes(searchQuery.value)
    const matchesFilters = Object.entries(activeFilters).every(([key, vals]) =>
      vals.length === 0 || vals.includes(p[key])
    )
    return matchesSearch && matchesFilters
  })
})

watch(() => route.query.q, () => { currentPage.value = 1 })

// ── Pagination ─────────────────────────────────────────────
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / pageSize.value))

const pagedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredProducts.value.slice(start, start + pageSize.value)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const cur   = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, cur, cur - 1, cur + 1].filter(p => p >= 1 && p <= total))
  const sorted = [...pages].sort((a, b) => a - b)
  const result = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('…')
    result.push(sorted[i])
  }
  return result
})
</script>
