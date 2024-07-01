ALTER TABLE "objectives" RENAME TO "quests";--> statement-breakpoint
ALTER TABLE "goals" RENAME COLUMN "fk_objective_goal" TO "fk_quest_goal";--> statement-breakpoint
ALTER TABLE "goals" DROP CONSTRAINT "goals_objectives_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goals" ADD CONSTRAINT "goals_objectives_id_fk" FOREIGN KEY ("fk_quest_goal") REFERENCES "public"."quests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
