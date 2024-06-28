import { defineEventHandler } from "#imports";
import { sql } from "@vercel/postgres";
import { plans } from "../database/schema";
import { drizzle } from "drizzle-orm/vercel-postgres";

export default defineEventHandler(async () => {
  const db = drizzle(sql)
  const data = await db.select().from(plans)
  return data
}) 

