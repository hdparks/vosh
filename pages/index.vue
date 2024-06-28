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
      <div>
        <label>Name</label><input type="text" v-model="newGoalName"/>
      </div>
      <div>
        <label>Text</label><input type="text" v-model="newGoalDescription"/>
      </div>
      <div>
        <label>Target Objective</label>
        <select v-model="newGoalTargetObjectiveId">
          <option v-for="objective in objectives" :key="objective.id" :value="objective.id">{{objective.name}}</option>
        </select>
      </div>
      <div>
        <button @click="createNewGoal">Send</button>
      </div>
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
import type { GoalPostParams } from '~/server/api/goals.post';

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
const newGoalDescription = ref<string>()
const newGoalTargetObjectiveId = ref<number>()

async function createNewGoal(){
  const newGoal:GoalPostParams = {name: newGoalName.value!, description: newGoalDescription.value!, targetObjectiveId:newGoalTargetObjectiveId.value!}
  const res = await $fetch<Goal[]>('/api/goals',{
    method: 'POST',
    body: newGoal
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
