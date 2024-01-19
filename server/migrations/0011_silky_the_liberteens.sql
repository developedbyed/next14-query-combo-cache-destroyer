ALTER TABLE "likes" DROP CONSTRAINT "likes_post_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" ADD COLUMN "user" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_user_user_id_fk" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
