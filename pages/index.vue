<template>
  <div>
    <h1>Objectives</h1>
    <div v-for="objective in objectives">
      <h3>{{objective.name}}</h3>
      <p>{{objective.description}}</p>
    </div>
    <h1>Goals</h1>
    <div v-for="goal in goals">
      {{goal.name}}
    </div>
    <div>
      <h2>Create New Goal</h2>
      <label>Name</label><input type="text" v-model="newGoalName"/>
      <label>Text</label><input type="text" v-model="newGoalText"/>
      <button @click="createNewGoal">Send</button>
    </div>
    <h1>Action Plans</h1>
    <div v-for="plan in plans">
      {{plan.name}}
    </div>
    <div>
      <h2>Create New Action Plan</h2>
      <label>Name</label><input type="text" v-model="newPlanName"/>
      <label>Text</label><input type="text" v-model="newPlanText"/>
      <button @click="createNewPlan">Send</button>
    </div>
  </div>
</template>
<script setup lang="ts">
const {data:goals} = await useFetch<Goal[]>("/api/goals")
const {data:plans} = await useFetch<Plan[]>("/api/plans")
const {data:objectives} = await useFetch<Objective[]>("/api/objectives")

const newObjectiveName = ref<string>()
const newObjectiveText = ref<string>()

async function createNewObjective(){
  const res = await $fetch<Objective[]>('/api/objecitves',{
    method: 'POST',
    body: { name:newObjectiveName.value, text:newObjectiveText.value}
  })
  objectives.value?.push(...res)
  console.log("recieved:",res)
}

const newGoalName = ref<string>()
const newGoalText = ref<string>()

async function createNewGoal(){
  const res = await $fetch<Goal[]>('/api/goals',{
    method: 'POST',
    body: { name:newGoalName.value, text:newGoalText.value}
  })
  goals.value?.push(...res)
  console.log("recieved:",res)
}


const newPlanName = ref<string>()
const newPlanText = ref<string>()
async function createNewPlan(){
  const res = await $fetch<Plan[]>('/api/plans',{ method: 'POST',
    body: { name:newPlanName.value, text:newPlanText.value}
  })
  plans.value?.push(...res)
  console.log("recieved:",res)
}

</script>
