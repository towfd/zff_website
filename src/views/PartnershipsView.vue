<template>
  <div>
    <!-- Hero -->
    <section class="relative w-full min-h-[300px] flex items-center bg-gray-900 overflow-hidden">
      <img src="@/assets/index/hero_img.png" alt="Partnerships" class="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <p class="text-[#8dc63f] text-sm font-semibold mb-3">Partnerships</p>
        <h1 class="text-white text-4xl lg:text-5xl font-extrabold uppercase leading-tight mb-4">
          Our Partners
        </h1>
        <p class="text-gray-300 text-base max-w-xl">
          We collaborate with world-class manufacturers to bring you the highest-quality power semiconductor solutions.
        </p>
      </div>
    </section>

    <!-- Partner List -->
    <section class="bg-white py-20 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-14">
          <p class="text-[#8dc63f] text-sm font-semibold mb-3">Brand Partners</p>
          <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-900">Trusted Manufacturers</h2>
          <p class="text-gray-500 text-sm mt-4 max-w-lg mx-auto">
            Our partnerships with leading manufacturers ensure our customers receive products that meet the highest standards of performance and reliability.
          </p>
        </div>

        <div class="flex flex-col gap-16">
          <div
            v-for="(partner, index) in partners"
            :key="partner.name"
            :id="partner.id"
            class="grid lg:grid-cols-2 gap-12 items-center scroll-mt-24"
            :class="index % 2 === 1 ? 'lg:grid-flow-dense' : ''"
          >
            <!-- Image placeholder -->
            <div
              class="aspect-[4/3] rounded-sm flex items-center justify-center text-6xl font-extrabold text-white"
              :class="index % 2 === 1 ? 'lg:col-start-2' : ''"
              :style="{ backgroundColor: partner.color }"
            >
              {{ partner.name }}
            </div>

            <!-- Text -->
            <div :class="index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1 h-6 bg-[#8dc63f]" />
                <span class="text-[#8dc63f] text-sm font-semibold uppercase tracking-wide">{{ partner.tag }}</span>
              </div>
              <h2 class="text-3xl font-extrabold text-gray-900 mb-4">{{ partner.name }}</h2>
              <p class="text-gray-500 text-sm leading-relaxed mb-6">{{ partner.desc }}</p>
              <div class="flex flex-wrap gap-2 mb-8">
                <span
                  v-for="tag in partner.products"
                  :key="tag"
                  class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
              <a
                :href="partner.website"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#8dc63f] text-[#8dc63f] hover:bg-[#8dc63f] hover:text-white font-bold text-sm transition-colors duration-200 rounded-full"
              >
                Visit Website
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partnership CTA -->
    <section class="bg-gray-50 py-20 px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-[#8dc63f] text-sm font-semibold mb-3">Work With Us</p>
        <h2 class="text-3xl font-extrabold text-gray-900 mb-4">Become a Partner</h2>
        <p class="text-gray-500 text-sm leading-relaxed mb-8">
          We are always looking for innovative manufacturers and technology partners. If you share our commitment to quality and performance, we'd love to hear from you.
        </p>
        <RouterLink
          to="/support"
          class="inline-block px-8 py-3 bg-[#8dc63f] hover:bg-[#7ab530] text-white font-bold text-base rounded-full transition-colors duration-200"
        >
          Get In Touch
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePartners } from '@/composables/usePartners.js'

const { partners, loading, fetchPartners } = usePartners()
onMounted(fetchPartners)
</script>
