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
  const data = await db.query.goals.findMany({
    where: (goals, {and,gte,lte}) => and(gte(goals.end, startDate),lte(goals.start, endDate)),
    with: {
      plans: true,
      logs: {
        orderBy: (goalLogs) => goalLogs.date
      },
    }
  })
  return data
})
