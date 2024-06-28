import { defineEventHandler } from "#imports";
import { objectives } from "../database/schema";
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

export default defineEventHandler(async () => {
  const db = drizzle(sql)
  const data = await db.select().from(objectives)
  return data
})
