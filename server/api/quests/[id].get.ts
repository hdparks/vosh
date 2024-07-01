import { defineEventHandler } from "#imports";
import { sql } from '@vercel/postgres'
import * as schema from "@/server/database/schema"
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const questId = parseInt(getRouterParam(event, 'id')!)
  const db = drizzle(sql, { schema: schema })
  const data = await db.query.quests.findFirst({
    where:eq(schema.quests.id, questId),
    with: {
      goals: true,
    }
  })
  return data
})
