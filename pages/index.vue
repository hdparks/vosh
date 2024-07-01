<template>
  <NuxtLink to="quests" />
</template>
<script setup lang="ts">
import { type Goal, type Quest, type GoalInsertParams, type PlanInsertParams, quests, type AbilityScoreType } from '~/server/database/schema';


const {data, refresh } = await useFetch<Quest[]>("/api/overview")

const questsByType = computed(() => {

  const types = new Map<AbilityScoreType, Quest[]>()
  data.value?.forEach(quest => {
    let subset = types.get(quest.abilityScoreType as AbilityScoreType)
    if (subset == null){
      subset = []
      types.set(quest.abilityScoreType as AbilityScoreType,subset)
    }
    subset.push(quest)
  })

  return types
})



const newGoalName = ref<string>('')
const newGoalDescription = ref<string>('')
const newGoalTargetquestId = ref<number>(NaN)

async function createNewGoal(questId: number){
  if (isNaN(newGoalTargetquestId.value)) {
    alert("nope")
    return
  }
  const newGoal: GoalInsertParams = {
    name: newGoalName.value, 
    description: newGoalDescription.value, 
    fk_quest_goal: questId
  }
  const res = await $fetch<Goal[]>('/api/goals',{
    method: 'POST',
    body: newGoal
  })
  await refresh()  
}


const newPlanName = ref<string>()
const newPlanText = ref<string>()
async function createNewPlan(goalId:number){
  const body: PlanInsertParams = {
    name: newPlanName.value!,
    description: newPlanText.value!,
    fk_goal_plan: goalId
  }
  await $fetch('/api/plans',{ method: 'POST',
    body: body
  })
  await refresh()
}

</script>
