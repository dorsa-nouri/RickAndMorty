import type {
  Character,
  CharacterResponse,
  Episode,
  Location,
} from "~/types/character";

const isNotFound = (error: unknown) =>
  typeof error === "object" &&
  error !== null &&
  "statusCode" in error &&
  (error as { statusCode?: number }).statusCode === 404;

export const useCharacterService = () => {
  const config = useRuntimeConfig();

  const getCharacters = async (
    page = 1,
    name = "",
    signal?: AbortSignal,
  ): Promise<CharacterResponse> => {
    try {
      return await $fetch<CharacterResponse>(
        `${config.public.apiBase}/character`,
        {
          signal,
          query: {
            page,
            ...(name.trim() ? { name: name.trim() } : {}),
          },
        },
      );
    } catch (error) {
      if (isNotFound(error)) {
        return {
          info: { count: 0, pages: 0, next: null, prev: null },
          results: [],
        };
      }

      throw error;
    }
  };

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
