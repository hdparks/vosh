<template>
  <div v-if="plan">
    <div class="italic text-lg">{{plan.name}}</div>
    <div>{{plan.description}}</div>
    <Card class="mt-10">
      <CardHeader>
        <CardTitle>Logs</CardTitle>
        <CardDescription>Here Come The Test Results: 'You Are A Horrible Person.' That's What It Says, 'A Horrible Person.' We Weren't Even Testing For That.</CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="plan.logs.length == 0" class="text-sm text-muted-foreground">... looks like we're just wishing so far.</div>
        <div v-for="log in plan?.logs">
          {{toNiceDate(log.date)}}: <span class="font-bold">{{log.duration}} min</span> - <span class="text-muted-foreground">{{log.note ?? "no notes"}}</span>
        </div>
      </CardContent>
      <CardFooter>
        <PlanTrackingDialog :plans="[plan]" :selected-plan="plan" @refresh="refresh">
          <template #button>
            <Button variant="outline">Track Progress</Button>
          </template>
        </PlanTrackingDialog>
      </CardFooter>
    </Card>
  </div>
  <div v-else>{{error}}</div>
</template>
<script setup lang="ts">
import { Card, CardTitle, CardHeader, CardContent, CardDescription} from '~/components/ui/card';
import { type Plan } from '~/server/database/schema';
import { toNiceDate } from '~/lib/utils';
const route = useRoute()
const planId = parseInt(route.params.id as string)
const {data:plan, error, refresh} = await useFetch<Plan>(`/api/plans/${planId}`)
</script>

