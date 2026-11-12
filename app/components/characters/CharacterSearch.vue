<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { useDebounceFn } from "@vueuse/core";

const props = defineProps<{
  loading?: boolean;
  resetKey?: number;
  initialValue?: string;
}>();

const emit = defineEmits<{
  search: [value: string];
}>();

const search = ref(props.initialValue ?? "");
const isFocused = ref(false);

const debouncedSearch = useDebounceFn(() => {
  emit("search", search.value.trim());
}, 500);

const handleInput = () => {
  debouncedSearch();
};

const handleSearch = () => {
  debouncedSearch.cancel();
  emit("search", search.value.trim());
};

watch(
  () => props.initialValue,
  (value) => {
    if (isFocused.value) return;

    search.value = value ?? "";
    debouncedSearch.cancel();
  },
  { immediate: true },
);

watch(
  () => props.resetKey,
  () => {
    search.value = "";
    debouncedSearch.cancel();
  },
);

onBeforeUnmount(() => debouncedSearch.cancel());
</script>

<template>
  <form
    class="flex w-full items-center gap-3 rounded-lg bg-brand-silver p-[10px]"
    @submit.prevent="handleSearch"
  >
    <input
      id="character-search"
      v-model="search"
      type="search"
      autocomplete="off"
      placeholder="Search for characters..."
      class="h-8 min-w-1 flex-1 rounded-sm border border-transparent bg-brand-light-gray px-3 text-xs text-white outline-none transition-colors placeholder:text-gray-300 focus:border-brand-lime"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="handleInput"
    />

    <button
      type="submit"
      :disabled="loading"
      class="flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-sm bg-brand-lime px-3 text-xs font-medium text-brand-gray transition-colors hover:bg-brand-lime-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <svg
        v-if="!loading"
        class="h-3 w-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 4 4" />
      </svg>

      <span class="hidden md:inline" aria-label="Search characters">
        {{ loading ? "Searching..." : "Search" }}
      </span>
    </button>
  </form>
</template>
