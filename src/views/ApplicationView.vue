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

          <!-- Image -->
          <div class="w-full overflow-hidden rounded-sm mb-10">
            <img :src="activeApp.img" :alt="activeApp.title" class="w-full aspect-video object-cover" />
          </div>

          <!-- Description -->
          <div class="space-y-5 text-base text-gray-600 leading-relaxed">
            <p v-for="(para, i) in activeApp.body" :key="i">{{ para }}</p>
          </div>

          <!-- Key Requirements -->
          <div class="mt-8 bg-gray-50 rounded-sm p-6">
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Key Requirements</p>
            <ul class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <li v-for="req in activeApp.requirements" :key="req" class="flex items-center gap-2 text-sm text-gray-700">
                <span class="w-1.5 h-1.5 rounded-full bg-[#8dc63f] flex-shrink-0" />{{ req }}
              </li>
            </ul>
          </div>

          <!-- Recommended Products -->
          <div class="mt-10 pt-8 border-t border-gray-100">
            <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Recommended Products</p>
            <div class="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1" style="scroll-snap-type: x mandatory;">
              <RouterLink
                v-for="p in activeApp.relatedProducts" :key="p.name"
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
                  <p class="text-xs text-gray-400 mt-1 line-clamp-2">{{ p.desc }}</p>
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
import { ref } from 'vue'
import app1          from '@/assets/index/application1.png'
import app2          from '@/assets/index/application2.png'
import app3          from '@/assets/index/application3.png'
import app4          from '@/assets/index/application4.png'
import componentImg  from '@/assets/product/component.png'

const activeApp  = ref(null)
const openModal  = (app) => { activeApp.value = app; document.body.style.overflow = 'hidden' }
const closeModal = ()    => { activeApp.value = null;  document.body.style.overflow = '' }

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
    relatedProducts: [products.igbt75_1200, products.igbt150_1200, products.igbt100_1700],
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
    relatedProducts: [products.igbt75_1200, products.rect25_650, products.igbt150_1200],
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
    relatedProducts: [products.igbt50_1200, products.igbt75_1200, products.igbt150_1200],
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
    relatedProducts: [products.igbt50_1200, products.igbt75_1200, products.igbt100_1700],
  },
  {
    id: 'power-supply', title: 'Power Supply / Power Source',
    desc: 'Efficient conversion and tight voltage regulation for industrial and commercial power supplies.',
    img: app1,
    body: [
      'Switched-mode power supplies (SMPS) are the backbone of modern electronics, converting AC mains voltage to regulated DC for industrial equipment, telecommunications, and servers. High efficiency, power density, and reliability are the primary design drivers.',
      'The front-end rectifier stage uses a bridge rectifier module followed by a PFC boost converter, while the isolated DC-DC stage uses a half-bridge or full-bridge IGBT topology. SiC MOSFETs are increasingly adopted to push efficiency above 97%.',
      'MacMic\'s rectifier and FRED modules are standard choices for the AC/DC front end, while IGBT and SiC MOSFET modules serve the high-frequency isolation stage.',
    ],
    requirements: ['High efficiency > 95%', 'Wide input voltage range', 'Low EMI', 'High power factor', 'Fast transient response', 'Compact design'],
    relatedProducts: [products.rect25_650, products.igbt75_1200, products.sic50_650],
  },
  {
    id: 'bms', title: 'Battery Management System',
    desc: 'Precise current control and protection features for safe and efficient battery management.',
    img: app2,
    body: [
      'Battery Management Systems (BMS) monitor, protect, and control rechargeable battery packs in electric vehicles, energy storage systems, and portable devices. Power semiconductors play a critical role in cell balancing and protection.',
      'Bidirectional DC/DC converters within the BMS use MOSFETs or IGBTs to control charge and discharge currents with high precision. Devices must offer very low on-state resistance, fast switching, and high avalanche energy rating.',
      'MacMic\'s IGBT discretes are selected for BMS designs for their tight parameter tolerances, low RDS(on), and reliable performance over wide temperature ranges.',
    ],
    requirements: ['Low on-state resistance', 'Bidirectional operation', 'High avalanche energy', 'Wide temperature range', 'Accurate current sensing', 'Fast protection response'],
    relatedProducts: [products.sic50_650, products.igbt50_1200, products.sic100_1200],
  },
  {
    id: 'ev-motor-drive', title: 'EV Motor Drive',
    desc: 'High-power density and thermal efficiency for electric vehicle traction systems.',
    img: app3,
    body: [
      'Electric vehicle traction inverters deliver peak powers of 100–300kW from a compact, lightweight package while achieving system efficiencies above 97%, in a harsh automotive environment subject to vibration, moisture, and extreme temperatures.',
      'SiC MOSFET technology has become the preferred choice for new EV traction inverter designs, offering significant improvements in switching loss and thermal performance vs. silicon IGBTs — directly translating to longer driving range.',
      'MacMic\'s SiC MOSFET module series is optimised for EV traction, featuring automotive-grade packaging, integrated NTC thermistors, and data that supports functional safety analysis.',
    ],
    requirements: ['AEC-Q101 qualified', 'High power density', 'Low inductance package', 'Wide bandgap (SiC)', 'Functional safety support', 'Active thermal management'],
    relatedProducts: [products.sic100_1200, products.sic50_650, products.igbt200_1200],
  },
  {
    id: 'ev-charging', title: 'EV Charging Station',
    desc: 'Reliable AC/DC conversion for fast and safe EV charging infrastructure.',
    img: app4,
    body: [
      'EV charging stations — from AC wallboxes to high-power DC fast chargers — rely on power electronics to convert grid AC into regulated DC. DC fast chargers (50kW to 350kW) use an AC/DC rectifier stage followed by a DC/DC converter.',
      'The power semiconductors must handle high continuous currents and withstand grid voltage transients. The AC/DC front end typically uses a PFC boost rectifier, while the DC/DC isolation stage uses a phase-shifted full-bridge or LLC resonant converter.',
      'MacMic\'s SiC MOSFET and IGBT modules are deployed in commercial fast chargers worldwide, providing the efficiency and reliability required for 24/7 public charging operation.',
    ],
    requirements: ['High continuous current', 'Grid transient robustness', 'High efficiency AC/DC', 'Galvanic isolation', '24/7 duty cycle', 'Wide output voltage range'],
    relatedProducts: [products.sic100_1200, products.rect25_650, products.igbt150_1200],
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
</style>
