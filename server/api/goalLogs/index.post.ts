
import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"
import * as schema from "@/server/database/schema"


export default defineEventHandler(async(event) => {
  const db = drizzle(sql, {schema: schema})
  const body = await readBody<schema.GoalLogInsertParams>(event)
  const result = await db.insert(schema.goalLogs).values(body).returning()
  return result
})
