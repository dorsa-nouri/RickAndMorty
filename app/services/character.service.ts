import type { Character, CharacterResponse, Episode ,Location } from "~/types/character";

export const useCharacterService = () => {
  const config = useRuntimeConfig();

  const getCharacters = (page = 1, name = "") =>
    $fetch<CharacterResponse>(`${config.public.apiBase}/character`, {
      query: {
        page,
        ...(name.trim() ? { name: name.trim() } : {}),
      },
    });

  const getCharacterById = (id: string | number) =>
    $fetch<Character>(`${config.public.apiBase}/character/${id}`);

  const getEpisodesByIds = async (
    ids: (string | number)[],
  ): Promise<Episode[]> => {
    if (!ids.length) return [];

    const response = await $fetch<Episode | Episode[]>(
      `${config.public.apiBase}/episode/${ids.join(",")}`,
    );

    return Array.isArray(response) ? response : [response];
  };

  const getLocationsByIds = async (
    ids: (string | number)[],
  ): Promise<Location[]> => {
    const uniqueIds = [...new Set(ids)];

    if (!uniqueIds.length) return [];

    const response = await $fetch<Location | Location[]>(
      `${config.public.apiBase}/location/${uniqueIds.join(",")}`,
    );

    return Array.isArray(response) ? response : [response];
  };

  return {
    getCharacters,
    getCharacterById,
    getEpisodesByIds,
    getLocationsByIds,
  };
};
