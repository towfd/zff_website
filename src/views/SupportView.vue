<template>
  <div>
    <!-- Hero -->
    <section class="relative w-full min-h-[300px] flex items-center bg-gray-900 overflow-hidden">
      <img src="@/assets/index/hero_img.png" alt="Support" class="absolute inset-0 w-full h-full object-cover opacity-20" />
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <p class="text-[#8dc63f] text-sm font-semibold mb-3">Support</p>
        <h1 class="text-white text-4xl lg:text-5xl font-extrabold uppercase leading-tight mb-4">
          How Can We Help?
        </h1>
        <p class="text-gray-300 text-base max-w-xl">
          Our team is ready to provide technical support, quotations, and product guidance.
        </p>
      </div>
    </section>

    <!-- Tabs -->
    <div class="w-full">
      <!-- Tab headers -->
      <div class="flex border-b border-gray-200 bg-white px-6 lg:px-16">
        <button
          @click="activeTab = 'contact'"
          :class="[
            'px-6 py-4 text-sm font-bold tracking-wide transition-colors border-b-2 -mb-px',
            activeTab === 'contact'
              ? 'border-[#8dc63f] text-[#8dc63f]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          ]"
        >
          Contact Us
        </button>
        <button
          @click="activeTab = 'downloads'"
          :class="[
            'px-6 py-4 text-sm font-bold tracking-wide transition-colors border-b-2 -mb-px',
            activeTab === 'downloads'
              ? 'border-[#8dc63f] text-[#8dc63f]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          ]"
        >
          Download Center
        </button>
        <button
          @click="activeTab = 'faq'"
          :class="[
            'px-6 py-4 text-sm font-bold tracking-wide transition-colors border-b-2 -mb-px',
            activeTab === 'faq'
              ? 'border-[#8dc63f] text-[#8dc63f]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          ]"
        >
          FAQ
        </button>
      </div>

      <!-- Tab: Contact Us -->
      <section v-show="activeTab === 'contact'" id="contact" class="bg-gray-50 py-20 px-6 lg:px-8 scroll-mt-20">
      <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div>
          <p class="text-[#8dc63f] text-sm font-semibold mb-3">Get In Touch</p>
          <h2 class="text-3xl font-extrabold text-gray-900 mb-6">Contact Us</h2>
          <p class="text-gray-500 text-sm leading-relaxed mb-10">
            Have a question about our products or need a quotation? Fill in the form and our team will get back to you within one business day.
          </p>
          <div class="flex flex-col gap-6">
            <div v-for="info in contactInfo" :key="info.label" class="flex items-start gap-4">
              <div class="w-10 h-10 bg-[#8dc63f]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-5 h-5 text-[#8dc63f]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="info.icon" />
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{{ info.label }}</p>
                <p class="text-gray-800 text-sm font-medium">{{ info.value }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-sm border border-gray-100 shadow-sm p-8">
          <h3 class="text-lg font-bold text-gray-900 mb-6">Send Us a Message</h3>
          <form class="flex flex-col gap-4" @submit.prevent="submitForm">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1.5">First Name</label>
                <input v-model="form.firstName" type="text" placeholder="John" class="w-full px-3 py-2.5 border border-gray-200 text-sm text-gray-800 bg-gray-50 outline-none focus:border-[#8dc63f] transition-colors" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1.5">Last Name</label>
                <input v-model="form.lastName" type="text" placeholder="Doe" class="w-full px-3 py-2.5 border border-gray-200 text-sm text-gray-800 bg-gray-50 outline-none focus:border-[#8dc63f] transition-colors" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
              <input v-model="form.email" type="email" placeholder="john@company.com" class="w-full px-3 py-2.5 border border-gray-200 text-sm text-gray-800 bg-gray-50 outline-none focus:border-[#8dc63f] transition-colors" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1.5">Company</label>
              <input v-model="form.company" type="text" placeholder="Your Company" class="w-full px-3 py-2.5 border border-gray-200 text-sm text-gray-800 bg-gray-50 outline-none focus:border-[#8dc63f] transition-colors" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1.5">Subject</label>
              <select v-model="form.subject" class="w-full px-3 py-2.5 border border-gray-200 text-sm text-gray-800 bg-gray-50 outline-none focus:border-[#8dc63f] transition-colors">
                <option value="">Select a topic</option>
                <option>Product Inquiry</option>
                <option>Quotation Request</option>
                <option>Technical Support</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1.5">Message</label>
              <textarea v-model="form.message" rows="4" placeholder="Tell us about your requirements..." class="w-full px-3 py-2.5 border border-gray-200 text-sm text-gray-800 bg-gray-50 outline-none focus:border-[#8dc63f] transition-colors resize-none" />
            </div>
            <button type="submit" class="w-full py-3 bg-[#8dc63f] hover:bg-[#7ab530] text-white font-bold text-sm transition-colors duration-150">
              Send Message
            </button>
          </form>
          <p v-if="submitted" class="text-[#8dc63f] text-sm font-semibold mt-4 text-center">Thank you! We'll be in touch soon.</p>
        </div>
      </div>
    </section>

      <!-- Tab: Download Center -->
      <section v-show="activeTab === 'downloads'" id="download-center" class="bg-white py-20 px-6 lg:px-8 scroll-mt-20">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-14">
          <p class="text-[#8dc63f] text-sm font-semibold mb-3">Resources</p>
          <h2 class="text-3xl font-extrabold text-gray-900">Download Center</h2>
          <p class="text-gray-500 text-sm mt-4 max-w-md mx-auto">
            Access datasheets, application notes, certifications, and other technical documents.
          </p>
        </div>
        <div class="flex flex-wrap gap-2 justify-center mb-10">
          <button
            v-for="cat in downloadCategories"
            :key="cat"
            class="px-4 py-1.5 text-xs font-semibold border rounded-full transition-colors duration-150"
            :class="activeDownloadCat === cat
              ? 'bg-[#8dc63f] text-white border-[#8dc63f]'
              : 'bg-white text-gray-600 border-gray-300 hover:border-[#8dc63f] hover:text-[#8dc63f]'"
            @click="activeDownloadCat = cat"
          >
            {{ cat }}
          </button>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="file in filteredDownloads"
            :key="file.name"
            class="bg-gray-50 border border-gray-100 rounded-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div class="w-10 h-10 bg-red-50 rounded flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-800 truncate group-hover:text-[#8dc63f] transition-colors">{{ file.name }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ file.category }} · {{ file.size }}</p>
            </div>
            <svg class="w-4 h-4 text-gray-400 group-hover:text-[#8dc63f] transition-colors flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
        </div>
      </div>
    </section>

      <!-- Tab: FAQ -->
      <section v-show="activeTab === 'faq'" class="bg-gray-50 py-20 px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-14">
          <p class="text-[#8dc63f] text-sm font-semibold mb-3">FAQ</p>
          <h2 class="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          <p class="text-gray-500 text-sm mt-4 max-w-md mx-auto">
            Quick answers to the most common questions about our products and services.
          </p>
        </div>
        <div class="flex flex-col gap-3">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm"
          >
            <button
              class="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-gray-50 transition-colors duration-150"
              @click="toggleFaq(i)"
            >
              <span class="text-sm font-bold text-gray-900 leading-snug">{{ faq.q }}</span>
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-[#8dc63f]/10 flex items-center justify-center transition-transform duration-200" :class="openFaq === i ? 'rotate-45' : ''">
                <svg class="w-3.5 h-3.5 text-[#8dc63f]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <Transition name="faq">
              <div v-if="openFaq === i" class="px-6 pb-6">
                <div class="w-8 h-0.5 bg-[#8dc63f] mb-4" />
                <p class="text-sm text-gray-600 leading-relaxed">{{ faq.a }}</p>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Still have questions CTA -->
        <div class="mt-12 text-center bg-white border border-gray-100 rounded-sm p-8 shadow-sm">
          <p class="text-sm font-semibold text-gray-700 mb-2">Still have questions?</p>
          <p class="text-xs text-gray-400 mb-6">Our technical team is happy to help with any specific enquiries.</p>
          <a href="#contact" class="inline-block px-6 py-2.5 bg-[#8dc63f] hover:bg-[#7ab530] text-white text-sm font-bold transition-colors duration-150 rounded-full">
            Contact Us
          </a>
        </div>
      </div>
      </section>

    </div><!-- end tabs -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('contact')

const contactInfo = [
  { label: 'Phone',   value: '+886-2-1234-5678',        icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
  { label: 'Email',   value: 'info@efficient-intl.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { label: 'Address', value: 'Taipei, Taiwan, R.O.C.',  icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z' },
]

const form = ref({ firstName: '', lastName: '', email: '', company: '', subject: '', message: '' })
const submitted = ref(false)
const submitForm = () => {
  submitted.value = true
  form.value = { firstName: '', lastName: '', email: '', company: '', subject: '', message: '' }
}

const downloadCategories = ['All', 'Datasheets', 'Application Notes', 'Certifications', 'Brochures']
const activeDownloadCat = ref('All')

const downloads = [
  { name: 'IGBT Module Datasheet — MMI Series',         category: 'Datasheets',        size: '2.3 MB' },
  { name: 'Rectifier Module Datasheet — MBR Series',    category: 'Datasheets',        size: '1.8 MB' },
  { name: 'SiC MOSFET Module Datasheet',                category: 'Datasheets',        size: '3.1 MB' },
  { name: 'IGBT Gate Drive Application Note',           category: 'Application Notes', size: '1.2 MB' },
  { name: 'EV Charging Station Design Guide',           category: 'Application Notes', size: '4.5 MB' },
  { name: 'Motor Drive Design Reference',               category: 'Application Notes', size: '2.7 MB' },
  { name: 'AEO Certification',                          category: 'Certifications',    size: '0.5 MB' },
  { name: 'ISO 9001:2015 Certificate',                  category: 'Certifications',    size: '0.4 MB' },
  { name: 'EFF Company Brochure 2024',                  category: 'Brochures',         size: '5.2 MB' },
  { name: 'MacMic Product Catalog',                     category: 'Brochures',         size: '8.1 MB' },
  { name: 'SCR Module Datasheet',                       category: 'Datasheets',        size: '1.6 MB' },
  { name: 'Induction Heating Application Note',         category: 'Application Notes', size: '1.9 MB' },
]

const filteredDownloads = computed(() => {
  if (activeDownloadCat.value === 'All') return downloads
  return downloads.filter(d => d.category === activeDownloadCat.value)
})

const openFaq = ref(null)
const toggleFaq = (i) => { openFaq.value = openFaq.value === i ? null : i }

const faqs = [
  {
    q: 'What types of power semiconductor modules does MacMic offer?',
    a: 'MacMic offers a comprehensive range including IGBT modules, SiC MOSFET modules, rectifier modules, FRED modules, SCR modules, and discrete devices. Our portfolio covers voltage ratings from 600V to 3300V and current ratings from a few amps up to several hundred amps.',
  },
  {
    q: 'How do I request a quotation for a specific product?',
    a: 'You can request a quotation directly through the Quotation button on any product page, or by filling out the Contact form on this page. Our sales team will respond within one business day with pricing and lead-time information.',
  },
  {
    q: 'Do you provide samples for evaluation?',
    a: 'Yes, engineering samples are available for most products in our portfolio. Please submit a quotation request or contact us directly, specifying the product part number and your intended application. Sample requests are evaluated on a case-by-case basis.',
  },
  {
    q: 'What is the typical lead time for orders?',
    a: 'Standard lead times range from 8 to 16 weeks depending on the product and order volume. Stock items may be available for immediate shipment. Please contact our sales team for the most up-to-date availability information.',
  },
  {
    q: 'Are your products RoHS and AEC-Q101 compliant?',
    a: 'All standard products in the MacMic portfolio are RoHS compliant. Select SiC MOSFET module series are AEC-Q101 qualified for automotive applications. Compliance documentation is available in the Download Center or upon request.',
  },
  {
    q: 'Can you support custom or non-standard configurations?',
    a: 'Yes, we work closely with customers on customised solutions including modified packages, special current/voltage ratings, and custom labelling. Please reach out to our engineering team with your requirements and we will assess feasibility.',
  },
  {
    q: 'What technical documentation is available?',
    a: 'Our Download Center provides datasheets, application notes, gate drive design guides, thermal management guides, and certification documents. If you cannot find the document you need, please contact our technical support team.',
  },
]
</script>

<style scoped>
.faq-enter-active, .faq-leave-active { transition: opacity 0.15s ease, max-height 0.2s ease; max-height: 200px; overflow: hidden; }
.faq-enter-from, .faq-leave-to { opacity: 0; max-height: 0; }
</style>
