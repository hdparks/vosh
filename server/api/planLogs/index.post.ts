
import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"
import * as schema from "@/server/database/schema"
import { parseISO } from "date-fns"

export default defineEventHandler(async(event) => {
  const db = drizzle(sql, {schema: schema})
  const rawbody = await readBody<schema.PlanLogInsertParams & {date: string}>(event)
  const body: schema.PlanLogInsertParams = {...rawbody, date: parseISO(rawbody.date)} 
  console.log('in',body)
  const result = await db.insert(schema.planLogs).values(body).returning()
  console.log('out',result)
  return result
})
