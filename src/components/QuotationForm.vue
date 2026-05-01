<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div class="flex flex-col gap-1">
        <label class="text-sm text-gray-700">Full Name*</label>
        <input v-model="form.fullName" type="text" required class="border border-gray-400 px-3 py-2.5 text-sm outline-none focus:border-[#8dc63f] transition-colors" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sm text-gray-700">Company*</label>
        <input v-model="form.company" type="text" required class="border border-gray-400 px-3 py-2.5 text-sm outline-none focus:border-[#8dc63f] transition-colors" />
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div class="flex flex-col gap-1">
        <label class="text-sm text-gray-700">Part Number*</label>
        <input v-model="form.partNumber" type="text" required class="border border-gray-400 px-3 py-2.5 text-sm outline-none focus:border-[#8dc63f] transition-colors" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sm text-gray-700">Quantity*</label>
        <input v-model="form.quantity" type="text" required class="border border-gray-400 px-3 py-2.5 text-sm outline-none focus:border-[#8dc63f] transition-colors" />
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm text-gray-700">Location*</label>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="relative">
          <select v-model="form.city" required class="w-full appearance-none bg-[#8dc63f] text-white px-4 py-2.5 text-sm outline-none cursor-pointer">
            <option value="" disabled selected>City</option>
            <option>Taipei</option>
            <option>Taichung</option>
            <option>Kaohsiung</option>
            <option>Other</option>
          </select>
          <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white text-xs">▼</span>
        </div>
        <div class="relative">
          <select v-model="form.country" required class="w-full appearance-none bg-[#8dc63f] text-white px-4 py-2.5 text-sm outline-none cursor-pointer">
            <option value="" disabled selected>Country</option>
            <option>Taiwan</option>
            <option>Japan</option>
            <option>USA</option>
            <option>Other</option>
          </select>
          <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white text-xs">▼</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div class="flex flex-col gap-1">
        <label class="text-sm text-gray-700">Email Address*</label>
        <input v-model="form.email" type="email" required class="border border-gray-400 px-3 py-2.5 text-sm outline-none focus:border-[#8dc63f] transition-colors" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-sm text-gray-700">Phone Number</label>
        <input v-model="form.phone" type="tel" class="border border-gray-400 px-3 py-2.5 text-sm outline-none focus:border-[#8dc63f] transition-colors" />
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm text-gray-700">Application</label>
      <input v-model="form.application" type="text" placeholder="Type your message..." class="border border-gray-400 px-3 py-2.5 text-sm outline-none focus:border-[#8dc63f] transition-colors placeholder-gray-400" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm text-gray-700">Current used product</label>
      <input v-model="form.currentProduct" type="text" placeholder="Type your message..." class="border border-gray-400 px-3 py-2.5 text-sm outline-none focus:border-[#8dc63f] transition-colors placeholder-gray-400" />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-sm text-gray-700">Message</label>
      <textarea v-model="form.message" rows="4" placeholder="Type your message..." class="border border-gray-400 px-3 py-2.5 text-sm outline-none focus:border-[#8dc63f] transition-colors placeholder-gray-400 resize-none" />
    </div>

    <div>
      <p class="text-xs text-gray-400 mb-3">*require fill</p>
      <div class="flex justify-center">
        <button type="submit" class="px-10 py-2.5 bg-[#8dc63f] hover:bg-[#7ab530] text-white font-semibold text-sm transition-colors">
          Submit
        </button>
      </div>
    </div>

  </form>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submitted'])

const form = reactive({
  fullName: '', company: '', partNumber: '', quantity: '',
  city: '', country: '', email: '', phone: '',
  application: '', currentProduct: '', message: '',
})

const handleSubmit = () => {
  emit('submitted', { ...form })
}
</script>
