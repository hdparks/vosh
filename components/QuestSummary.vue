<template>
  <div><NuxtLink :to="`/quests/${quest.id}`"><em>{{quest.name}}</em></NuxtLink> - <span class="text-gray-700 ">{{quest.description}}</span></div>
</template>
<script setup lang="ts">
import { type Quest } from '@/server/database/schema'
defineProps<{quest: Quest}>()
</script>
