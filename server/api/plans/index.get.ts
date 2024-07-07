import { defineEventHandler } from "#imports";
import { sql } from '@vercel/postgres'
import * as schema from "@/server/database/schema"
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { parseISO } from "date-fns";

export default defineEventHandler(async (event) => {
  let {start, end} = getQuery(event)
  const startDate = parseISO(start as string)
  const endDate = parseISO(end as string)
  const db = drizzle(sql, { schema: schema })
  const data = await db.query.plans.findMany({
    where: (plans, {and,gte,lte}) => and(gte(plans.end, startDate),lte(plans.start, endDate)),
    orderBy: (plans) => plans.start,
    with: {
      logs: {
        orderBy: (planLogs) => planLogs.date
      },
    }
  })
  return data
})
