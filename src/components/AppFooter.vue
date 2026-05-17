<template>
  <footer class="bg-[#1a1a1a] text-white">

    <!-- Top section -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-10 grid grid-cols-1 lg:grid-cols-4 gap-10 border-b border-gray-700">

      <!-- Col 1: Logo + desc + contact -->
      <div class="flex flex-col gap-6">
        <img src="@/assets/foot/foot_logo.png" alt="EFF Logo" class="h-16 w-auto" />
        <p class="text-gray-400 text-sm leading-relaxed">
          With long term experience, our people are familiar with the industry regulation and understand what customers care regarded to power semiconductor products.
        </p>
        <div class="flex flex-col gap-4">
          <!-- Email -->
          <div class="flex items-center gap-4">
            <img src="@/assets/foot/email_icon.png" alt="email" class="w-10 h-10 flex-shrink-0" />
            <div>
              <p class="text-xs text-gray-400">Email</p>
              <a href="mailto:info@effintech.com" class="text-sm text-white hover:text-[#8dc63f] transition-colors">
                info@effintech.com
              </a>
            </div>
          </div>
          <!-- Phone -->
          <div class="flex items-center gap-4">
            <img src="@/assets/foot/phone_icon.png" alt="phone" class="w-10 h-10 flex-shrink-0" />
            <div>
              <p class="text-xs text-gray-400">Call Us</p>
              <a href="tel:+886227600390" class="text-sm text-white hover:text-[#8dc63f] transition-colors">
                +886-2-2760-0390
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Col 2: Pages -->
      <div>
        <h4 class="text-base font-semibold mb-6">Pages</h4>
        <ul class="flex flex-col gap-4">
          <li v-for="item in pages" :key="item.label">
            <RouterLink v-if="item.to" :to="item.to" class="text-gray-400 hover:text-white text-sm transition-colors">{{ item.label }}</RouterLink>
            <span v-else class="text-gray-600 text-sm cursor-not-allowed">{{ item.label }}</span>
          </li>
        </ul>
      </div>

      <!-- Col 3: Utility -->
      <div>
        <h4 class="text-base font-semibold mb-6">Utility</h4>
        <ul class="flex flex-col gap-4">
          <li v-for="item in utility" :key="item.label">
            <RouterLink v-if="item.to" :to="item.to" class="text-gray-400 hover:text-white text-sm transition-colors">{{ item.label }}</RouterLink>
            <span v-else class="text-gray-600 text-sm cursor-not-allowed">{{ item.label }}</span>
          </li>
        </ul>
      </div>

      <!-- Col 4: Subscribe -->
      <div>
        <h4 class="text-base font-semibold mb-6">Subscribe</h4>
        <input
          v-model="email"
          type="email"
          placeholder="Email here*"
          class="w-full px-4 py-3 bg-transparent border border-gray-500 text-sm text-white placeholder-gray-500 outline-none focus:border-[#8dc63f] transition-colors mb-4"
        />
        <div class="flex items-center gap-4">
          <button
            class="px-6 py-3 bg-[#8dc63f] hover:bg-[#7ab530] text-white text-sm font-semibold transition-colors"
            @click="handleSubscribe"
          >
            Send Now
          </button>
          <!-- Social icons -->
          <div class="flex items-center gap-3">
            <a href="#" class="hover:opacity-75 transition-opacity">
              <img src="@/assets/foot/linkin_icon.png" alt="LinkedIn" class="w-7 h-7" />
            </a>
            <a href="#" class="hover:opacity-75 transition-opacity">
              <img src="@/assets/foot/twitter_icon.png" alt="Twitter" class="w-7 h-7" />
            </a>
            <a href="#" class="hover:opacity-75 transition-opacity">
              <img src="@/assets/foot/fb_icon.png" alt="Facebook" class="w-7 h-7" />
            </a>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom bar -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p class="text-gray-500 text-xs">
        Copyright © Effintech | Designed by Julia – Powered by Webflow.
      </p>
      <div class="flex items-center gap-5">
        <a v-for="link in bottomLinks" :key="link" href="#" class="text-gray-500 hover:text-white text-xs transition-colors">
          {{ link }}
        </a>
      </div>
    </div>

  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const pages = [
  { label: 'About Us', to: '/about' },
  { label: 'Product', to: '/product' },
  { label: 'Download Center', to: null },
  { label: 'News', to: '/news' },
  { label: 'Contact', to: '/contact' },
]

const utility = [
  { label: 'Quotation', to: null },
  { label: 'Service', to: null },
  { label: 'Privacy', to: null },
  { label: 'FaQ', to: null },
  { label: 'Sales Team', to: null },
]

const bottomLinks = ['Style Guide', 'Licenses', 'Changelog', 'Password']

const handleSubscribe = () => {
  // TODO: implement subscribe
}
</script>
