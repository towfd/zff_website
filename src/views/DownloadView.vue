<template>
  <div>
    <!-- Hero -->
    <section class="relative w-full min-h-[300px] flex items-center bg-gray-900 overflow-hidden">
      <img src="@/assets/index/hero_img.png" alt="Download Center" class="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <p class="text-[#8dc63f] text-sm font-semibold mb-3">Support</p>
        <h1 class="text-white text-4xl lg:text-5xl font-extrabold uppercase leading-tight mb-4">
          Download Center
        </h1>
        <p class="text-gray-300 text-base max-w-xl">
          Access datasheets, application notes, certifications, and other technical documents.
        </p>
      </div>
    </section>

    <!-- Search + Filter -->
    <section class="bg-white border-b border-gray-200 py-6 px-6 lg:px-8 sticky top-[80px] z-40">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <!-- Search -->
        <div class="flex items-center border border-gray-300 bg-gray-50 w-full sm:w-80">
          <svg class="w-4 h-4 text-gray-400 ml-3 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search documents..."
            class="flex-1 px-3 py-2.5 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
          />
        </div>
        <!-- Category filters -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            class="px-4 py-1.5 text-xs font-semibold border rounded-full transition-colors duration-150"
            :class="activeCategory === cat
              ? 'bg-[#8dc63f] text-white border-[#8dc63f]'
              : 'bg-white text-gray-600 border-gray-300 hover:border-[#8dc63f] hover:text-[#8dc63f]'"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </section>

    <!-- File Table -->
    <section class="bg-gray-50 py-16 px-6 lg:px-8 min-h-[60vh]">
      <div class="max-w-7xl mx-auto">

        <!-- Stats row -->
        <div class="flex items-center justify-between mb-6">
          <p class="text-sm text-gray-500">
            Showing <span class="font-semibold text-gray-800">{{ filteredFiles.length }}</span> documents
          </p>
          <p class="text-xs text-gray-400">Click any row to download</p>
        </div>

        <!-- No results -->
        <div v-if="filteredFiles.length === 0" class="text-center py-20">
          <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-gray-400 text-sm">No documents found. Try adjusting your filters.</p>
        </div>

        <!-- Table (desktop) -->
        <div class="hidden sm:block bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-10">&nbsp;</th>
                <th class="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Document Name</th>
                <th class="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                <th class="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Product Series</th>
                <th class="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Language</th>
                <th class="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Size</th>
                <th class="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Updated</th>
                <th class="px-4 py-3 w-12">&nbsp;</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="file in filteredFiles"
                :key="file.name"
                class="group hover:bg-[#f7fbf2] transition-colors cursor-pointer"
              >
                <td class="px-5 py-4">
                  <div class="w-8 h-8 rounded flex items-center justify-center" :class="file.iconBg">
                    <svg class="w-4 h-4" :class="file.iconColor" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </td>
                <td class="px-5 py-4">
                  <p class="text-sm font-semibold text-gray-800 group-hover:text-[#2d5016] transition-colors">{{ file.name }}</p>
                  <p class="text-xs text-gray-400 mt-0.5">{{ file.desc }}</p>
                </td>
                <td class="px-4 py-4">
                  <span class="inline-block px-2 py-0.5 text-xs font-semibold rounded-full" :class="categoryBadge(file.category)">
                    {{ file.category }}
                  </span>
                </td>
                <td class="px-4 py-4 text-sm text-gray-600">{{ file.series }}</td>
                <td class="px-4 py-4 text-sm text-gray-600">{{ file.lang }}</td>
                <td class="px-4 py-4 text-sm text-gray-500">{{ file.size }}</td>
                <td class="px-4 py-4 text-xs text-gray-400">{{ file.date }}</td>
                <td class="px-4 py-4">
                  <div class="flex items-center justify-center w-8 h-8 rounded border border-gray-200 group-hover:border-[#8dc63f] group-hover:text-[#8dc63f] text-gray-400 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Cards (mobile) -->
        <div class="flex flex-col gap-3 sm:hidden">
          <div
            v-for="file in filteredFiles"
            :key="file.name"
            class="bg-white border border-gray-100 rounded-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div class="w-10 h-10 rounded flex items-center justify-center flex-shrink-0" :class="file.iconBg">
              <svg class="w-5 h-5" :class="file.iconColor" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-800 truncate">{{ file.name }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ file.category }} · {{ file.size }}</p>
            </div>
            <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#2d5016] py-14 px-6 lg:px-8 text-center">
      <h2 class="text-white text-2xl font-extrabold mb-3">Can't find what you need?</h2>
      <p class="text-gray-300 text-sm mb-6 max-w-md mx-auto">
        Contact our technical team for custom datasheets, application notes, or any other documentation.
      </p>
      <RouterLink
        to="/contact"
        class="inline-block px-8 py-3 bg-[#8dc63f] hover:bg-[#7ab530] text-white font-bold text-sm rounded-full transition-colors duration-200"
      >
        Contact Technical Support
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const activeCategory = ref('All')

const categories = ['All', 'Datasheets', 'Application Notes', 'Certifications', 'Brochures', 'Software']

const categoryBadge = (cat) => ({
  'Datasheets':        'bg-blue-50 text-blue-700',
  'Application Notes': 'bg-purple-50 text-purple-700',
  'Certifications':    'bg-green-50 text-[#2d5016]',
  'Brochures':         'bg-orange-50 text-orange-700',
  'Software':          'bg-gray-100 text-gray-700',
}[cat] || 'bg-gray-100 text-gray-700')

const files = [
  { name: 'IGBT Module Datasheet — MMI Series',               desc: 'Complete electrical and thermal specifications for MMI IGBT module range.',             category: 'Datasheets',        series: 'MMI',   lang: 'EN',    size: '2.3 MB', date: '2024-03', iconBg: 'bg-blue-50',   iconColor: 'text-blue-500' },
  { name: 'Rectifier Module Datasheet — MBR Series',          desc: 'Forward voltage, current ratings and package details for MBR rectifier modules.',       category: 'Datasheets',        series: 'MBR',   lang: 'EN',    size: '1.8 MB', date: '2024-02', iconBg: 'bg-blue-50',   iconColor: 'text-blue-500' },
  { name: 'SiC MOSFET Module Datasheet — MSC Series',         desc: 'High-frequency SiC MOSFET specifications for EV and industrial applications.',          category: 'Datasheets',        series: 'MSC',   lang: 'EN',    size: '3.1 MB', date: '2024-04', iconBg: 'bg-blue-50',   iconColor: 'text-blue-500' },
  { name: 'SCR Module Datasheet — MSR Series',                desc: 'Thyristor module specifications for industrial rectification and control.',              category: 'Datasheets',        series: 'MSR',   lang: 'EN',    size: '1.6 MB', date: '2023-12', iconBg: 'bg-blue-50',   iconColor: 'text-blue-500' },
  { name: 'FRED Module Datasheet — MFR Series',               desc: 'Fast recovery epitaxial diode module data.',                                            category: 'Datasheets',        series: 'MFR',   lang: 'EN',    size: '1.4 MB', date: '2023-11', iconBg: 'bg-blue-50',   iconColor: 'text-blue-500' },
  { name: 'IGBT Discrete Datasheet — TO-247 Series',          desc: 'Single-chip IGBT discrete specifications in TO-247 and TO-247 Plus packages.',          category: 'Datasheets',        series: 'TO-247',lang: 'EN',    size: '1.2 MB', date: '2024-01', iconBg: 'bg-blue-50',   iconColor: 'text-blue-500' },
  { name: 'Diode Discrete Datasheet — DO-series',             desc: 'Diode discrete specifications across DO-201, DO-213, and SMB packages.',                category: 'Datasheets',        series: 'DO',    lang: 'EN',    size: '0.9 MB', date: '2023-10', iconBg: 'bg-blue-50',   iconColor: 'text-blue-500' },
  { name: 'IGBT Gate Drive Application Note',                 desc: 'Best practices for IGBT gate drive design, deadtime, and protection.',                   category: 'Application Notes', series: 'MMI',   lang: 'EN',    size: '1.2 MB', date: '2024-03', iconBg: 'bg-purple-50', iconColor: 'text-purple-500' },
  { name: 'EV Charging Station Design Guide',                 desc: 'Reference design for AC/DC and DC/DC converters in EV charging stations.',              category: 'Application Notes', series: 'MSC',   lang: 'EN',    size: '4.5 MB', date: '2024-02', iconBg: 'bg-purple-50', iconColor: 'text-purple-500' },
  { name: 'Motor Drive Design Reference',                     desc: 'Three-phase inverter design guide for industrial motor drives.',                         category: 'Application Notes', series: 'MMI',   lang: 'EN/ZH', size: '2.7 MB', date: '2024-01', iconBg: 'bg-purple-50', iconColor: 'text-purple-500' },
  { name: 'Induction Heating Application Note',               desc: 'High-frequency IGBT selection and drive circuit for induction heating systems.',        category: 'Application Notes', series: 'MMI',   lang: 'EN',    size: '1.9 MB', date: '2023-12', iconBg: 'bg-purple-50', iconColor: 'text-purple-500' },
  { name: 'UPS Inverter Design Guide',                        desc: 'IGBT and diode selection guide for single and three-phase UPS systems.',                 category: 'Application Notes', series: 'MBR',   lang: 'EN',    size: '2.1 MB', date: '2023-11', iconBg: 'bg-purple-50', iconColor: 'text-purple-500' },
  { name: 'AEO Certification',                                desc: 'Authorized Economic Operator certificate for customs compliance.',                       category: 'Certifications',    series: '—',     lang: 'EN/ZH', size: '0.5 MB', date: '2024-01', iconBg: 'bg-green-50',  iconColor: 'text-green-600' },
  { name: 'ISO 9001:2015 Certificate',                        desc: 'Quality management system certification.',                                               category: 'Certifications',    series: '—',     lang: 'EN',    size: '0.4 MB', date: '2023-06', iconBg: 'bg-green-50',  iconColor: 'text-green-600' },
  { name: 'RoHS Compliance Declaration',                      desc: 'Restriction of Hazardous Substances compliance for all product lines.',                  category: 'Certifications',    series: 'All',   lang: 'EN',    size: '0.3 MB', date: '2024-03', iconBg: 'bg-green-50',  iconColor: 'text-green-600' },
  { name: 'EFF Company Brochure 2024',                        desc: 'Corporate overview, product portfolio and partnership information.',                     category: 'Brochures',         series: 'All',   lang: 'EN/ZH', size: '5.2 MB', date: '2024-02', iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
  { name: 'MacMic Product Catalog 2024',                      desc: 'Full MacMic product catalog including modules, discretes and accessories.',              category: 'Brochures',         series: 'All',   lang: 'EN',    size: '8.1 MB', date: '2024-01', iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
  { name: 'Dynex High Power Product Catalog',                 desc: 'Press-pack and high power module range from Dynex Semiconductor.',                      category: 'Brochures',         series: 'All',   lang: 'EN',    size: '6.4 MB', date: '2023-09', iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
  { name: 'EFF Product Selection Tool (Windows)',             desc: 'Desktop application for product selection by specification.',                            category: 'Software',          series: 'All',   lang: 'EN/ZH', size: '18 MB',  date: '2024-04', iconBg: 'bg-gray-100',  iconColor: 'text-gray-500' },
  { name: 'IGBT Thermal Calculator (Excel)',                  desc: 'Spreadsheet tool for thermal resistance and junction temperature calculation.',          category: 'Software',          series: 'MMI',   lang: 'EN',    size: '0.8 MB', date: '2024-03', iconBg: 'bg-gray-100',  iconColor: 'text-gray-500' },
]

const filteredFiles = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return files.filter(f => {
    const matchesCat = activeCategory.value === 'All' || f.category === activeCategory.value
    const matchesSearch = !q || f.name.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q) || f.series.toLowerCase().includes(q)
    return matchesCat && matchesSearch
  })
})
</script>
