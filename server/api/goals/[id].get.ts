import { defineEventHandler } from "#imports";
import { sql } from '@vercel/postgres'
import * as schema from "@/server/database/schema"
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const goalId = parseInt(getRouterParam(event, 'id')!)
  const db = drizzle(sql, { schema: schema })
  const data = await db.query.goals.findMany({
    where:eq(schema.goals.id, goalId),
    with: {
      plans: true,
    }
  })
  return data
})
