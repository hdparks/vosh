import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { plans } from "../database/schema"


export default defineEventHandler(async(event) => {
  const db = drizzle(sql)
  const body = await readBody<Plan>(event)
  const result = await db.insert(plans).values(body).returning()
  return result
})
