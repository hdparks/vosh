import { defineEventHandler } from "#imports";
import { sql } from '@vercel/postgres'
import * as schema from "@/server/database/schema"
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { eq } from "drizzle-orm";
import { fixDumbDrizzleDateIssues } from "~/lib/utils";

export default defineEventHandler(async (event) => {
  const planId = parseInt(getRouterParam(event, 'id')!)
  const db = drizzle(sql, { schema: schema })
  const data = await db.query.plans.findFirst({
    where:eq(schema.plans.id, planId),
    with: {
      logs: true,
    }
  })
  data?.logs.forEach(log => {
    log.date = fixDumbDrizzleDateIssues(log.date)
  })
  return data
})
