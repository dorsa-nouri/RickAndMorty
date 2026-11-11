<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  page: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  "update:page": [page: number];
}>();

const visiblePages = computed(() => {
  const total = props.totalPages;
  const current = props.page;

  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (current >= total - 2) {
    return Array.from({ length: 5 }, (_, i) => total - 4 + i);
  }

  return [current - 2, current - 1, current, current + 1, current + 2];
});

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages || page === props.page) return;
  emit("update:page", page);
};
</script>

<template>
  <nav
    v-if="totalPages > 1"
    aria-label="Character pagination"
    class="flex w-full items-center justify-center overflow-x-auto py-4"
  >
    <div class="flex shrink-0 items-center gap-2">
      <button
        type="button"
        aria-label="First page"
        :disabled="page === 1"
        class="text-gray-500 transition hover:text-brand-lime disabled:cursor-not-allowed disabled:opacity-40"
        @click="goToPage(1)"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          class="h-4 w-4 sm:h-6 sm:w-6"
          stroke="currentColor"
          stroke-width="3"
        >
          <path d="m15 5-7 7 7 7M22 5l-7 7 7 7" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Previous page"
        :disabled="page === 1"
        class="text-gray-500 transition hover:text-brand-lime disabled:cursor-not-allowed disabled:opacity-40"
        @click="goToPage(page - 1)"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          class="h-4 w-4 sm:h-6 sm:w-6"
          stroke="currentColor"
          stroke-width="3"
        >
          <path d="m15 5-7 7 7 7" />
        </svg>
      </button>

      <button
        v-for="number in visiblePages"
        :key="number"
        type="button"
        :aria-label="`Page ${number}`"
        :aria-current="page === number ? 'page' : undefined"
        class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-md font-bold transition sm:h-8 sm:w-8"
        :class="
          page === number
            ? 'bg-brand-lime text-brand-gray'
            : 'text-brand-caption-gray hover:text-white'
        "
        @click="goToPage(number)"
      >
        {{ number }}
      </button>

      <span
        v-if="page < totalPages - 2"
        class="px-1 text-xs font-bold text-brand-caption-gray sm:text-md"
        aria-hidden="true"
      >
        ...
      </span>

      <button
        type="button"
        aria-label="Next page"
        :disabled="page === totalPages"
        class="text-brand-caption-gray transition hover:text-brand-lime disabled:cursor-not-allowed disabled:opacity-40"
        @click="goToPage(page + 1)"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          class="h-4 w-4 sm:h-6 sm:w-6"
          stroke="currentColor"
          stroke-width="3"
        >
          <path d="m9 5 7 7-7 7" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Last page"
        :disabled="page === totalPages"
        class="text-brand-caption-gray transition hover:text-brand-lime disabled:cursor-not-allowed disabled:opacity-40"
        @click="goToPage(totalPages)"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          class="h-4 w-4 sm:h-6 sm:w-6"
          stroke="currentColor"
          stroke-width="3"
        >
          <path d="m2 5 7 7-7 7m7-14 7 7-7 7" />
        </svg>
      </button>
    </div>
  </nav>
</template>
