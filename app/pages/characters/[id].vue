<script setup lang="ts">
import { useCharacters } from "~/composables/useCharacters";
import CharacterDetails from "~/components/characters/CharacterDetails.vue";
import AppHeader from "~/components/generals/AppHeader.vue";
import Loading from "~/components/generals/Loading.vue";
import CharacterStatus from "~/components/characters/CharacterStatus.vue";

const route = useRoute();
const id = computed(() => String(route.params.id));

const { getCharacter } = useCharacters();

const { data: character, pending, error } = await getCharacter(id.value);

if (error.value || !character.value) {
  if (error.value?.status === 404)
    throw createError({
      statusCode: 404,
      statusMessage: "Character not found",
      fatal: true,
    });
  else
    throw createError({
      statusCode: 500,
      statusMessage: "Server is not Awake",
      fatal: true,
    });
}
</script>

<template>
  <div class="min-h-screen w-full overflow-hidden text-white">
    <Loading v-if="pending" variant="detail" />

    <template v-else-if="character">
      <AppHeader>
        <template #title>
          <div
            class="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <img
              :src="character.image"
              :alt="character.name"
              width="240"
              height="240"
              class="aspect-square w-full max-w-[240px] shrink-0 rounded-[8px] object-cover"
            />

            <div class="min-w-0">
              <h2 class="mb-2 text-lg font-bold text-white">
                {{ character.name }}
              </h2>

              <div class="flex flex-wrap items-center gap-2 text-sm text-white">
                <CharacterStatus :status="character.status" />

                <span>{{ character.status }}-{{ character.species }}</span>
              </div>
            </div>
          </div>
        </template>
      </AppHeader>
      <CharacterDetails :character="character" />
    </template>
  </div>
</template>
