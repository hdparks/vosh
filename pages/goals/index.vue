<template>
  <div class="mb-5 relative stretch">
    <h1 class="text-5xl font-['Lora'] font-extrabold">Success depends on</h1>
    <div :style="{height: `${quoteHeight}px`}" class="relative">
      <Transition name="fade">
        <h1 ref="quote1" class="text-5xl font-['Lora'] font-extrabold absolute top-0 opacity-0">forethought</h1>
      </Transition>
      <Transition name="fade">
        <h1 ref="quote2" class="text-5xl font-['Lora'] font-extrabold absolute top-0 opacity-0">dispassionate calculation of probabilities</h1>
      </Transition>
      <Transition name="fade">
        <h1 ref="quote3" class="text-5xl font-['Lora'] font-extrabold absolute top-0 opacity-0">accounting for every stray variable</h1>
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
      <Button variant="link" as-child>
        <NuxtLink :to="`/goals/${row.goal.id}`">
          <div class="truncate h-8 hover:h-12" style="transition: height 0.3s ease;"><span class="truncate">{{row.goal.name}}</span>: {{toNiceDate(row.goal.start)}} - {{toNiceDate(row.goal.end ?? addMonths(endDate,1))}}</div>
        </NuxtLink>
      </Button>
      <div class="col-span-2 h-8 hover:h-12 relative" style="transition: height 0.3s ease;">
        <div class="bg-red-50 absolute" :style="{left:`${row.start*100}%`, width:`${row.width*100}%`}" style="top:2px; bottom:2px;"></div>
        <div class="bg-red-200 absolute top-0.5 bottom-0.5 min-w-px" :style="{left:`${row.start*100}%`, width:`${row.width*row.progress*100}%`}" ></div>
        <div v-for="log in row.goal.logs" class="w-1 h-4 bg-slate-600 rounded absolute" :style="{left:`${dateToPercent(log.date)*100}%`}" style="top:50%; transform: translate(-50%, -50%);"></div>
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
  <div class="mt-40 flex flex-row justify-center">
    <GoalTrackingDialog v-if="goals" :goals="goals" @refresh="refresh()"></GoalTrackingDialog>
  </div>
</template>
<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { addMonths, differenceInDays } from 'date-fns';
import { startOfToday, } from 'date-fns';
import { formatISOWithOptions, formatWithOptions } from 'date-fns/fp';
import gsap from 'gsap';
import GoalTrackingDialog from '~/components/GoalTrackingDialog.vue';
import { Button } from '~/components/ui/button';
import type { Goal} from '~/server/database/schema';

const today = startOfToday()
const startDate = ref<Date>(addMonths(startOfToday(),-1));
const endDate = ref<Date>(addMonths(startOfToday(),1));
const toIsoDate = formatISOWithOptions({representation: 'date'})
const toNiceDate = formatWithOptions({},"M/d")
const {data: goals, refresh } = await useFetch<Goal[]>(`/api/goals?start=${toIsoDate(startDate.value)}&end=${toIsoDate(endDate.value)}`)
const quote1 = ref<HTMLDivElement>()
const quote2 = ref<HTMLDivElement>()
const quote3 = ref<HTMLDivElement>()
const { height:quote1Height } = useElementSize(quote1)
const { height:quote2Height } = useElementSize(quote2)
const { height:quote3Height } = useElementSize(quote3)
const quoteHeight = computed(() => Math.max(...[quote1Height.value, quote2Height.value, quote3Height.value]))

const quotes = [quote1, quote2, quote3]
const selectedQuote = ref<number>(-1)

function cycleQuotes(){
  selectedQuote.value = 0
  setTimeout(() => {
    selectedQuote.value = 1
    setTimeout(() => {
      selectedQuote.value = 2
    }, 3000)
  },3000)
}
watch(selectedQuote, () => {
  quotes.forEach((q,i) => {
    if(selectedQuote.value == i) {
      fadeInQuote(q.value!)
    } else {
      fadeOutQuote(q.value!)
    }
  }) 
})

function fadeInQuote(div: HTMLDivElement){
  gsap.fromTo(div,{top:-50, opacity:0},{top:0, opacity:1})
}
function fadeOutQuote(div: HTMLDivElement){
  gsap.fromTo(div,{top:0, opacity:1},{top:50, opacity:0})
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

const goalRows = computed(() => goals.value?.map(goal => ({
  goal: goal,
  start: dateToPercent(goal.start),
  width: dateToPercent(goal.end ?? addMonths(endDate.value,1)) - dateToPercent(goal.start),
  progress: getProgress(goal)
})))
function getProgress(goal:Goal): number{
  // todo: handle task-based goals
  const first = goal.logs[0]?.value
  if (first == null) { return 0 }
  const totalDistance = Math.abs(goal.target - first)
  const nearestDistance = goal.logs.reduce((min,log) => Math.min(min, Math.abs(goal.target - log.value)),Number.POSITIVE_INFINITY)
  return 1 - (nearestDistance / totalDistance)
}

</script>
