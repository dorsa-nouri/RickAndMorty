<script setup lang="ts">
import type { Character } from "~/types/character";
import CharacterStatus from "./CharacterStatus.vue";

defineProps<{
  character: Character;
}>();
</script>

<template>
  <NuxtLink
    :to="`/characters/${character.id}`"
    class="block overflow-clip rounded-[16px] border border-transparent transition-colors duration-200 hover:border-[#404244]"
  >
    <img
      :src="character.image"
      :alt="character.name"
      width="300"
      height="300"
      class="mx-auto aspect-square w-full max-w-[352px] rounded-[8px] object-cover p-4"
    />
    <div class="mb-2 px-4 text-left">
      <h2 class="mb-2 text-lg font-bold text-white">
        {{ character.name }}
      </h2>

      <div class="flex items-center gap-2 text-sm text-white">
        <CharacterStatus :status="character.status" />

        <span>{{ character.status }}-{{ character.species }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
