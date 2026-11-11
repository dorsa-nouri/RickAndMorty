
<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "grid" | "detail";
  }>(),
  {
    variant: "grid",
  },
);
</script>

<template>
  <div
    v-if="variant === 'grid'"
    class="grid grid-cols-2 gap-4 py-8 sm:grid-cols-3 lg:grid-cols-4"
    role="status"
    aria-label="Loading characters"
  >
    <div
      v-for="n in 8"
      :key="n"
      class="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03]"
      aria-hidden="true"
    >
      <div class="aspect-square animate-pulse bg-white/[0.06]"></div>

      <div class="space-y-3 p-4">
        <div class="h-4 w-3/4 animate-pulse rounded bg-white/10"></div>
        <div class="h-3 w-1/2 animate-pulse rounded bg-white/5"></div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="animate-pulse overflow-hidden rounded-xl bg-brand-gray"
    role="status"
    aria-label="Loading character details"
  >
    <!-- Character header -->
    <div
      class="flex flex-col gap-6 bg-gradient-to-r from-brand-silver to-black p-6 sm:flex-row sm:items-center sm:px-10"
      aria-hidden="true"
    >
      <div
        class="aspect-square w-full rounded-xl bg-brand-light-gray sm:w-[300px] sm:shrink-0"
      ></div>

      <div class="flex-1 space-y-4">
        <div class="h-7 w-3/4 max-w-xs rounded bg-brand-light-gray"></div>
        <div class="h-4 w-36 rounded bg-brand-light-gray"></div>
      </div>
    </div>

    <!-- Episodes and locations -->
    <div class="space-y-12 p-6 sm:p-10" aria-hidden="true">
      <section>
        <div class="mb-6 flex items-center gap-3">
          <div class="h-6 w-6 rounded bg-brand-light-gray"></div>
          <div class="h-6 w-28 rounded bg-brand-light-gray"></div>
        </div>

        <div class="flex flex-wrap gap-4">
          <div
            v-for="n in 3"
            :key="`episode-${n}`"
            class="w-full max-w-[262px] space-y-3 rounded-2xl bg-brand-light-gray p-4"
          >
            <div class="h-5 w-4/5 rounded bg-brand-caption-gray/30"></div>
            <div class="h-4 w-20 rounded bg-brand-caption-gray/30"></div>
            <div class="h-4 w-28 rounded bg-brand-caption-gray/30"></div>
          </div>
        </div>
      </section>

      <section>
        <div class="mb-6 flex items-center gap-3">
          <div class="h-6 w-6 rounded bg-brand-light-gray"></div>
          <div class="h-6 w-28 rounded bg-brand-light-gray"></div>
        </div>

        <div class="flex flex-wrap gap-4">
          <div
            v-for="n in 2"
            :key="`location-${n}`"
            class="w-full max-w-[262px] space-y-3 rounded-2xl bg-brand-light-gray p-4"
          >
            <div class="h-5 w-3/5 rounded bg-brand-caption-gray/30"></div>
            <div class="h-4 w-4/5 rounded bg-brand-caption-gray/30"></div>
            <div class="h-4 w-2/3 rounded bg-brand-caption-gray/30"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
