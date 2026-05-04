<template>
  <div class="bg-white min-h-screen">

    <!-- Breadcrumb -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-4">
      <nav class="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
        <RouterLink to="/" class="hover:text-[#4a7c2f] transition-colors">Home</RouterLink>
        <span>/</span>
        <RouterLink to="/product" class="hover:text-[#4a7c2f] transition-colors">Product</RouterLink>
        <span>/</span>
        <span class="text-gray-500">{{ product.category }}</span>
        <span>/</span>
        <span class="text-gray-800 font-semibold">{{ product.name }}</span>
      </nav>
    </div>

    <!-- Main content -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">

        <!-- LEFT: Images -->
        <div class="flex flex-col gap-4">
          <!-- Main image -->
          <div class="border border-gray-100 bg-gray-50 rounded-sm flex items-center justify-center aspect-square overflow-hidden">
            <img
              :src="selectedImage"
              :alt="product.name"
              class="w-3/4 h-3/4 object-contain transition-opacity duration-200"
            />
          </div>
          <!-- Thumbnails -->
          <div class="flex gap-3">
            <button
              v-for="(img, i) in thumbImages"
              :key="i"
              class="w-24 h-20 border-2 rounded-sm bg-gray-50 flex items-center justify-center overflow-hidden transition-colors duration-150"
              :class="selectedImage === img ? 'border-[#4a7c2f]' : 'border-gray-200 hover:border-gray-400'"
              @click="selectedImage = img"
            >
              <img :src="img" :alt="`View ${i+1}`" class="w-4/5 h-4/5 object-contain" />
            </button>
          </div>
        </div>

        <!-- RIGHT: Details -->
        <div class="flex flex-col gap-6">

          <!-- Title -->
          <div>
            <p class="text-[#4a7c2f] text-sm font-semibold mb-2">{{ product.category }}</p>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-4">{{ product.name }}</h1>

            <!-- Features -->
            <ul class="flex flex-col gap-2">
              <li v-for="f in features" :key="f" class="flex items-start gap-2 text-sm text-gray-700">
                <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-700 flex-shrink-0" />
                {{ f }}
              </li>
            </ul>
          </div>

          <!-- Certifications -->
          <div class="flex items-center gap-4 flex-wrap">
            <!-- CE -->
            <div class="flex items-center justify-center w-14 h-14 border-2 border-gray-300 rounded-full">
              <span class="text-lg font-black text-gray-700 tracking-tighter">CE</span>
            </div>
            <!-- RoHS -->
            <div class="flex items-center justify-center w-14 h-14 border-2 border-[#4a7c2f] rounded-full">
              <div class="text-center leading-none">
                <svg class="w-4 h-4 text-[#4a7c2f] mx-auto mb-0.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-[9px] font-bold text-[#4a7c2f]">RoHS</span>
              </div>
            </div>
            <!-- REACH -->
            <div class="flex items-center justify-center w-14 h-14 border-2 border-[#4a7c2f] rounded-full">
              <div class="text-center leading-none">
                <svg class="w-4 h-4 text-[#4a7c2f] mx-auto mb-0.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-[9px] font-bold text-[#4a7c2f]">REACH</span>
              </div>
            </div>
          </div>

          <!-- Meta -->
          <div class="flex flex-col gap-2 text-sm border-t border-gray-100 pt-5">
            <div class="flex gap-4">
              <span class="w-24 font-bold text-gray-800 flex-shrink-0">SKU</span>
              <span class="text-gray-500">{{ product.name }}</span>
            </div>
            <div class="flex gap-4">
              <span class="w-24 font-bold text-gray-800 flex-shrink-0">Category</span>
              <RouterLink to="/product" class="text-[#4a7c2f] hover:underline">{{ product.category }}</RouterLink>
            </div>
            <div class="flex gap-4">
              <span class="w-24 font-bold text-gray-800 flex-shrink-0">Configuration</span>
              <span class="text-[#4a7c2f]">{{ product.configuration }}</span>
            </div>
          </div>

          <!-- Dropdowns -->
          <div class="flex flex-col gap-4 border-t border-gray-100 pt-5">
            <div class="flex items-center gap-4">
              <span class="w-36 text-sm font-bold text-gray-800 flex-shrink-0">Voltage Rating</span>
              <div class="relative flex-1">
                <select
                  v-model="selectedVoltage"
                  class="w-full appearance-none border border-gray-300 px-4 py-3 pr-10 text-sm text-gray-800 bg-white focus:outline-none focus:border-[#4a7c2f] transition-colors"
                >
                  <option v-for="v in voltageOptions" :key="v" :value="v">{{ v }}</option>
                </select>
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="w-36 text-sm font-bold text-gray-800 flex-shrink-0">Chip Type</span>
              <div class="relative flex-1">
                <select
                  v-model="selectedChip"
                  class="w-full appearance-none border border-gray-300 px-4 py-3 pr-10 text-sm text-gray-800 bg-white focus:outline-none focus:border-[#4a7c2f] transition-colors"
                >
                  <option v-for="c in chipOptions" :key="c" :value="c">{{ c }}</option>
                </select>
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <button class="self-start text-xs text-[#4a7c2f] hover:underline" @click="resetSelections">Clear</button>
          </div>

          <!-- Action buttons -->
          <div class="flex gap-3 flex-wrap pt-2">
            <button
              class="flex items-center gap-2 px-8 py-3.5 bg-[#4a7c2f] hover:bg-[#3a6022] text-white font-bold text-sm tracking-wide transition-colors"
              @click="showQuote = true"
            >
              FAST QUOTE
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button class="flex items-center gap-2 px-8 py-3.5 bg-gray-900 hover:bg-gray-700 text-white font-bold text-sm tracking-wide transition-colors">
              SPECIFICATION
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Specs Table -->
      <div class="mt-16 border-t border-gray-200 pt-12">
        <h2 class="text-xl font-extrabold text-gray-900 mb-6">Electrical Specifications</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-[#4a7c2f] text-white">
                <th class="px-5 py-3 text-left font-bold">Parameter</th>
                <th class="px-5 py-3 text-left font-bold">Symbol</th>
                <th class="px-5 py-3 text-left font-bold">Value</th>
                <th class="px-5 py-3 text-left font-bold">Unit</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="(row, i) in specs" :key="row.param" :class="i % 2 === 0 ? 'bg-white' : 'bg-gray-50'">
                <td class="px-5 py-3 font-medium text-gray-700">{{ row.param }}</td>
                <td class="px-5 py-3 text-gray-500 font-mono">{{ row.symbol }}</td>
                <td class="px-5 py-3 text-gray-900 font-semibold">{{ row.value }}</td>
                <td class="px-5 py-3 text-gray-500">{{ row.unit }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Package & Ordering -->
      <div class="mt-12 grid sm:grid-cols-2 gap-8">
        <div class="border border-gray-100 rounded-sm p-6 bg-gray-50">
          <h3 class="font-bold text-gray-900 mb-4">Package Information</h3>
          <ul class="flex flex-col gap-2 text-sm text-gray-600">
            <li class="flex justify-between"><span class="font-medium text-gray-700">Housing</span><span>{{ product.housing }}</span></li>
            <li class="flex justify-between"><span class="font-medium text-gray-700">Configuration</span><span>{{ product.configuration }}</span></li>
            <li class="flex justify-between"><span class="font-medium text-gray-700">Chip Type</span><span>{{ product.chipType }}</span></li>
            <li class="flex justify-between"><span class="font-medium text-gray-700">Isolation Voltage</span><span>2500 V<sub>rms</sub></span></li>
            <li class="flex justify-between"><span class="font-medium text-gray-700">Weight</span><span>~85 g</span></li>
          </ul>
        </div>
        <div class="border border-gray-100 rounded-sm p-6 bg-[#2d5016] text-white flex flex-col justify-between gap-6">
          <div>
            <p class="text-[#8dc63f] text-xs font-bold uppercase tracking-wider mb-2">Need a Quote?</p>
            <h3 class="text-xl font-extrabold mb-2">{{ product.name }}</h3>
            <p class="text-gray-300 text-sm">Contact our sales team for pricing, lead times, and minimum order quantities.</p>
          </div>
          <button
            class="self-start flex items-center gap-2 px-6 py-2.5 bg-[#8dc63f] hover:bg-[#7ab530] text-white font-bold text-sm transition-colors"
            @click="showQuote = true"
          >
            Request Quotation
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <QuotationModal v-model="showQuote" :partNumber="product.name" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { allProducts } from '@/data/products'
import componentImg from '@/assets/product/component.png'
import QuotationModal from '@/components/QuotationModal.vue'

const route = useRoute()
const id = Number(route.params.id)
const product = allProducts.find(p => p.id === id) || allProducts[0]

const thumbImages = [componentImg, componentImg, componentImg]
const selectedImage = ref(componentImg)
const showQuote = ref(false)

const voltageOptions = ['650V', '750V', '1200V', '1700V']
const chipOptions = ['Standard', 'Fast Switching']
const selectedVoltage = ref(product.voltage)
const selectedChip = ref(product.chipType)
const resetSelections = () => { selectedVoltage.value = product.voltage; selectedChip.value = product.chipType }

const features = computed(() => [
  `Collector-Emitter Voltage: ${product.voltage}`,
  `Nominal Collector Current: ${product.icNom}A at 25°C`,
  `VCE(sat) typical: ${product.vceSat}V at IC = ${product.icNom}A`,
  'Short-circuit withstand capability (10μs)',
  'Isolated copper baseplate for reliable thermal contact',
  `${product.chipType} chip technology for optimal switching performance`,
])

const specs = computed(() => [
  { param: 'Collector-Emitter Voltage',    symbol: 'VCES',      value: product.voltage.replace('V',''),  unit: 'V'     },
  { param: 'Collector Current (Tc=25°C)',  symbol: 'IC',        value: product.icNom,                    unit: 'A'     },
  { param: 'Collector-Emitter Sat. Volt.', symbol: 'VCE(sat)',  value: product.vceSat,                   unit: 'V'     },
  { param: 'Total Power Dissipation',      symbol: 'Ptot',      value: product.ptot,                     unit: 'W'     },
  { param: 'Thermal Resistance Junc–Case', symbol: 'RthJC',     value: product.rthJC,                    unit: '°C/W'  },
  { param: 'Operating Temp. Range',        symbol: 'Tj',        value: '−40 … +150',                     unit: '°C'    },
  { param: 'Storage Temperature',          symbol: 'Tstg',      value: '−40 … +125',                     unit: '°C'    },
  { param: 'Isolation Voltage (1 min)',     symbol: 'Visol',     value: '2500',                           unit: 'Vrms'  },
])
</script>
