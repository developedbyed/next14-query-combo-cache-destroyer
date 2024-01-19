ALTER TABLE "likes" DROP CONSTRAINT "likes_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "likes" DROP COLUMN IF EXISTS "user";