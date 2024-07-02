<template>
  <div><NuxtLink :to="`/goals/${goal.id}`"><em>{{goal.name}}</em></NuxtLink> - <span class="text-gray-700 ">{{goal.description}}</span></div>
</template>
<script setup lang="ts">
import { type Goal } from '@/server/database/schema'
defineProps<{goal: Goal}>()
</script>
