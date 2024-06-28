import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { goals } from "../database/schema"


export default defineEventHandler(async(event) => {
  const db = drizzle(sql)
  const body = await readBody<Goal>(event)
  const result = await db.insert(goals).values(body).returning()
  return result
})
