import { pgTable, text, serial, timestamp, integer } from 'drizzle-orm/pg-core'

export const objectives = pgTable('objectives',{
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})

export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  description: text('description').notNull(),
  text: text('text').notNull(),
  fk_objective_goal: integer('fk_objective_goal').references(() => objectives.id),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})

export const plans = pgTable('plans', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('text').notNull(),
  fk_goal_plan: integer('fk_goal_plan').references(() => goals.id),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})
