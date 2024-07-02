ALTER TABLE "goalLogs" ALTER COLUMN "goalId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "goalLogs" ALTER COLUMN "value" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "planLogs" ALTER COLUMN "planId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "target" real DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "start" date DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "end" date DEFAULT CURRENT_DATE + interval '1 month';--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "start" date DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "end" date DEFAULT CURRENT_DATE + interval '1 month' NOT NULL;--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "frequency" text;