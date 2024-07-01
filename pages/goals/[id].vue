<template>
  <div>
    <div v-if="goal"><em>{{goal.name}}</em> {{goal?.description}}</div>
    <div v-for="plan in goal?.plans">
      {{plan.name}}: {{plan.description}}
    </div>
  </div>
</template>
<script setup lang="ts">
  import { type Goal } from '~/server/database/schema';
  const route = useRoute()
  const goalId = route.params.id
  const {data:goal} = useFetch<Goal>(`/api/goals/${goalId}`)
</script>
