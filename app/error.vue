<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  error: {
    statusCode?: number;
    statusMessage?: string;
    message?: string;
    data?: {
      statusMessage?: string;
      message?: string;
    };
  };
}>();

const statusCode = computed(() => props.error.statusCode || 500);

const isNotFound = computed(() => statusCode.value === 404);

const title = computed(() => {
  if (isNotFound.value) return "Wrong Dimension!";
  if (statusCode.value === 403) return "Access Denied!";
  if (statusCode.value >= 500) return "Something Went Wrong!";
  return "Oops! Something Happened";
});

const description = computed(() => {
  if (isNotFound.value) {
    return "Looks like this dimension doesn't exist. The page you're looking for is lost in the multiverse.";
  }

  if (statusCode.value === 403) {
    return "You don't have permission to enter this dimension.";
  }

  if (statusCode.value >= 500) {
    return "Our portal is having a little trouble. Please try again in a moment.";
  }

  return "An unexpected interdimensional event occurred. Let's get you back on track.";
});

const clearErrorAndGoHome = async () => {
  await clearError({ redirect: "/" });
};
</script>

<template>
  <main
    class="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-brand-gray px-6 py-12 text-white"
  >
    <!-- Background glow -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -left-20 top-10 -z-10 h-64 w-64 rounded-full bg-brand-lime/20 blur-[100px]"
    ></div>

    <div
      aria-hidden="true"
      class="pointer-events-none absolute -bottom-20 -right-20 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[110px]"
    ></div>

    <section class="w-full max-w-xl text-center">
      <NuxtLink
        to="/"
        aria-label="Rick and Morty home"
        class="mb-10 inline-block"
        @click.prevent="clearErrorAndGoHome"
      >
        <img
          src="/images/rickAndMortyLogo.webp"
          alt="Rick and Morty"
          width="200"
          height="100"
          class="mx-auto h-auto w-[200px] object-contain"
        />
      </NuxtLink>

      <div
        class="relative mx-auto mb-6 flex h-36 w-36 items-center justify-center rounded-full border border-brand-lime/30 bg-brand-lime/5 shadow-[0_0_60px_rgba(178,223,40,0.08)]"
      >
        <div
          class="absolute inset-3 rounded-full border border-dashed border-brand-lime/20"
        ></div>

        <span class="text-5xl font-bold tracking-tight text-brand-lime">
          {{ statusCode }}
        </span>
      </div>

      <p
        class="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-lime"
      >
        Interdimensional Error
      </p>

      <h1 class="mb-4 text-3xl font-bold sm:text-4xl">
        {{ title }}
      </h1>

      <p
        class="mx-auto mb-8 max-w-md text-sm leading-7 text-gray-400 sm:text-base"
      >
        {{ description }}
      </p>

      <div class="flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          class="rounded-lg bg-brand-lime px-6 py-3 text-sm font-bold text-brand-gray transition hover:bg-brand-lime/80 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:ring-offset-2 focus:ring-offset-brand-gray"
          @click="clearErrorAndGoHome"
        >
          Back to Home
        </button>
      </div>
    </section>
  </main>
</template>
