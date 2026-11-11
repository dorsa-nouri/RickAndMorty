<script setup lang="ts">
import type { Character } from "~/types/character";

defineProps<{
  status: Character["status"];
}>();

const statusStyles = {
  Alive: "bg-brand-green",
  Dead: "bg-brand-red",
  unknown: "bg-gray-400",
} as const;
</script>

<template>
  <div class="inline-flex items-center gap-2">
    <span
      class="h-2.5 w-2.5 rounded-full"
      :class="statusStyles[status]"
      aria-hidden="true"
    />
  </div>
</template>
