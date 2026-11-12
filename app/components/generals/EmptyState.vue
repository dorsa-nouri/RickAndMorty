<script setup lang="ts">
const clearErrorAndGoHome = async () => {
  await clearError({ redirect: "/" });
};
</script>

<template>
  <div
    class="rounded-2xl border border-white/10 bg-black/10 px-6 py-16 text-center"
  >
    <div class="mb-4 text-4xl" aria-hidden="true">🛸</div>

    <h2 class="text-xl mb-5 font-bold">Lost in another dimension?</h2>
    <button
      type="button"
      class="rounded-lg bg-brand-lime px-6 py-3 text-sm font-bold text-brand-gray transition hover:bg-brand-lime/80 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:ring-offset-2 focus:ring-offset-brand-gray"
      @click="clearErrorAndGoHome"
    >
      Start Over
    </button>
  </div>
</template>
