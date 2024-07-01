import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { QuestInsertParams, quests } from "~/server/database/schema"


export default defineEventHandler(async(event) => {
  const db = drizzle(sql)
  const body = await readBody<QuestInsertParams>(event)
  const result = await db.insert(quests).values(body).returning()
  return result
})
