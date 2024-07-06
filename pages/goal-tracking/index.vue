<template>
  <div class="size-full flex flex-row justify-center">
    <div class="w-96 md:w-8/12 mt-10 ">
      <div :style="{height:`${quoteHeight}px`}" style="transition: height 1s ease;" >
        <div ref="quoteContainer" class="mb-5 relative stretch">
          <h1 class="text-5xl font-['Lora'] font-extrabold">Success depends on</h1>
          <Transition name="fade">
            <h1 v-show="quote == 1" class="text-5xl font-['Lora'] font-extrabold">forethought</h1>
          </Transition>
          <Transition name="fade">
            <h1 v-show="quote == 2" class="text-5xl font-['Lora'] font-extrabold">dispassionate calculation of probabilities</h1>
          </Transition>
          <Transition name="fade">
            <h1 v-show="quote == 3" class="text-5xl font-['Lora'] font-extrabold">accounting for every stray variable</h1>
          </Transition>
        </div>
      </div>
      <div class="flex flex-row justify-end md:w-10/12 mt-10">
        <div>
          <div>&mdash;Robert Edwin House,</div>
          <div class="pl-4">mere hours before meeting his unfortunate end</div>
          <div class="pl-4">at the hands of an unnamed Courier</div>
          <div class="pl-4">armed only with a 9-iron</div>
        </div>
      </div>
      <div class="mt-10 relative grid grid-cols-3" >
        <template v-for="row in goalRows" >
          <div>{{row.goal.name}}: {{toNiceDate(row.goal.start)}} - {{toNiceDate(row.goal.end ?? addMonths(endDate,1))}}</div>
          <div class="col-span-2 h-4 hover:h-12 relative" style="transition: height 1s ease;">
            <div class="bg-red-50 relative" :style="{left:`${row.start*100}%`, width:`${row.width*100}%`}" style="top:0; bottom:0;"> 
            </div>
          </div>
        </template>
        <div class="w-0.5 h-100 bg-slate-100 absolute" :style="{left:`${((dateToPercent(startDate)*2)+1)/3*100}%`}" style="top:0; bottom:0;" >
          <div class="absolute" style="bottom:0; transform: translate(-40%, 100%);">{{toNiceDate(startDate)}}</div>
        </div>
        <div class="w-1 h-100 bg-slate-600 absolute" :style="{left:`${((dateToPercent(today)*2)+1)/3*100}%`}" style="top:0; bottom:0;" >
          <div class="absolute" style="bottom:0; transform: translate(-40%, 100%);">{{toNiceDate(today)}}</div>
        </div>
        <div class="w-0.5 h-100 bg-slate-100 absolute" :style="{left:`${((dateToPercent(endDate)*2)+1)/3*100}%`}" style="top:0; bottom:0;" >
          <div class="absolute" style="bottom:0; transform: translate(-40%, 100%);">{{toNiceDate(endDate)}}</div>
        </div>
      </div>
      <div>
        <Select v-model="logGoal">
          <SelectItem v-for="goal in goals" :value="goal.name"></SelectItem>
        </Select>
        <Input type="number" v-model="logValue"></Input>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" class="justify-start text-left font-normal">
              <CalendarIcon class="mr-2 h-4 w-4" />
              {{ logDate ? toNiceDate(logDate) : "Select Date"}}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="flex w-auto flex-col gap-y-2 p-2">
            <Calendar v-model="logDate"></Calendar>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </div>   
</template>
<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { addMonths, differenceInDays } from 'date-fns';
import { startOfToday, } from 'date-fns';
import { formatISOWithOptions, formatWithOptions } from 'date-fns/fp';
import type { Goal } from '~/server/database/schema';
const today = startOfToday()
const startDate = ref<Date>(addMonths(startOfToday(),-1));
const endDate = ref<Date>(addMonths(startOfToday(),1));
const toIsoDate = formatISOWithOptions({representation: 'date'})
const toNiceDate = formatWithOptions({},"M/d")
const {data: goals} = useFetch<Goal[]>(`/api/goal-tracking/goals?start=${toIsoDate(startDate.value)}&end=${toIsoDate(endDate.value)}`)
const quote = ref<number>(1)
const quoteContainer = ref<HTMLDivElement>()
const { height:quoteHeight } = useElementSize(quoteContainer)
function cycleQuotes(){
  quote.value = 1
  setTimeout(() => {
    quote.value = 2
    setTimeout(() => {
      quote.value = 3
    }, 3000)
  },3000)
}

onMounted(() => {
  cycleQuotes()
  setInterval(cycleQuotes, 30000) 
})

function dateToPercent(date:Date): number {
  const d = differenceInDays(startDate.value, date)
  const dTotal = differenceInDays(startDate.value, endDate.value)
  return (d/dTotal)
}

function goalProgress(goal:Goal): number {
  
}

const goalRows = computed(() => goals.value?.map(goal => ({
  goal: goal,
  start: dateToPercent(goal.start),
  width: dateToPercent(goal.end ?? addMonths(endDate.value,1)) - dateToPercent(goal.start),
})))

const logDate = ref<Date>()
const logGoal = ref<Goal>()
const logValue = ref<number>()
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease, transform 1s ease-out;
}
.fade-leave-active {
  position: absolute;
}

.fade-enter-from{
  opacity: 0;
  transform: translateY(-20px);
}
.fade-enter-to, .fade-leave-from {
  opacity: 1; 
  transform: translateY();
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.stretch {
  transition: height 1s ease;
}
</style>
