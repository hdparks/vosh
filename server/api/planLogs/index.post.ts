
import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"
import * as schema from "@/server/database/schema"

export default defineEventHandler(async(event) => {
  const db = drizzle(sql, {schema: schema})
  const body = await readBody<schema.PlanLogInsertParams>(event)
  const result = await db.insert(schema.planLogs).values(body).returning()
  return result
})
