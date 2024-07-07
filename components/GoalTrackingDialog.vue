<template>
	<Dialog v-model:open="open">
    <DialogTrigger as-child>
      <slot name="button">
        <Button variant="outline">Track Progress</Button>
      </slot>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Track Goal Progress</DialogTitle>
        <DialogDescription>"The unexamined life... well, nobody really knows, do they?"</DialogDescription>
      </DialogHeader>
      <div class="w-80 mx-auto">
        <div class="flex flex-row justify-between items-center">
          <Label>Goal</Label>
          <Combobox v-model="logGoal" :items="goals ?? []" :filter-function="filterGoals">
            <template #selected="{modelValue}">{{modelValue?.name ?? "Select Goal..."}}</template>
            <template #item="{item}">
              <div>{{item?.name}}</div>
            </template>
          </Combobox>
        </div>

        <div class="flex flex-row justify-between items-center">
          <Label>Value</Label>
          <Input class="w-[200px] inline-block" type="number" v-model="logValue"></Input>
        </div>
        
        <div class="flex flex-row justify-between items-center">
          <Label>Date</Label>
          <Popover >
            <PopoverTrigger as-child>
              <Button variant="outline" class="w-[200px] justify-start text-left font-normal">
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{ logDate ? toNiceDate(logDate.toDate(getLocalTimeZone())) : "Select Date"}}
              </Button>
            </PopoverTrigger>
            <PopoverContent class="flex w-auto flex-col gap-y-2 p-2">
              <Calendar v-model="logDate as DateValue"></Calendar>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>Note (Optional)</Label>
          <Textarea v-model="logNote" />
        </div>
        <div>
          <Button @click="submit">Submit</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
<script setup lang="ts">
import type { Goal, GoalLogInsertParams } from '~/server/database/schema';
import { Dialog, DialogContent, DialogDescription } from './ui/dialog';
import Combobox from '~/components/ui/combobox/Combobox.vue'
import { CalendarIcon } from 'lucide-vue-next';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { type DateValue, today, getLocalTimeZone } from '@internationalized/date';
import { formatISOWithOptions, formatWithOptions, type DateValues } from 'date-fns/fp';
import { Calendar } from './ui/calendar';
const props = withDefaults(defineProps<{goals:Goal[], selectedGoal?:Goal|null}>(),{selectedGoal:null})
const emit = defineEmits<{
  (e:'refresh'):void
}>()
const toIsoDate = formatISOWithOptions({representation: 'date'})
const toNiceDate = formatWithOptions({},"M/d")
 
const open = ref<boolean>(false)
const logGoal = ref<Goal|null>(props.selectedGoal)
const logValue = ref<number>(1)
const logDate = ref<DateValue>(today(getLocalTimeZone()))
const logNote = ref<string>()

async function submit(){
  const body: GoalLogInsertParams = {
    date: logDate.value!.toDate(getLocalTimeZone()),
    goalId: logGoal.value!.id,
    value: logValue.value!,
    note: logNote.value
  }
  const res = await $fetch('/api/goalLogs', {
    method:'POST',
    body: body
  })
  open.value = false
  emit('refresh')
}

function filterGoals(val: Goal[], term: string): Goal[]{
  const lowerTerm = term.toLowerCase()
  return val.filter(goal => goal.name.toLowerCase().includes(lowerTerm) || goal.description.toLowerCase().includes(lowerTerm))
}
</script>

