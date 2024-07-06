import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"
import * as schema from "@/server/database/schema"
import { parseISO } from "date-fns"

export default defineEventHandler(async(event) => {
  const db = drizzle(sql, {schema: schema})
  const rawbody = await readBody<schema.GoalLogInsertParams & {date: string}>(event)
  const body:schema.GoalLogInsertParams = {...rawbody, date: parseISO(rawbody.date)}
  const result = await db.insert(schema.goalLogs).values(body).returning()
  return result
})
