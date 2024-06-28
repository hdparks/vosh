ALTER TABLE "goals" RENAME COLUMN "name" TO "description";--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "fk_objective_goal" integer;--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "fk_goal_plan" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goals" ADD CONSTRAINT "goals_objectives_id_fk" FOREIGN KEY ("fk_objective_goal") REFERENCES "public"."objectives"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plans" ADD CONSTRAINT "plans_goals_id_fk" FOREIGN KEY ("fk_goal_plan") REFERENCES "public"."goals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
