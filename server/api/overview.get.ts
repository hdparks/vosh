
import { defineEventHandler } from "#imports";
import * as schema from "../database/schema";
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

export default defineEventHandler(async () => {
  const db = drizzle(sql, { schema: schema })
  const data = await db.query.quests.findMany({
    with: {
      goals:{
        with: {
          plans: true,
        }
      }
    }
  })
  console.log(data)
  return data
})
