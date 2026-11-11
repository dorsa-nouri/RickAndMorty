<script setup lang="ts">
import type { Character } from '~/types/character'
import CharacterCard from './CharacterCard.vue'

defineProps<{
  characters: Character[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-4">
    <CharacterCard
      v-for="character in characters"
      :key="character.id"
      :character="character"
    />
  </div>
</template>