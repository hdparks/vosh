import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { objectives } from "../database/schema"


export default defineEventHandler(async(event) => {
  const db = drizzle(sql)
  const body = await readBody<Objective>(event)
  const result = await db.insert(objectives).values(body).returning()
  return result
})
