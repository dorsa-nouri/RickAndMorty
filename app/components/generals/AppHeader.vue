<script setup>
defineProps({
  hideGlowOnMobile: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <header
    class="relative isolate w-full overflow-hidden bg-[linear-gradient(90deg,#2C2E30_-0.76%,#0E0E0E_50%)] px-4 pb-4 sm:px-8 sm:pb-5"
  >
    <div
      aria-hidden="true"
      :class="[
        'pointer-events-none absolute -left-10 top-10 -z-10 h-40 w-52 rounded-full bg-brand-lime blur-[80px] sm:left-[20%] sm:top-1/2 sm:-translate-y-1/2',
        hideGlowOnMobile
          ? 'max-md:hidden'
          : 'max-md:!left-0 max-md:!top-auto max-md:!bottom-0 max-md:!translate-y-0',
      ]"
    ></div>

    <div class="relative mx-auto flex w-[90%] flex-col gap-4">
      <div class="flex w-full items-center justify-start">
        <NuxtLink to="/" aria-label="Rick and Morty home" class="shrink-0">
          <img
            src="/images/rickAndMortyLogo.webp"
            alt="Rick and Morty"
            width="116"
            height="50"
            class="mx-auto h-auto w-[150px] object-contain"
          />
        </NuxtLink>
      </div>

      <div class="w-full">
        <slot name="title"></slot>
        <slot name="search"></slot>
      </div>
    </div>
  </header>
</template>
