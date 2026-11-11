<script setup lang="ts">
import type { Character } from "~/types/character";
import CharacterInfoCard from "./CharacterInfoCard.vue";
import Loading from "../generals/Loading.vue";

const props = defineProps<{
  character: Character;
}>();

const { getEpisodes, getLocations } = useCharacters();

// episodes

const episodeIds = computed(() =>
  props.character.episode
    .map((url) => Number(url.split("/").pop()))
    .filter((id) => Number.isInteger(id) && id > 0),
);
const {
  data: episodes,
  pending: episodesPending,
  error: episodesError,
} =  getEpisodes(episodeIds);

// locations

const locationIds = computed(() =>
  [props.character.origin.url, props.character.location.url]
    .filter(Boolean)
    .map((url) => Number(url.split("/").pop()))
    .filter((id) => Number.isInteger(id) && id > 0),
);

const {
  data: locations,
  pending: locationsPending,
  error: locationsError,
} =  getLocations(locationIds);
</script>

<template>
  <div class="px-4 py-8 sm:px-6 lg:px-8 mx-auto w-[95%] md:w-[90%]">
    <!-- Episodes -->
    <section class="mb-10">
      <h2 class="mb-4 flex items-center gap-3 text-base font-bold text-white">
        <img src="/icons/featured_play_list.svg" alt="Episode" />
        Episodes
      </h2>

      <!-- Loading -->
      <Loading v-if="episodesPending" />

      <!-- Error -->
      <div
        v-else-if="episodesError"
        class="rounded-xl border border-red-500/30 bg-red-500/10 p-5"
      >
        <p class="font-medium text-red-400">Failed to load episodes.</p>
        <p class="mt-1 text-sm text-gray-400">
          Something went wrong while fetching episode details. Please try again
          later.
        </p>
      </div>

      <!-- Empty -->
      <p
        v-else-if="!episodes?.length"
        class="rounded-xl bg-brand-silver p-5 text-sm text-gray-400"
      >
        No episodes found for this character.
      </p>

      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <CharacterInfoCard
          v-for="episode in episodes"
          :key="episode.id"
          :title="episode.name"
          :subtitle="episode.episode"
          :meta="episode.air_date"
        />
      </div>
    </section>

    <!-- Locations -->
    <section>
      <h2 class="mb-4 flex items-center gap-3 text-base font-bold text-white">
        <img src="/icons/location_on.svg" alt="Location" />
        Locations
      </h2>

      <!-- Loading -->
      <Loading v-if="locationsPending" />

      <!-- Error -->
      <div
        v-else-if="locationsError"
        class="rounded-xl border border-red-500/30 bg-red-500/10 p-5"
      >
        <p class="font-medium text-red-400">Failed to load locations.</p>
        <p class="mt-1 text-sm text-gray-400">
          Something went wrong while fetching location details. Please try again
          later.
        </p>
      </div>

      <!-- Empty -->
      <p
        v-else-if="!locations?.length"
        class="rounded-xl bg-brand-silver p-5 text-sm text-gray-400"
      >
        No locations found for this character.
      </p>

      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <CharacterInfoCard
          v-for="location in locations"
          :key="location.id"
          :title="location.name"
          :subtitle="location.type"
          :meta="location.dimension"
        />
      </div>
    </section>
  </div>
</template>
