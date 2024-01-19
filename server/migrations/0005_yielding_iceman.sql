ALTER TABLE "posts" RENAME COLUMN "author_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_author_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
