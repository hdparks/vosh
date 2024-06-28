import {defineConfig} from "drizzle-kit"
import {config} from 'dotenv'
config()

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dbCredentials: {
    url: process.env.POSTGRES_URL as string
  }
})
