<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="$emit('update:modelValue', false)"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50" @click="$emit('update:modelValue', false)" />

        <!-- Panel -->
        <div class="relative z-10 bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">

          <!-- Header -->
          <div class="sticky top-0 bg-white border-b border-gray-200 px-8 py-5 flex items-start justify-between z-10">
            <div>
              <p class="text-[#8dc63f] text-sm font-semibold mb-1">Quotation</p>
              <h2 class="text-2xl font-extrabold text-gray-900">Get a Quotation</h2>
              <p class="text-xs text-gray-500 mt-1">
                <span class="font-bold text-gray-700">Best Cost Performance</span>
                – We provide price competitive products that help our customers to easily meet their price performance targets
              </p>
            </div>
            <button
              @click="$emit('update:modelValue', false)"
              class="ml-4 mt-1 flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              aria-label="Close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Form -->
          <div class="px-8 py-6">
            <QuotationForm @submitted="onSubmitted" />
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import QuotationForm from './QuotationForm.vue'

defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])

const onSubmitted = (data) => {
  console.log('Quotation submitted:', data)
  emit('update:modelValue', false)
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.25s ease;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: translateY(-16px);
}
</style>
