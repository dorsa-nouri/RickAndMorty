import { computed, type Ref } from "vue";
import { useCharacterService } from "~/services/character.service";

export const useCharacters = () => {
  const service = useCharacterService();

  const getCharacters = (query: Ref<{ page: number; name: string }>) => {
    return useAsyncData(
      "characters",
      (_nuxtApp, { signal }) =>
        service.getCharacters(query.value.page, query.value.name, signal),
      {
        watch: [query],
      },
    );
  };

  const getCharacter = (id: string | number) => {
    return useAsyncData(`character-${id}`, () => service.getCharacterById(id));
  };

  const getEpisodes = (ids: Ref<(string | number)[]>) => {
    return useAsyncData(
      computed(() => `episodes-${ids.value.join(",")}`),
      () => service.getEpisodesByIds(ids.value),
    );
  };

  const getLocations = (ids: Ref<(string | number)[]>) =>
    useAsyncData(
      computed(() => `locations-${ids.value.join(",")}`),
      () => service.getLocationsByIds(ids.value),
    );

  return {
    getCharacters,
    getCharacter,
    getEpisodes,
    getLocations,
  };
};
