<template>
  <div>
    <div v-if="goal"><em>{{goal.name}}</em> {{goal?.description}}</div>
    <div v-for="plan in goal?.plans">
      {{plan.name}}: {{plan.description}}
    </div>
    <div>
      Logs:
      <ul>
        <li v-for="log in goal?.logs">
          {{log.date}}: {{log.value}} - {{log.note ?? "no notes"}}
        </li>
      </ul>
      <br />
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Goal, type GoalLogInsertParams } from '~/server/database/schema';
const route = useRoute()
const goalId = parseInt(route.params.id as string)
const {data:goal, refresh} = useFetch<Goal>(`/api/goals/${goalId}`)

</script>
