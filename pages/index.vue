<template>
  <div>
    <h1>Goals</h1>
    <div v-for="goal in goals">
      {{goal.name}}
    </div>
    <div>
      <label>Name</label><input type="text" v-model="newGoalName"/>
      <label>Text</label><input type="text" v-model="newGoalText"/>
      <button @click="createNewGoal">Send</button>
    </div>
    <h1>Action Plans</h1>
    <div v-for="plan in plans">
      {{plan.name}}
    </div>
  </div>
</template>
<script setup lang="ts">
const {data:goals} = await useFetch<Goal[]>("/api/goals")
const {data:plans} = await useFetch<Plan[]>("/api/plans")

const newGoalName = ref<string>()
const newGoalText = ref<string>()
console.log(goals.value, plans.value) // todo: why do these get treeshaken out unless they are referenced somewhere in script setup?

async function createNewGoal(){
  const res = await $fetch('/api/goals',{
    method: 'POST',
    body: { name:newGoalName.value, text:newGoalText.value}
  })
  goals.value?.push(...res)
  console.log("recieved:",res)
}
</script>
