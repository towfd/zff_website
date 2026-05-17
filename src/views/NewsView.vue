<template>
  <div>
    <!-- Hero -->
    <section class="relative w-full min-h-[300px] flex items-center bg-gray-900 overflow-hidden">
      <img src="@/assets/index/pcim.png" alt="News" class="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <p class="text-[#8dc63f] text-sm font-semibold mb-3">News</p>
        <h1 class="text-white text-4xl lg:text-5xl font-extrabold uppercase leading-tight mb-4">Latest News</h1>
        <p class="text-gray-300 text-base max-w-xl">Stay up to date with our latest products, exhibitions, and industry insights.</p>
      </div>
    </section>

    <!-- Filter Tabs -->
    <section class="bg-white border-b border-gray-200 sticky top-[80px] z-40">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex gap-6 overflow-x-auto">
          <button
            v-for="tab in tabs" :key="tab"
            class="py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors duration-150"
            :class="activeTab === tab ? 'border-[#8dc63f] text-[#8dc63f]' : 'border-transparent text-gray-500 hover:text-gray-800'"
            @click="activeTab = tab"
          >{{ tab }}</button>
        </div>
      </div>
    </section>

    <!-- News Grid -->
    <section class="bg-gray-50 py-16 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">

        <!-- Loading -->
        <div v-if="loading" class="flex justify-center items-center py-32">
          <div class="w-8 h-8 border-4 border-[#8dc63f] border-t-transparent rounded-full animate-spin"></div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center py-32 text-gray-400">
          <p class="text-sm">Failed to load news. Please try again later.</p>
        </div>

        <!-- Empty -->
        <div v-else-if="!filteredNews.length" class="text-center py-32 text-gray-400">
          <p class="text-sm">No news in this category yet.</p>
        </div>

        <!-- Content -->
        <template v-else>
          <div class="grid lg:grid-cols-2 gap-8 mb-12">
            <div class="group relative overflow-hidden rounded-sm cursor-pointer" @click="openModal(filteredNews[0])">
              <img :src="filteredNews[0].img" :alt="filteredNews[0].title" class="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-300" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <span class="inline-block px-2 py-1 bg-[#8dc63f] text-white text-xs font-semibold mb-2 rounded-sm">{{ filteredNews[0].category }}</span>
                <h3 class="text-xl font-bold text-white leading-snug mb-2">{{ filteredNews[0].title }}</h3>
                <p class="text-sm text-gray-300 line-clamp-2">{{ filteredNews[0].desc }}</p>
                <p class="text-xs text-gray-400 mt-3">{{ filteredNews[0].date }}</p>
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <div
                v-for="item in filteredNews.slice(1, 4)" :key="item.id"
                class="group flex gap-4 bg-white rounded-sm p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                @click="openModal(item)"
              >
                <div class="flex-shrink-0 w-28 h-20 overflow-hidden rounded-sm">
                  <img :src="item.img" :alt="item.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div class="flex flex-col justify-center gap-1 min-w-0">
                  <span class="text-xs font-semibold text-[#8dc63f]">{{ item.category }}</span>
                  <h3 class="text-sm font-bold text-gray-900 uppercase leading-snug line-clamp-2 group-hover:text-[#8dc63f] transition-colors">{{ item.title }}</h3>
                  <p class="text-xs text-gray-400">{{ item.date }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="item in filteredNews.slice(4)" :key="item.id"
              class="group bg-white rounded-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              @click="openModal(item)"
            >
              <div class="aspect-[4/3] overflow-hidden">
                <img :src="item.img" :alt="item.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div class="p-5">
                <span class="inline-block px-2 py-0.5 bg-[#8dc63f]/10 text-[#8dc63f] text-xs font-semibold mb-2 rounded-sm">{{ item.category }}</span>
                <h3 class="text-sm font-bold text-gray-900 uppercase leading-snug mb-2 group-hover:text-[#8dc63f] transition-colors">{{ item.title }}</h3>
                <p class="text-xs text-gray-500 line-clamp-2 mb-3">{{ item.desc }}</p>
                <p class="text-xs text-gray-400">By <span class="font-semibold text-gray-600">{{ item.author }}</span> | {{ item.date }}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- Full-screen Modal -->
    <Transition name="modal">
      <div v-if="activeNews" class="fixed inset-x-0 bottom-0 top-16 lg:top-20 z-[45] bg-white overflow-y-auto">

        <!-- Sticky close bar -->
        <div class="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 flex items-center justify-between px-6 py-3">
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-400">News</span>
            <svg class="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            <span class="inline-block px-2 py-0.5 bg-[#8dc63f]/10 text-[#8dc63f] text-xs font-bold rounded-sm uppercase tracking-wide">{{ activeNews.category }}</span>
          </div>
          <button
            class="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            @click="closeModal"
          >
            <span class="hidden sm:inline">Close</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Title section -->
        <div class="bg-gray-50 border-b border-gray-100 px-6 sm:px-16 py-10 max-w-4xl mx-auto w-full">
          <span class="inline-block px-2 py-0.5 bg-[#8dc63f] text-white text-xs font-semibold mb-4 rounded-sm uppercase tracking-wide">{{ activeNews.category }}</span>
          <h1 class="text-2xl sm:text-4xl font-extrabold text-gray-900 uppercase leading-tight max-w-3xl">{{ activeNews.title }}</h1>
          <p class="text-sm text-gray-500 mt-4">By <span class="font-semibold text-gray-700">{{ activeNews.author }}</span> &nbsp;·&nbsp; {{ activeNews.date }}</p>
        </div>

        <!-- Content -->
        <div class="max-w-4xl mx-auto px-6 sm:px-8 py-10">

          <!-- Image -->
          <div class="w-full overflow-hidden rounded-sm mb-10">
            <img :src="activeNews.img" :alt="activeNews.title" class="w-full aspect-video object-cover" />
          </div>

          <!-- Article body (rich text from Directus) -->
          <div class="prose prose-gray max-w-none text-base text-gray-600 leading-relaxed" v-html="activeNews.body" />

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
            <span v-for="tag in activeNews.tags" :key="tag" class="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full">{{ tag }}</span>
          </div>

          <!-- Related Products -->
          <div v-if="activeNews.relatedProducts?.length" class="mt-10 pt-8 border-t border-gray-100">
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Related Products</p>
            <div class="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1" style="scroll-snap-type: x mandatory;">
              <RouterLink
                v-for="p in activeNews.relatedProducts" :key="p.name"
                :to="p.to"
                class="group flex-shrink-0 w-[calc(33.333%-11px)] min-w-[220px] border border-gray-200 rounded-sm hover:border-[#8dc63f] hover:shadow-lg transition-all duration-150 flex flex-col overflow-hidden"
                style="scroll-snap-align: start;"
                @click="closeModal"
              >
                <div class="aspect-[4/3] bg-gray-50 overflow-hidden">
                  <img :src="p.img" :alt="p.name" class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-200" />
                </div>
                <div class="p-4 flex flex-col gap-1 flex-1">
                  <span class="text-[10px] font-bold text-[#8dc63f] uppercase tracking-wide">{{ p.category }}</span>
                  <p class="text-sm font-bold text-gray-900 group-hover:text-[#2d5016] leading-snug">{{ p.name }}</p>
                  <p class="text-xs text-gray-500 mt-0.5">{{ p.spec }}</p>
                  <p class="text-xs text-gray-400 mt-2 line-clamp-2">{{ p.desc }}</p>
                  <span class="text-xs text-[#8dc63f] font-semibold flex items-center gap-1 mt-auto pt-3">
                    View Product
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </span>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useNews } from '@/composables/useNews.js'

const tabs = ['All', 'Exhibitions', 'Products', 'Certifications']
const activeTab = ref('All')
const activeNews = ref(null)

const { news, loading, error, fetchNews } = useNews()

const openModal  = (item) => { activeNews.value = item; document.body.style.overflow = 'hidden' }
const closeModal = ()     => { activeNews.value = null;  document.body.style.overflow = '' }
onUnmounted(() => { document.body.style.overflow = '' })

const filteredNews = computed(() => {
  if (activeTab.value === 'All') return news.value
  return news.value.filter(n => n.category === activeTab.value)
})

onMounted(fetchNews)
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.18s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

.prose :deep(p)  { margin-bottom: 1.25rem; }
.prose :deep(ul) { list-style: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
.prose :deep(ol) { list-style: decimal; padding-left: 1.5rem; margin-bottom: 1.25rem; }
.prose :deep(li) { margin-bottom: 0.25rem; }
.prose :deep(strong) { font-weight: 700; color: #111827; }
.prose :deep(a) { color: #8dc63f; text-decoration: underline; }
.prose :deep(h2) { font-size: 1.25rem; font-weight: 700; color: #111827; margin: 1.75rem 0 0.75rem; }
.prose :deep(h3) { font-size: 1.1rem; font-weight: 700; color: #111827; margin: 1.5rem 0 0.5rem; }
</style>
