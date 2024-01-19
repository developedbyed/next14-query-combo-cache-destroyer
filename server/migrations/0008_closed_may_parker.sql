DO $$ BEGIN
 ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_user_id_fk" FOREIGN KEY ("post_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
