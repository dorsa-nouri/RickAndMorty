<script setup lang="ts">
import { ref, computed } from "vue";
import Loading from "~/components/generals/Loading.vue";
import { useCharacters } from "~/composables/useCharacters";
import AppHeader from "~/components/generals/AppHeader.vue";
import CharacterSearch from "~/components/characters/CharacterSearch.vue";
import CharacterGrid from "~/components/characters/CharacterGrid.vue";
import CharacterPagination from "~/components/characters/CharacterPagination.vue";
import EmptyState from "~/components/generals/EmptyState.vue";
import ErrorState from "~/components/generals/ErrorState.vue";
import { isNavigationFailure } from "vue-router";

const route = useRoute();
const router = useRouter();
const { getCharacters } = useCharacters();

const searchResetKey = ref(0);
const query = computed(() => {
  const rawPage = Number(route.query.page);

  return {
    page: Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1,
    name: typeof route.query.name === "string" ? route.query.name.trim() : "",
  };
});

const { data, pending, error, refresh } = await getCharacters(query);

const updateQuery = async (page: number, name: string, replace = false) => {
  const queryParams = {
    ...(name ? { name } : {}),
    ...(page > 1 ? { page: String(page) } : {}),
  };

  try {
    await (replace ? router.replace : router.push)({
      query: queryParams,
    });
  } catch (error) {
    if (isNavigationFailure(error)) return;
    throw error;
  }
};

const handleSearch = (value: string) => {
  const name = value.trim();

  if (name === query.value.name && query.value.page === 1) return;

  return updateQuery(1, name, true);
};

const handlePageChange = (page: number) => {
  if (page === query.value.page) return;

  return updateQuery(page, query.value.name);
};

const errorMessage = computed(() => {
  const statusCode = error.value?.status;

  console.log("Status code:", statusCode , typeof statusCode);

  if (statusCode === 404) {
    return "The character you are looking for could not be found.";
  }

  if (statusCode === 429) {
    return "Too Many Requests to Server. Wait a few seconds, then press the Try Again button.";
  }

  if (statusCode !== undefined && statusCode >= 500) {
    return "Server error. Please try again later.";
  }

  if (statusCode !== undefined && statusCode >= 400) {
    return "A request error occurred. Please try again.";
  }

  return "Something went wrong. Check your connection and try again.";
});

const handleTryAgain = async () => {
  await refresh();
};

const handleClear = () => {
  handleSearch("");
  searchResetKey.value++;
};
</script>

<template>
  <div class="min-h-screen text-white">
    <AppHeader :hide-glow-on-mobile="true">
      <template #search>
        <CharacterSearch
          :reset-key="searchResetKey"
          :initial-value="query.name"
          :loading="pending"
          @search="handleSearch"
        />
      </template>
    </AppHeader>

    <div class="relative mx-auto w-[95%] md:w-[90%] py-10 sm:py-12">
      <section>
        <!-- Loading -->
        <Loading v-if="pending" variant="grid" />
        <!-- Error state -->
        <ErrorState
          v-else-if="error"
          :status-code="error.status|| 500"
          :message="errorMessage"
          :loading="pending"
          @retry="handleTryAgain"
          @clear="handleClear"
        />
        <!-- empty state -->
        <EmptyState v-else-if="data && data.results.length === 0" />

        <CharacterGrid
          v-else-if="data"
          :characters="data.results"
          :key="`${query.page}-${query.name}`"
        />
      </section>
      <div>
        <CharacterPagination
          v-if="!pending && !error && data && data.info.pages > 1"
          :page="query.page"
          :total-pages="data.info.pages"
          @update:page="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>
