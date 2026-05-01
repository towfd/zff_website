<template>
  <div>
    <!-- Hero -->
    <section
      class="relative w-full min-h-[600px] lg:min-h-[680px] flex items-center bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${heroBg})` }"
    >
      <div class="absolute inset-0 bg-black/30" />
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div class="max-w-xl">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-1 h-5 bg-[#8dc63f]" />
            <span class="text-white text-sm font-medium">Efficient International Technology Co., Ltd.</span>
          </div>
          <h1 class="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-tight mb-6 drop-shadow">
            Your Trusted<br />
            Professional Power<br />
            Semiconductor<br />
            Supplier
          </h1>
          <p class="text-gray-200 text-sm sm:text-base leading-relaxed mb-8 max-w-sm">
            We promote, market, and distribute high-quality, high-efficiency power semiconductors to serve Taiwan and international customers from all across the globe.
          </p>
          <RouterLink
            to="/quotation"
            class="inline-block px-8 py-3 bg-white text-[#8dc63f] font-bold text-base rounded-full hover:bg-[#8dc63f] hover:text-white transition-colors duration-200"
          >
            Quotation
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured Properties -->
    <section class="w-full bg-white py-16 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-12">
          <div>
            <p class="text-[#8dc63f] text-sm font-semibold mb-2">Products</p>
            <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-900">Featured Properties</h2>
          </div>
          <p class="text-gray-500 text-sm leading-relaxed max-w-xs sm:text-right">
            We promote, market, and distribute high-quality,<br class="hidden sm:block" />
            high-efficiency power semiconductors
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <RouterLink
            v-for="item in products"
            :key="item.label"
            :to="item.to"
            class="group block hover:scale-105 transition-transform duration-200"
          >
            <img :src="item.img" :alt="item.label" class="w-full h-auto object-contain" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Applications -->
    <section class="w-full bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-12">
        <p class="text-[#8dc63f] text-sm font-semibold mb-3">Applications</p>
        <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-5">Our Applications</h2>
        <p class="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
          MacMic offers comprehensive solutions with the best cost performance to fit customers'
          demands, and these products have been widely used in applications below.
        </p>
      </div>

      <!-- Slider -->
      <div class="relative">
        <Swiper
          :modules="swiperModules"
          :slides-per-view="1.2"
          :space-between="16"
          :breakpoints="{
            640:  { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.3, spaceBetween: 24 },
          }"
          :navigation="{ prevEl: '#app-prev', nextEl: '#app-next' }"
          class="!px-6 lg:!px-8"
        >
          <SwiperSlide v-for="item in applications" :key="item.title">
            <div class="flex flex-col gap-3">
              <img :src="item.img" :alt="item.title" class="w-full aspect-[4/3] object-cover rounded-sm" />
              <div>
                <h3 class="text-gray-900 font-bold text-lg">{{ item.title }}</h3>
                <p class="text-gray-500 text-sm mt-1">{{ item.desc }}</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- Nav buttons -->
        <button
          id="app-prev"
          class="absolute left-2 top-[38%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          id="app-next"
          class="absolute right-2 top-[38%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>

    <!-- Quotation Form -->
    <section class="w-full bg-white py-16 px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">

        <!-- Header -->
        <div class="text-center mb-10">
          <p class="text-[#8dc63f] text-sm font-semibold mb-2">Quotation</p>
          <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">Get a Quotation</h2>
          <p class="text-sm text-gray-500">
            <span class="font-bold text-gray-800">Best Cost Performance</span>
            – We provide price competitive products that help our customers to easily meet their price performance targets
          </p>
        </div>

        <QuotationForm />
      </div>
    </section>

    <!-- News -->
    <section class="w-full bg-gray-50 py-16 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">

        <!-- Header (full width) -->
        <div class="mb-10">
          <p class="text-[#8dc63f] text-sm font-semibold mb-2">News</p>
          <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-900 uppercase leading-tight">
              Your Trusted Professional<br />Power Semiconductor Supplier
            </h2>
            <p class="text-gray-500 text-sm leading-relaxed max-w-xs">
              Learn more about our news products and gain some insights of Semiconductors
            </p>
          </div>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          <!-- Left: featured card -->
          <RouterLink to="/news" class="group relative overflow-hidden rounded-sm block">
            <img :src="newsItems[0].img" :alt="newsItems[0].title" class="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <p class="text-xs text-gray-300 mb-1">{{ newsItems[0].category }}</p>
              <h3 class="text-lg font-bold text-white leading-snug">{{ newsItems[0].title }}</h3>
              <p class="text-sm text-gray-300 mt-1 line-clamp-2">{{ newsItems[0].desc }}</p>
              <p class="text-sm font-semibold text-[#8dc63f] mt-3">Read More</p>
            </div>
          </RouterLink>

          <!-- Right: 3 small news items -->
          <div class="flex flex-col divide-y divide-gray-200">
            <RouterLink
              v-for="item in newsItems.slice(1)"
              :key="item.title"
              to="/news"
              class="group flex gap-4 py-5 first:pt-0 last:pb-0"
            >
              <div class="flex-shrink-0 w-36 h-28 overflow-hidden rounded-sm">
                <img :src="item.img" :alt="item.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div class="flex flex-col justify-center gap-1">
                <p class="text-xs text-gray-400">{{ item.category }}</p>
                <h3 class="text-sm font-bold text-gray-900 uppercase group-hover:text-[#8dc63f] transition-colors leading-snug">{{ item.title }}</h3>
                <p class="text-xs text-gray-500 line-clamp-2">{{ item.desc }}</p>
                <p class="text-xs text-gray-400 mt-1">
                  <span class="font-semibold text-gray-600">By {{ item.author }}</span>
                  &nbsp;|&nbsp; {{ item.date }}
                </p>
              </div>
            </RouterLink>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import QuotationForm from '@/components/QuotationForm.vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

import heroBg      from '@/assets/index/hero_img.png'
import chipsImg    from '@/assets/index/chips.png'
import discreteImg from '@/assets/index/discrete.png'
import moduleImg   from '@/assets/index/module.png'
import pcimImg        from '@/assets/index/pcim.png'
import mosfetImg      from '@/assets/index/mosfet.png'
import powerImg       from '@/assets/index/power.png'
import certImg        from '@/assets/index/certification.png'
import app1        from '@/assets/index/application1.png'
import app2        from '@/assets/index/application2.png'
import app3        from '@/assets/index/application3.png'
import app4        from '@/assets/index/application4.png'

const swiperModules = [Navigation]

const products = [
  { label: 'Chips',     img: chipsImg,    to: '/product' },
  { label: 'Discretes', img: discreteImg, to: '/product' },
  { label: 'Modules',   img: moduleImg,   to: '/product' },
]

const newsItems = [
  {
    category: 'Exhibitions',
    title: 'MacMic will be attended in pcim 2024',
    desc: 'We are thrilled to announce that MacMic will be showcasing...',
    author: 'Jeremy Jean', date: 'Friday, 1 April 2024', img: pcimImg,
  },
  {
    category: 'Products',
    title: 'MOSFET MODULE-MMN600DB015B',
    desc: 'MacMic MOSFET modules come with...',
    author: 'Jerremy Jean', date: 'Friday, 1 April 2024', img: mosfetImg,
  },
  {
    category: 'Products',
    title: 'HIGH POWER MACMIC IGBT DISCRETE IN TO-247 PLUS PACKAGE',
    desc: 'IGBT discrete in TO-247 Plus packag...',
    author: 'Michaela Augus', date: 'Friday, 1 April 2024', img: powerImg,
  },
  {
    category: 'Certifications',
    title: 'CERTIFICATION OF GENERAL AEO',
    desc: 'Efficient International Technology h...',
    author: 'Kim Gurameh', date: 'Friday, 1 April 2024', img: certImg,
  },
]

const applications = [
  { title: 'Welding',      desc: 'Handle high current spikes typical',          img: app1 },
  { title: 'Solar Energy', desc: 'Improve energy conversion efficiency',         img: app2 },
  { title: 'Inverters',    desc: 'Switch high voltages and currents efficiently', img: app3 },
  { title: 'Wind Energy',  desc: 'Reliability under varying load conditions',    img: app4 },
]
</script>
