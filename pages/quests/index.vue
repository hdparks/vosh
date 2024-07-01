<template>
  <div class="w-full flex flex-row justify-center">
    <div class="w-1/2">
      <div>
				<div><span class="font-bold">Strength</span>, <span>measuring physical power</span></div>

				<div class="ml-4">
	        <QuestSummary v-for="quest in questsByAbilityScore.get('Strength')" :quest="quest" />
				</div>
			</div>
      <div>
				<div><span class="font-bold">Dexterity</span>, <span>measuring agility</span></div>
				<div class="ml-4">
	        <QuestSummary v-for="quest in questsByAbilityScore.get('Dexterity')" :quest="quest" />
				</div>
			</div>
      <div>
				<div><span class="font-bold">Constitution</span>, <span>measuring endurance</span> </div>
				<div class="ml-4">
	        <QuestSummary v-for="quest in questsByAbilityScore.get('Constitution')" :quest="quest" />
				</div>
			</div>
      <div>
				<div><span class="font-bold">Intelligence</span>, <span>measuring reasoning and memory</span> </div>
				<div class="ml-4">
	        <QuestSummary v-for="quest in questsByAbilityScore.get('Intelligence')" :quest="quest" />
				</div>
			</div>
      <div>
				<div><span class="font-bold">Wisdom</span>, <span>measuring perception and insight</span> </div>
				<div class="ml-4">
	        <QuestSummary v-for="quest in questsByAbilityScore.get('Wisdom')" :quest="quest" />
				</div>
			</div>
      <div>
				<div><span class="font-bold">Charisma</span>, <span>measuring force of personality</span> </div>
				<div class="ml-4">
	        <QuestSummary v-for="quest in questsByAbilityScore.get('Charisma')" :quest="quest" />
				</div>
			</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type Quest, type AbilityScoreType} from "@/server/database/schema"
const {data} = await useFetch<Quest[]>('/api/overview')
const questsByAbilityScore = computed(()=>{
  const questMap = new Map<string, Quest[]>()
  data.value?.forEach(quest => {
    let quests = questMap.get(quest.abilityScoreType)
    if (quests == null) {
      quests = []
      questMap.set(quest.abilityScoreType, quests)
    }
    quests.push(quest)
  })
  return questMap
})
</script>
