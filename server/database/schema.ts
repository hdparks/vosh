import { InferInsertModel, InferSelectModel, SQL, relations, sql } from 'drizzle-orm'
import { pgTable, text, serial, timestamp, date, integer, AnyPgColumn, time, real } from 'drizzle-orm/pg-core'

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
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  target: real('target').default(1).notNull(),
  start: date('start', {mode:'date'}).defaultNow().notNull(),
  end: date('end', {mode:'date'}).default(sql`CURRENT_DATE + interval '1 month'`).notNull()
})

export const goalsRelations = relations(goals, ({one, many}) => ({
   quest: one(quests, {
     fields: [goals.fk_quest_goal],
     references: [quests.id]
   }),
   plans: many(plans),
   logs: many(goalLogs),
}))

export type Goal = InferSelectModel<typeof goals> & {
  quest: Quest;
  plans: Plan[];
  logs: GoalLog[];
}
export type GoalInsertParams = InferInsertModel<typeof goals>

export const goalLogs = pgTable('goalLogs', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  goalId: integer('goalId').references(() => goals.id).notNull(),
  value: real('value').notNull(),
  note: text('note'),
  date: date('date', {mode:'date'}).notNull(),
})

export const goalLogsRelations = relations(goalLogs, ({one}) => ({
  goal: one(goals, {
    fields: [goalLogs.goalId],
    references: [goals.id]
  })
}))

export type GoalLog = InferSelectModel<typeof goalLogs> & {
  goal: Goal
}
export type GoalLogInsertParams = InferInsertModel<typeof goalLogs>


export const plans = pgTable('plans', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('text').notNull(),
  fk_goal_plan: integer('fk_goal_plan').references(() => goals.id),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  start: date('start', {mode:'date'}).defaultNow().notNull(),
  end: date('end', {mode:'date'}).default(sql`CURRENT_DATE + interval '1 month'`).notNull(),
  frequency: text('frequency'),
})

export const plansRelations = relations(plans, ({one, many}) => ({
  goal: one(goals, {
    fields: [plans.fk_goal_plan],
    references: [goals.id],
  }),
  logs: many(planLogs)
}));

export type Plan = InferSelectModel<typeof plans> & {
  goal: Goal
  logs: PlanLog[]
}

export type PlanInsertParams = InferInsertModel<typeof plans>

export const planLogs = pgTable('planLogs', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  planId: integer('planId').references(() => plans.id).notNull(),
  note: text('note'),
  date: date('date', {mode:'date'}).notNull(),
  duration: integer('duration'),
  start: time('start')
})

export const planLogsRelations = relations(planLogs, ({one}) => ({
  plan: one(plans, {
    fields: [planLogs.planId],
    references: [plans.id]
  })
}))

export type PlanLog = InferSelectModel<typeof planLogs> & {
  plan: Plan
}
export type PlanLogInsertParams = InferInsertModel<typeof planLogs>

// utilities
export function lower(text: AnyPgColumn): SQL {
  return sql`lower(${text})`
}
