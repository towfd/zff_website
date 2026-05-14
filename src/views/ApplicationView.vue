<template>
  <div>
    <!-- Hero -->
    <section class="relative w-full min-h-[340px] flex items-center bg-gray-900 overflow-hidden">
      <img src="@/assets/index/application1.png" alt="Applications" class="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <p class="text-[#8dc63f] text-sm font-semibold mb-3">Applications</p>
        <h1 class="text-white text-4xl lg:text-5xl font-extrabold uppercase leading-tight mb-4">Our Applications</h1>
        <p class="text-gray-300 text-base max-w-xl">MacMic offers comprehensive solutions with the best cost performance to fit customers' demands across a wide range of industries.</p>
      </div>
    </section>

    <!-- Applications Grid -->
    <section class="bg-white py-20 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-14">
          <p class="text-[#8dc63f] text-sm font-semibold mb-3">Industries We Serve</p>
          <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-900">Application Areas</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="app in applications" :key="app.title"
            :id="app.id"
            class="group border border-gray-100 rounded-sm hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer scroll-mt-24"
            @click="openModal(app)"
          >
            <div class="aspect-[4/3] overflow-hidden bg-gray-100">
              <img :src="app.img" :alt="app.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div class="p-5">
              <div class="w-8 h-0.5 bg-[#8dc63f] mb-3" />
              <h3 class="text-base font-bold text-gray-900 mb-2 group-hover:text-[#4a7c2f] transition-colors">{{ app.title }}</h3>
              <p class="text-sm text-gray-500 leading-relaxed line-clamp-2">{{ app.desc }}</p>
              <p class="text-xs text-[#8dc63f] font-semibold mt-3 flex items-center gap-1">
                Learn More
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Used -->
    <section class="bg-gray-50 py-20 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-14">
          <p class="text-[#8dc63f] text-sm font-semibold mb-3">Our Products</p>
          <h2 class="text-3xl lg:text-4xl font-extrabold text-gray-900">Products for Every Application</h2>
          <p class="text-gray-500 text-sm mt-4 max-w-lg mx-auto">We carry a full range of power semiconductor solutions designed to meet the demanding requirements of each application.</p>
        </div>
        <div class="grid sm:grid-cols-3 gap-6">
          <div v-for="item in productTypes" :key="item.title" class="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
            <h3 class="font-bold text-gray-900 text-base mb-3">{{ item.title }}</h3>
            <ul class="flex flex-col gap-2">
              <li v-for="p in item.items" :key="p" class="text-sm text-gray-500 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#8dc63f] flex-shrink-0" />{{ p }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#8dc63f] py-16 px-6 lg:px-8 text-center">
      <h2 class="text-white text-3xl font-extrabold mb-4">Looking for a solution?</h2>
      <p class="text-white/80 text-sm mb-8 max-w-md mx-auto">Our technical team is ready to help you select the right product for your application.</p>
      <RouterLink to="/support" class="inline-block px-8 py-3 bg-white text-[#8dc63f] font-bold text-base rounded-full hover:bg-gray-100 transition-colors duration-200">Contact Us</RouterLink>
    </section>

    <!-- Full-screen Modal -->
    <Transition name="modal">
      <div v-if="activeApp" class="fixed inset-x-0 bottom-0 top-16 lg:top-20 z-[45] bg-white overflow-y-auto">

        <!-- Sticky close bar -->
        <div class="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 flex items-center justify-between px-6 py-3">
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-400">Applications</span>
            <svg class="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            <span class="text-xs font-bold text-gray-700">{{ activeApp.title }}</span>
          </div>
          <button class="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors" @click="closeModal">
            <span class="hidden sm:inline">Close</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Title section -->
        <div class="bg-gray-50 border-b border-gray-100 px-6 sm:px-16 py-10 max-w-4xl mx-auto w-full">
          <p class="text-[#8dc63f] text-xs font-bold uppercase tracking-widest mb-3">Applications</p>
          <h1 class="text-2xl sm:text-4xl font-extrabold text-gray-900 uppercase leading-tight max-w-3xl">{{ activeApp.title }}</h1>
          <p class="text-gray-500 text-sm mt-4 max-w-2xl leading-relaxed">{{ activeApp.desc }}</p>
        </div>

        <!-- Content -->
        <div class="max-w-4xl mx-auto px-6 sm:px-8 py-10">

          <!-- Interactive Diagram -->
          <div class="w-full mb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="w-2 h-2 rounded-full bg-[#8dc63f] animate-pulse"></span>
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Interactive Diagram — select a component</p>
            </div>
            <div class="relative w-full select-none rounded-lg overflow-hidden shadow-lg border border-gray-100">
              <img :src="appImg" :alt="activeApp.title" class="w-full" />
              <!-- Hotspot pins -->
              <button
                v-for="spot in activeApp.hotspots"
                :key="spot.id"
                @click="activeHotspot = activeHotspot === spot.id ? null : spot.id"
                :style="{ left: spot.cx + '%', top: spot.cy + '%' }"
                class="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
              >
                <!-- Pulse ring -->
                <span v-if="activeHotspot !== spot.id" class="absolute inset-0 w-5 h-5 rounded-full bg-[#8dc63f]/50 animate-ping"></span>
                <!-- Dot -->
                <span :class="[
                  'relative flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200 shadow-lg',
                  activeHotspot === spot.id
                    ? 'bg-[#4a7c2f] border-white scale-125'
                    : 'bg-white border-[#4a7c2f] group-hover:bg-[#4a7c2f] group-hover:scale-110'
                ]">
                  <span :class="['w-2 h-2 rounded-full transition-colors duration-200', activeHotspot === spot.id ? 'bg-white' : 'bg-[#4a7c2f] group-hover:bg-white']"></span>
                </span>
                <!-- Tooltip -->
                <span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 whitespace-nowrap bg-gray-900 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-xl">
                  {{ spot.label }}
                  <span class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></span>
                </span>
              </button>
            </div>
          </div>

          <!-- Hotspot Product Panel -->
          <Transition name="fade">
            <div v-if="activeHotspot && activeApp.hotspots" class="mb-8">
              <template v-for="spot in activeApp.hotspots" :key="spot.id">
                <div v-if="activeHotspot === spot.id" class="rounded-lg overflow-hidden border border-[#8dc63f]/30 shadow-sm">
                  <!-- Panel header -->
                  <div class="bg-[#2d5016] px-5 py-4 flex items-start justify-between gap-4">
                    <div>
                      <p class="text-[#8dc63f] text-xs font-bold uppercase tracking-widest mb-1">{{ spot.label }}</p>
                      <p class="text-white/80 text-sm leading-relaxed">{{ spot.desc }}</p>
                    </div>
                    <button @click="activeHotspot = null" class="flex-shrink-0 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors mt-0.5">
                      <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <!-- Products -->
                  <div class="bg-[#f8fdf2] px-5 py-4">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Recommended Products</p>
                    <div class="flex gap-3 overflow-x-auto pb-1">
                      <RouterLink
                        v-for="p in spot.products" :key="p.name"
                        :to="p.to"
                        class="group flex-shrink-0 w-44 border border-gray-200 bg-white rounded-lg hover:border-[#8dc63f] hover:shadow-md transition-all duration-150 flex flex-col overflow-hidden"
                        @click="closeModal"
                      >
                        <div class="aspect-[4/3] bg-gray-50 overflow-hidden">
                          <img :src="p.img" :alt="p.name" class="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-200" />
                        </div>
                        <div class="p-3 border-t border-gray-100">
                          <span class="text-[10px] font-bold text-[#8dc63f] uppercase tracking-wide">{{ p.category }}</span>
                          <p class="text-xs font-bold text-gray-900 mt-0.5 leading-snug group-hover:text-[#2d5016]">{{ p.name }}</p>
                          <p class="text-[11px] text-gray-400 mt-0.5">{{ p.spec }}</p>
                          <span class="text-[10px] text-[#8dc63f] font-semibold flex items-center gap-1 mt-2">
                            View
                            <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                          </span>
                        </div>
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </Transition>

          <!-- Description -->
          <div class="space-y-5 text-base text-gray-600 leading-relaxed">
            <p v-for="(para, i) in activeApp.body" :key="i">{{ para }}</p>
          </div>

          <!-- Key Requirements -->
          <div class="mt-8 bg-gray-50 rounded-lg p-6">
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Key Requirements</p>
            <ul class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <li v-for="req in activeApp.requirements" :key="req" class="flex items-center gap-2 text-sm text-gray-700">
                <span class="w-1.5 h-1.5 rounded-full bg-[#8dc63f] flex-shrink-0" />{{ req }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import app1          from '@/assets/index/application1.png'
import app2          from '@/assets/index/application2.png'
import app3          from '@/assets/index/application3.png'
import app4          from '@/assets/index/application4.png'
import appImg        from '@/assets/application/applications.png'
import componentImg  from '@/assets/product/component.png'

const activeApp      = ref(null)
const activeHotspot  = ref(null)
const openModal  = (app) => { activeApp.value = app; activeHotspot.value = null; document.body.style.overflow = 'hidden' }
const closeModal = ()    => { activeApp.value = null; activeHotspot.value = null; document.body.style.overflow = '' }
onUnmounted(() => { document.body.style.overflow = '' })

const products = {
  igbt75_1200:   { name: 'EG75W3LT-120H',  category: 'IGBT Module',       spec: '75A / 1200V',  desc: 'Half-bridge IGBT module for industrial inverter and motor drive applications.',          img: componentImg, to: '/product/3'  },
  igbt150_1200:  { name: 'EG150W3LT-120H', category: 'IGBT Module',       spec: '150A / 1200V', desc: 'High-current IGBT module for UPS, motor drives and high-power inverter stages.',         img: componentImg, to: '/product/5'  },
  igbt100_1700:  { name: 'EG100W3LT-170H', category: 'IGBT Module',       spec: '100A / 1700V', desc: 'High-voltage IGBT module for medium-voltage drives and traction systems.',                img: componentImg, to: '/product/4'  },
  sic50_650:     { name: 'EG50W3LT-065H',  category: 'SiC MOSFET Module', spec: '50A / 650V',   desc: 'SiC MOSFET for high-frequency EV chargers and DC/DC converters.',                        img: componentImg, to: '/product/2'  },
  igbt200_1200:  { name: 'EG200W3LT-120H', category: 'IGBT Module',       spec: '200A / 1200V', desc: 'Full-bridge high-power module for traction inverters and renewable energy systems.',      img: componentImg, to: '/product/6'  },
  rect25_650:    { name: 'EG25W3LT-065H',  category: 'Rectifier Module',  spec: '25A / 650V',   desc: 'Compact three-phase bridge rectifier for SMPS front-end and industrial power supplies.',  img: componentImg, to: '/product/1'  },
  igbt50_1200:   { name: 'EG50W3LT-120H',  category: 'IGBT Module',       spec: '50A / 1200V',  desc: 'Standard IGBT module for welding, induction heating, and auxiliary converter stages.',    img: componentImg, to: '/product/28' },
  sic100_1200:   { name: 'EG100W3LT-120H', category: 'SiC MOSFET Module', spec: '100A / 1200V', desc: 'High-power SiC MOSFET for EV traction inverters and grid-tied energy storage.',          img: componentImg, to: '/product/4'  },
}

const applications = [
  {
    id: 'industrial-inverter', title: 'Industrial Inverter / Motor Drive',
    desc: 'High switching frequency, reliable gate drive, and robust thermal performance for demanding industrial environments.',
    img: app1,
    body: [
      'Industrial inverters and motor drives are among the most demanding applications for power semiconductors. They require devices that can handle high switching frequencies, wide load variations, and harsh environmental conditions — all while delivering consistent efficiency across the full operating range.',
      'In a typical three-phase inverter topology, IGBT modules form the core of the power stage. The selection of the right IGBT — balancing conduction losses, switching losses, and short-circuit robustness — directly impacts system efficiency, reliability, and thermal management.',
      'MacMic\'s IGBT and SiC MOSFET module range offers optimised solutions for low-voltage drives (up to 690V AC) and medium-voltage systems up to 3.3kV, covering power levels from a few kilowatts up to several megawatts.',
    ],
    requirements: ['High switching frequency', 'Short-circuit robustness', 'Low VCE(sat)', 'Wide operating temperature', 'High power density', 'Long service life'],
    hotspots: [
      { id: 'rectifier',  label: 'Rectifier (AC/DC)',        cx: 28, cy: 41, desc: 'Converts AC grid input to DC. Demands low forward voltage drop and high surge current capability.',            products: [products.rect25_650, products.igbt75_1200, products.igbt150_1200] },
      { id: 'inverter',   label: 'Inverter (DC/AC)',          cx: 65, cy: 41, desc: 'Core power stage converting DC bus to variable-frequency AC. Uses IGBT modules for high-speed switching.',    products: [products.igbt75_1200, products.igbt150_1200, products.igbt100_1700] },
      { id: 'bypass',     label: 'Bypass Switch',             cx: 47, cy: 13, desc: 'Automatic / maintenance bypass path. Switching devices must handle full load current reliably.',               products: [products.igbt50_1200, products.igbt75_1200, products.sic50_650] },
      { id: 'spd',        label: 'Surge Protective Device',   cx: 47, cy: 72, desc: 'Clamps transient overvoltages from the AC grid. Works in tandem with front-end rectifier modules.',           products: [products.rect25_650, products.sic50_650, products.igbt50_1200] },
      { id: 'dc-source',  label: 'Input DC Source',           cx: 15, cy: 72, desc: 'Battery bank or solar array feeding DC directly to the bus. SiC MOSFETs excel in bidirectional DC/DC stages.', products: [products.sic50_650, products.sic100_1200, products.igbt200_1200] },
    ],
  },
  {
    id: 'ups', title: 'UPS',
    desc: 'Fast switching and high efficiency to ensure uninterrupted power supply for critical systems.',
    img: app2,
    body: [
      'Uninterruptible Power Supplies (UPS) protect critical infrastructure — data centres, hospitals, and telecommunications — from power outages. The power semiconductor devices inside a UPS must combine high efficiency with extreme reliability.',
      'Modern online double-conversion UPS systems use IGBT-based inverters and rectifiers operating at 10–20kHz. The switching devices must exhibit low losses, fast body diode recovery, and robust behaviour under abnormal grid conditions.',
      'MacMic\'s rectifier modules and IGBT modules are deployed in UPS systems from a few kVA to several MVA, providing the performance and reliability that mission-critical applications demand.',
    ],
    requirements: ['High reliability', 'Low switching losses', 'Fast recovery diode', 'Wide input voltage range', 'Efficiency > 96%', 'Compact footprint'],
    hotspots: [
      { id: 'rectifier',  label: 'Rectifier (AC/DC)',      cx: 28, cy: 41, desc: 'PFC front-end rectifier converting grid AC to regulated DC bus. Critical for high input power factor.',           products: [products.rect25_650, products.igbt75_1200, products.igbt150_1200] },
      { id: 'inverter',   label: 'Inverter (DC/AC)',        cx: 65, cy: 41, desc: 'Regenerates clean AC output from DC bus. Must maintain low THD and fast transient response under load steps.',   products: [products.igbt75_1200, products.igbt150_1200, products.igbt200_1200] },
      { id: 'bypass',     label: 'Static Bypass',           cx: 47, cy: 13, desc: 'Transfers load to grid instantly on inverter fault. Uses fast-switching thyristors or IGBT pairs.',              products: [products.igbt50_1200, products.igbt75_1200, products.sic50_650] },
      { id: 'battery',    label: 'Battery Bank',            cx: 47, cy: 72, desc: 'Energy storage providing ride-through during outages. Bidirectional DC/DC converters manage charge/discharge.',  products: [products.sic50_650, products.sic100_1200, products.igbt100_1700] },
      { id: 'dc-link',    label: 'DC Link Capacitors',      cx: 15, cy: 72, desc: 'High-capacity DC bus filtering. Reduces ripple voltage seen by both rectifier and inverter stages.',              products: [products.igbt200_1200, products.igbt100_1700, products.rect25_650] },
    ],
  },
  {
    id: 'welding-machine', title: 'Welding Machine',
    desc: 'Handle high current spikes and repetitive load conditions typical in welding applications.',
    img: app3,
    body: [
      'Welding machines impose some of the most demanding conditions on power semiconductors. Devices must withstand extremely high peak currents during arc ignition, handle repetitive pulsed loads, and operate reliably in environments with significant electrical noise.',
      'Inverter-based welding machines typically use IGBTs at 20–100kHz for compact size, fast dynamic response, and precise current control. Short-circuit capability is critical — the device must survive briefly without catastrophic failure.',
      'MacMic\'s IGBT modules and discretes are proven in MIG, TIG, and plasma cutting applications, with robust construction and tight parameter matching ensuring consistent arc performance.',
    ],
    requirements: ['High peak current', 'Short-circuit withstand', 'Repetitive pulsed load', 'Fast switching', 'Robust packaging', 'Noise immunity'],
    hotspots: [
      { id: 'rectifier',  label: 'Input Rectifier',         cx: 28, cy: 41, desc: 'Converts mains AC to DC for the main inverter stage. Bridge rectifier modules with high surge rating preferred.',  products: [products.rect25_650, products.igbt75_1200, products.igbt50_1200] },
      { id: 'main-igbt',  label: 'Main IGBT Switch',        cx: 65, cy: 41, desc: 'Core switching element driving the welding transformer at 20–100kHz. Must survive short-circuit conditions.',     products: [products.igbt50_1200, products.igbt75_1200, products.igbt150_1200] },
      { id: 'pfc',        label: 'PFC / Chopper',           cx: 47, cy: 13, desc: 'Active power factor correction or current chopper stage. SiC MOSFETs offer lower switching losses here.',        products: [products.sic50_650, products.sic100_1200, products.igbt75_1200] },
      { id: 'output',     label: 'Output Stage',            cx: 47, cy: 72, desc: 'Secondary-side rectifier delivering high DC current to the welding arc. Low V_F diodes are essential.',          products: [products.rect25_650, products.igbt100_1700, products.igbt150_1200] },
      { id: 'driver',     label: 'Gate Driver / Control',   cx: 15, cy: 72, desc: 'Drives IGBT gates with precise timing. Low-side and high-side drivers protect against shoot-through.',           products: [products.sic50_650, products.igbt50_1200, products.rect25_650] },
    ],
  },
  {
    id: 'induction-heating', title: 'Induction Heating',
    desc: 'High-frequency operation and rugged construction for induction heating systems.',
    img: app4,
    body: [
      'Induction heating systems use high-frequency alternating current in a coil to generate heat in a conductive workpiece through electromagnetic induction. Applications range from industrial metal hardening to cooking appliances.',
      'Power semiconductors in an induction heating inverter operate at frequencies from a few kHz up to several MHz, requiring very low switching losses and tight gate threshold control. Full-bridge or half-bridge IGBT topologies with resonant operation are common.',
      'MacMic\'s high-frequency IGBT modules are engineered for induction heating, offering the switching speed and thermal performance needed for continuous-duty operation at elevated frequencies.',
    ],
    requirements: ['High-frequency operation', 'Low switching losses', 'Resonant topology support', 'High dv/dt capability', 'Continuous duty rating', 'Tight Vge(th) matching'],
    hotspots: [
      { id: 'rectifier',  label: 'Input Rectifier',         cx: 28, cy: 41, desc: 'AC/DC front end supplying the DC bus. Three-phase bridge with high surge current rating for start-up.',         products: [products.rect25_650, products.igbt75_1200, products.igbt50_1200] },
      { id: 'resonant',   label: 'Resonant Inverter',       cx: 65, cy: 41, desc: 'Full/half-bridge IGBT topology driving the resonant LC tank at kHz–MHz range. Key to heating efficiency.',      products: [products.igbt50_1200, products.igbt75_1200, products.sic50_650] },
      { id: 'gate',       label: 'Gate Driver',             cx: 47, cy: 13, desc: 'Provides isolated, high-speed gate signals. Tight dead-time control prevents cross-conduction at high frequency.', products: [products.sic50_650, products.sic100_1200, products.igbt50_1200] },
      { id: 'tank',       label: 'Resonant Tank (LC)',      cx: 47, cy: 72, desc: 'Inductor-capacitor network defining operating frequency and power delivery to the heating coil.',               products: [products.igbt100_1700, products.igbt150_1200, products.igbt75_1200] },
      { id: 'pfc',        label: 'Power Factor Correction', cx: 15, cy: 72, desc: 'Boost PFC stage ensuring unity power factor at the grid interface. SiC MOSFETs enable higher switching freq.',  products: [products.sic50_650, products.sic100_1200, products.rect25_650] },
    ],
  },
]

const productTypes = [
  { title: 'Power Modules',    items: ['IGBT Module', 'Rectifier Module', 'FRED Module', 'SCR Module', 'SiC MOSFET Module'] },
  { title: 'Discretes',        items: ['IGBT Discretes', 'Diode Discretes', 'SCR Discretes', 'Triac Discretes'] },
  { title: 'Other Components', items: ['Busbar', 'Relay', 'Fuse'] },
]
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.18s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-8px); }
@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
.animate-ping { animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite; }
.animate-pulse { animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
</style>
