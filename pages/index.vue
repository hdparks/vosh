<template>
  <div>
    <h1>Goals</h1>
    <div v-for="goal in goals">
      {{goal}}
    </div>
    <h1>Action Plans</h1>
    <div v-for="plan in plans">
      {{plan}}
    </div>
  </div>
</template>
<script setup lang="ts">

const {data:goals} = await useFetch<string[]>("api/goals")
const {data:plans} = await useFetch<string[]>("api/plans")
console.log(goals, plans) // todo: why do these get treeshaken out unless they are referenced somewhere in script setup?
</script>
