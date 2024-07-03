import { defineEventHandler } from "#imports";
import { sql } from '@vercel/postgres'
import * as schema from "@/server/database/schema"
import { drizzle } from 'drizzle-orm/vercel-postgres'

export default defineEventHandler(async (event) => {
  const db = drizzle(sql, { schema: schema })
  const now = new Date().toUTCString();
  const data = await db.query.goals.findFirst({
    where: (goals, {and,gte,lte}) => and(gte(goals.end, now),lte(goals.start, now)),
    with: {
      plans: true,
      logs: true,
    }
  })
  return data
})
