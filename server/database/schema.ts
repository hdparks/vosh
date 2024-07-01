import { InferInsertModel, InferSelectModel, SQL, relations, sql } from 'drizzle-orm'
import { pgTable, text, serial, timestamp, date, integer, AnyPgColumn, time } from 'drizzle-orm/pg-core'

export type AbilityScoreType = "Strength" | "Dexterity" | "Constitution" | "Wisdom" | "Intelligence" | "Charisma"

export const quests = pgTable('quests',{
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  abilityScoreType: text('abilityScoreType').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})

export const questsRelations = relations(quests, ({many}) => ({
  goals: many(goals)
}))

export type Quest = InferSelectModel<typeof quests> & {
  goals: Goal[]
}

export type QuestInsertParams = InferInsertModel<typeof quests> 

export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  fk_quest_goal: integer('fk_quest_goal').references(() => quests.id),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})

export const goalsRelations = relations(goals, ({one, many}) => ({
   quest: one(quests, {
     fields: [goals.fk_quest_goal],
     references: [quests.id]
   }),
   plans: many(plans)
}))

export type Goal = InferSelectModel<typeof goals> & {
  quest: Quest
  plans: Plan[]
}

export type GoalInsertParams = InferInsertModel<typeof goals>

export const plans = pgTable('plans', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('text').notNull(),
  fk_goal_plan: integer('fk_goal_plan').references(() => goals.id),
  createdAt: timestamp('createdAt').defaultNow().notNull()
})

export const plansRelations = relations(plans, ({one}) => ({
  goal: one(goals, {
    fields: [plans.fk_goal_plan],
    references: [goals.id]
  })
}));

export type Plan = InferSelectModel<typeof plans> & {
  goal: Goal
}

export type PlanInsertParams = InferInsertModel<typeof plans>

export const planLogs = pgTable('planLogs', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  planId: integer('planId').references(() => plans.id),
  note: text('note'),
  date: date('date').notNull(),
  duration: integer('duration'),
  start: time('start')
})

// utilities
export function lower(text: AnyPgColumn): SQL {
  return sql`lower(${text})`
}


