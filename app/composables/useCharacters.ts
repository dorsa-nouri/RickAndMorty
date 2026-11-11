import { computed, type Ref } from "vue";
import { useCharacterService } from "~/services/character.service";

export const useCharacters = () => {
  const service = useCharacterService();

  const getCharacters = (query: Ref<{ page: number; name: string }>) => {
    return useAsyncData(
      computed(
        () => `characters-page-${query.value.page}-name-${query.value.name}`,
      ),
      () => service.getCharacters(query.value.page, query.value.name),
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
