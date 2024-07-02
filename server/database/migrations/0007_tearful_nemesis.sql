CREATE TABLE IF NOT EXISTS "goalLogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"goalId" integer,
	"value" numeric NOT NULL,
	"note" text,
	"date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "planLogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"planId" integer,
	"note" text,
	"date" date NOT NULL,
	"duration" integer,
	"start" time
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goalLogs" ADD CONSTRAINT "goalLogs_goalId_goals_id_fk" FOREIGN KEY ("goalId") REFERENCES "public"."goals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "planLogs" ADD CONSTRAINT "planLogs_planId_plans_id_fk" FOREIGN KEY ("planId") REFERENCES "public"."plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
