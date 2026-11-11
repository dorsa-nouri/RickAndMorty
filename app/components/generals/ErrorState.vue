<script setup lang="ts">
defineProps<{
  message: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  retry: [];
  clear: [];
}>();
</script>

<template>
  <div
    class="rounded-2xl border border-red-400/20 bg-black/10 px-6 py-12 text-center"
    role="alert"
  >
    <h2 class="text-lg font-semibold text-white">
      Something went wrong
    </h2>

    <p class="mt-2 text-sm text-slate-300">
      {{ message }}
    </p>

    <button
      type="button"
      class="mt-5 rounded-lg bg-lime-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
      :disabled="loading"
      @click="emit('retry')"
    >
      {{ loading ? "Retrying..." : "Try again" }}
    </button>

        <button
      type="button"
      class="mt-5 ml-5 rounded-lg bg-lime-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
      :disabled="loading"
      @click="emit('clear')"
    >
     Clear Search
    </button>
  </div>
</template>