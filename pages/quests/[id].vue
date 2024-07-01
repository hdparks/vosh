<template>
  <div v-if="quest">
    <QuestSummary :quest="quest"></QuestSummary>
  </div>
</template>
<script setup lang="ts">
import { type Quest } from '~/server/database/schema';
const route = useRoute()
const questId = route.params.id
const {data:quest, error} = await useFetch<Quest>(`/api/quests/${questId}`)
</script>
