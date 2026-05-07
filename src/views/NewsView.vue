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
        <div v-if="filteredNews.length" class="grid lg:grid-cols-2 gap-8 mb-12">
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
              v-for="item in filteredNews.slice(1, 4)" :key="item.title"
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
            v-for="item in filteredNews.slice(4)" :key="item.title"
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

          <!-- Article body -->
          <div class="space-y-5 text-base text-gray-600 leading-relaxed">
            <p v-for="(para, i) in activeNews.body" :key="i">{{ para }}</p>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
            <span v-for="tag in activeNews.tags" :key="tag" class="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full">{{ tag }}</span>
          </div>

          <!-- Related Products -->
          <div class="mt-10 pt-8 border-t border-gray-100">
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
import { ref, computed } from 'vue'
import pcimImg     from '@/assets/index/pcim.png'
import mosfetImg   from '@/assets/index/mosfet.png'
import powerImg    from '@/assets/index/power.png'
import certImg     from '@/assets/index/certification.png'
import app1        from '@/assets/index/application1.png'
import app2        from '@/assets/index/application2.png'
import componentImg from '@/assets/product/component.png'

const tabs = ['All', 'Exhibitions', 'Products', 'Certifications']
const activeTab = ref('All')
const activeNews = ref(null)

const openModal  = (item) => { activeNews.value = item; document.body.style.overflow = 'hidden' }
const closeModal = ()     => { activeNews.value = null;  document.body.style.overflow = '' }

const igbtProducts = [
  { name: 'EG75W3LT-120H',  category: 'IGBT Module',       spec: '75A / 1200V',  desc: 'Half-bridge IGBT module with fast switching and low VCE(sat) for inverter applications.', img: componentImg, to: '/product/3'  },
  { name: 'EG150W3LT-120H', category: 'IGBT Module',       spec: '150A / 1200V', desc: 'High-current IGBT module designed for industrial motor drives and UPS systems.',            img: componentImg, to: '/product/5' },
  { name: 'EG100W3LT-170H', category: 'IGBT Module',       spec: '100A / 1700V', desc: 'High-voltage IGBT for medium-voltage drives and STATCOM applications.',                     img: componentImg, to: '/product/4' },
  { name: 'EG50W3LT-065H',  category: 'SiC MOSFET Module', spec: '50A / 650V',   desc: 'SiC MOSFET for high-frequency DC/DC converters and EV on-board chargers.',                 img: componentImg, to: '/product/2'  },
  { name: 'EG200W3LT-120H', category: 'IGBT Module',       spec: '200A / 1200V', desc: 'Full-bridge high-power module for traction and renewable energy inverters.',                 img: componentImg, to: '/product/6' },
  { name: 'EG25W3LT-065H',  category: 'Rectifier Module',  spec: '25A / 650V',   desc: 'Compact rectifier module for SMPS front-end and industrial power supplies.',                img: componentImg, to: '/product/1'  },
]

const allNews = [
  {
    category: 'Exhibitions', title: 'MacMic will be attended in PCIM 2024',
    desc: 'We are thrilled to announce that MacMic will be showcasing our latest power semiconductor solutions at PCIM 2024.',
    author: 'Jeremy Jean', date: '1 April 2024', img: pcimImg,
    tags: ['PCIM 2024', 'Exhibition', 'MacMic', 'Power Semiconductors'],
    body: [
      'We are thrilled to announce that MacMic Science & Technology will be participating in PCIM Europe 2024, one of the world\'s leading conferences and exhibitions for power electronics, intelligent motion, renewable energy, and energy management.',
      'PCIM Europe will be held from 11–13 June 2024 at the Nuremberg Exhibition Centre in Germany. MacMic will be showcasing its latest portfolio of IGBT modules, SiC MOSFET modules, rectifier modules, and discrete devices designed for high-efficiency power conversion applications.',
      'At our booth, visitors will have the opportunity to explore new product releases, speak directly with our application engineers, and learn about the performance advantages of MacMic\'s latest generation power semiconductors.',
      'We warmly invite all customers, partners, and industry professionals to visit the MacMic booth. For those wishing to schedule a meeting with our engineering or sales teams, please contact us in advance.',
    ],
    relatedProducts: [igbtProducts[0], igbtProducts[3], igbtProducts[5]],
  },
  {
    category: 'Products', title: 'MOSFET MODULE — MMN600DB015B',
    desc: 'MacMic MOSFET modules come with outstanding switching performance, ideal for high-frequency applications.',
    author: 'Jeremy Jean', date: '1 April 2024', img: mosfetImg,
    tags: ['MOSFET', 'Module', 'MMN Series', 'High Frequency'],
    body: [
      'MacMic is proud to introduce the MMN600DB015B, a new addition to our MOSFET module lineup designed to deliver exceptional switching performance in demanding high-frequency applications.',
      'The MMN600DB015B features a dual N-channel configuration rated at 600V / 15mΩ RDS(on), housed in a compact 62mm package with optimized internal layout for minimum stray inductance. Ideal for DC-DC converters and server power supplies operating above 100kHz.',
      'Key specifications: VDSS = 600V, ID = 75A at 25°C, RDS(on) max = 15mΩ, Tj max = 175°C. Integrates a body diode with ultra-fast recovery to minimize reverse recovery losses.',
      'Samples and datasheets are available now. Contact your nearest EFF representative or submit a quotation request through our website.',
    ],
    relatedProducts: [igbtProducts[3], igbtProducts[0], igbtProducts[1]],
  },
  {
    category: 'Products', title: 'HIGH POWER IGBT DISCRETE IN TO-247 PLUS PACKAGE',
    desc: 'IGBT discrete in TO-247 Plus package for high power density applications with improved thermal performance.',
    author: 'Michaela Augus', date: '1 April 2024', img: powerImg,
    tags: ['IGBT', 'Discrete', 'TO-247 Plus', 'High Power'],
    body: [
      'MacMic announces the release of its new high-power IGBT discrete series in the TO-247 Plus package — enhanced with a Kelvin emitter pin for more precise gate drive control and reduced dynamic losses.',
      'The dedicated Kelvin emitter allows gate drive circuitry to be referenced to a low-inductance emitter connection, significantly reducing switching losses — especially beneficial in half-bridge and full-bridge topologies.',
      'The series covers 650V to 1700V with current ratings from 40A to 120A, all featuring MacMic\'s latest Trench-FS IGBT chip with VCE(sat) of 1.65V typical at 1200V/75A.',
      'Production quantities available from Q2 2024. Engineering samples can be requested through EFF.',
    ],
    relatedProducts: [igbtProducts[0], igbtProducts[2], igbtProducts[4]],
  },
  {
    category: 'Certifications', title: 'CERTIFICATION OF GENERAL AEO',
    desc: 'Efficient International Technology has achieved the AEO certification, reinforcing our commitment to global trade compliance.',
    author: 'Kim Gurameh', date: '1 April 2024', img: certImg,
    tags: ['AEO', 'Certification', 'Trade Compliance', 'Customs'],
    body: [
      'Efficient International Technology Co., Ltd. is proud to announce that we have successfully obtained the Authorized Economic Operator (AEO) — General Certification issued by the Republic of China Customs Administration.',
      'AEO-certified companies benefit from faster customs clearance, fewer physical inspections, and priority treatment in post-clearance audits — directly benefiting our customers through faster delivery lead times.',
      'This certification reflects our company\'s ongoing commitment to supply chain security, regulatory compliance, and operational excellence in the global power semiconductor market.',
    ],
    relatedProducts: [igbtProducts[0], igbtProducts[1], igbtProducts[5]],
  },
  {
    category: 'Products', title: 'NEW SiC MOSFET MODULE SERIES RELEASED',
    desc: 'Our new SiC MOSFET module series offers best-in-class efficiency for demanding EV and industrial applications.',
    author: 'Jeremy Jean', date: '15 March 2024', img: app1,
    tags: ['SiC', 'MOSFET', 'EV', 'Wide Bandgap'],
    body: [
      'EFF and MacMic are excited to announce the launch of the MSC Series — a new family of SiC MOSFET modules engineered for EV and industrial power conversion applications.',
      'SiC technology delivers lower switching losses at high frequencies, higher thermal conductivity, and junction temperatures up to 200°C — enabling system efficiency improvements of 1–3% vs. silicon.',
      'The initial release covers 62mm, half-bridge, and full-bridge packages in 1200V and 1700V, with on-resistances from 5mΩ to 25mΩ. Targets include EV traction inverters, OBCs, and solar string inverters.',
    ],
    relatedProducts: [igbtProducts[3], igbtProducts[0], igbtProducts[4]],
  },
  {
    category: 'Exhibitions', title: 'EFF AT TAIWAN ELECTRONICA 2024',
    desc: 'Visit us at Taiwan Electronica 2024 to explore our full product range and speak with our technical experts.',
    author: 'Jeremy Jean', date: '10 February 2024', img: app2,
    tags: ['Taiwan Electronica', 'Exhibition', 'EFF', '2024'],
    body: [
      'Efficient International Technology (EFF) will be exhibiting at Taiwan Electronica 2024, scheduled for September 2024 at the Taipei Nangang Exhibition Center.',
      'The EFF booth will feature our complete product portfolio — IGBT modules, SiC MOSFET modules, rectifier modules, discretes, and accessories from MacMic, Dynex, PEM, and Hitto.',
      'Our application engineers will be on-site for technical consultations, product selection assistance, and live demonstrations of our product selection tools.',
    ],
    relatedProducts: [igbtProducts[0], igbtProducts[1], igbtProducts[3]],
  },
  {
    category: 'Products', title: 'RECTIFIER MODULE — MBR SERIES UPDATE',
    desc: 'Updated MBR series rectifier modules deliver improved forward voltage characteristics and longer operational life.',
    author: 'Michaela Augus', date: '5 January 2024', img: pcimImg,
    tags: ['Rectifier', 'MBR Series', 'Module', 'Update'],
    body: [
      'MacMic has released a significant update to the MBR Series rectifier modules, with improvements to forward voltage characteristics and package reliability that extend service life in demanding industrial environments.',
      'The updated MBR Series reduces forward voltage drop (VF) by 8% vs. the previous generation — lower conduction losses and reduced thermal stress in three-phase bridge rectifier configurations.',
      'New die-attach material improves thermal cycling performance. The devices remain fully pin-to-pin compatible with previous MBR Series for drop-in replacement.',
    ],
    relatedProducts: [igbtProducts[5], igbtProducts[0], igbtProducts[1]],
  },
]

const filteredNews = computed(() => {
  if (activeTab.value === 'All') return allNews
  return allNews.filter(n => n.category === activeTab.value)
})
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.18s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
