<template>
  <div v-if="goal">
    <div class="italic text-lg">{{goal.name}}</div>
    <div>{{goal.description}}</div>
    <Card class="mt-10">
      <CardHeader>
        <CardTitle>Plans</CardTitle>
        <CardDescription>'A goal without a plan is just a wish.' &mdash; Antoine de Saint-Exupéry</CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="goal.plans.length == 0" class="text-sm text-muted-foreground">... looks like we're just wishing so far.</div>
        <Button variant="link" v-for="plan in goal?.plans" as-child>
          <NuxtLink :to="`/plans/${plan.id}`">
            <span class="italic">{{plan.name}}</span>: <span class="text-muted-foreground text-sm ml-1">{{plan.description}}</span>
          </NuxtLink>
        </Button>
      </CardContent>
    </Card>
    <Card class="mt-10">
      <CardHeader>
        <CardTitle>Logs</CardTitle>
        <CardDescription>Here Come The Test Results: 'You Are A Horrible Person.' That's What It Says, 'A Horrible Person.' We Weren't Even Testing For That.</CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="goal.logs.length == 0" class="text-sm text-muted-foreground">... looks like we're just wishing so far.</div>
        <div v-for="log in goal?.logs">
          {{toNiceDate(log.date)}}: <span class="font-bold">{{log.value}}</span> - <span class="text-muted-foreground">{{log.note ?? "no notes"}}</span>
        </div>
      </CardContent>
      <CardFooter>
        <GoalTrackingDialog :goals="[goal]" :selected-goal="goal" @refresh="refresh">
          <template #button>
            <Button variant="outline">Track Progress</Button>
          </template>
        </GoalTrackingDialog>
      </CardFooter>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { Card, CardTitle, CardHeader, CardContent, CardDescription} from '~/components/ui/card';
import { type Goal } from '~/server/database/schema';
import { toNiceDate } from '~/lib/utils';
const route = useRoute()
const goalId = parseInt(route.params.id as string)
const {data:goal, refresh} = await useFetch<Goal>(`/api/goals/${goalId}`)
</script>
