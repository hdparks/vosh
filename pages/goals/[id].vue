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
      <label>Date</label><DatePicker v-model="newLogDate"></DatePicker>
      <label>Value</label><InputNumber v-model="newValue" />
      <label>Note (Optional)</label><InputText v-model="newNote" />
      <Button @click="createNewLog">Submit</Button> 
    </div>
  </div>
</template>
<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { type Goal, type GoalLogInsertParams } from '~/server/database/schema';
const route = useRoute()
const goalId = parseInt(route.params.id as string)
const {data:goal, refresh} = useFetch<Goal>(`/api/goals/${goalId}`)

const newLogDate = ref<Date>(new Date())
const newValue = ref<number>(0)
const newNote = ref<string>()

async function createNewLog (){
  const newLog: GoalLogInsertParams = {
    goalId: goalId,
    date: newLogDate.value.toISOString(),
    value: newValue.value,
    note: newNote.value
  }
  // todo: only let *me* add logs... requires auth

  const res = await $fetch("/api/goalLogs",{
    method: 'POST',
    body: newLog
  })
  await refresh()
}
</script>
