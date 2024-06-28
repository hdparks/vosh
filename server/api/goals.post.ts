import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { goals } from "../database/schema"

export type GoalPostParams = {
  name: string;
  description: string;
  targetObjectiveId: number;
}

export default defineEventHandler(async(event) => {
  const db = drizzle(sql)
  const body = await readBody<GoalPostParams>(event)
  const result = await db.insert(goals).values(body).returning()
  return result
})
