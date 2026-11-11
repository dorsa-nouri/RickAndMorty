<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  meta: string;
}>();
</script>

<template>
  <article class="min-w-0 rounded-2xl bg-brand-dirty-blue p-3 max-w-96">
    <h3 class="truncate text-sm font-bold text-white">
      {{ title }}
    </h3>

    <p class="mt-2 truncate text-xs font-medium text-brand-light-blue">
      {{ subtitle }}
    </p>

    <p class="mt-2 truncate text-xs text-brand-caption-gray">
      {{ meta }}
    </p>
  </article>
</template>
