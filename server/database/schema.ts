import { pgTable, text, serial, timestamp } from 'drizzle-orm/pg-core'

export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  text: text('text').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})

export const plans = pgTable('plans', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  text: text('text').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})
