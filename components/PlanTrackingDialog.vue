<template>
	<Dialog v-model:open="open">
    <DialogTrigger as-child>
      <slot name="button">
        <Button variant="outline">Track Progress</Button>
      </slot>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Track Plan Progress</DialogTitle>
        <DialogDescription>"The unexamined life... well, nobody really knows, do they?"</DialogDescription>
      </DialogHeader>
      <div class="w-80 mx-auto">
        <div class="flex flex-row justify-between items-center">
          <Label>Plan</Label>
          <Combobox v-model="logPlan" :items="plans ?? []" :filter-function="filterPlans">
            <template #selected="{modelValue}">{{modelValue?.name ?? "Select Plan..."}}</template>
            <template #item="{item}">
              <div>{{item?.name}}</div>
            </template>
          </Combobox>
        </div>

        <div class="flex flex-row justify-between items-center">
          <Label>Duration</Label>
          <Input class="w-[200px] inline-block" type="number" v-model="logDuration"></Input>
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
import type { Plan, PlanLogInsertParams } from '~/server/database/schema';
import { Dialog, DialogContent, DialogDescription } from './ui/dialog';
import Combobox from '~/components/ui/combobox/Combobox.vue'
import { CalendarIcon } from 'lucide-vue-next';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { type DateValue, today, getLocalTimeZone } from '@internationalized/date';
import { toNiceDate } from '~/lib/utils';
import { Calendar } from './ui/calendar';
const props = withDefaults(defineProps<{plans:Plan[], selectedPlan?:Plan|null}>(),{selectedPlan:null})
const emit = defineEmits<{
  (e:'refresh'):void
}>()
 
const open = ref<boolean>(false)
const logPlan= ref<Plan|null>(props.selectedPlan)
const logDuration = ref<number>(1)
const logDate = ref<DateValue>(today(getLocalTimeZone()))
const logNote = ref<string>()

async function submit(){
  const body: PlanLogInsertParams = {
    date: logDate.value!.toDate(getLocalTimeZone()),
    planId: logPlan.value!.id,
    duration: logDuration.value!,
    note: logNote.value
  }
  const res = await $fetch('/api/planLogs', {
    method:'POST',
    body: body
  })
  open.value = false
  emit('refresh')
}

function filterPlans(val: Plan[], term: string): Plan[]{
  const lowerTerm = term.toLowerCase()
  return val.filter(plan => plan.name.toLowerCase().includes(lowerTerm) || plan.description.toLowerCase().includes(lowerTerm))
}
</script>

