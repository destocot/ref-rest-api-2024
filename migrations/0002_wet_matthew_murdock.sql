DO $$ BEGIN
 CREATE TYPE "public"."status_enum" AS ENUM('publishing', 'finished');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorites" (
	"user_id" uuid NOT NULL,
	"manga_id" uuid NOT NULL,
	CONSTRAINT "favorites_user_id_manga_id_pk" PRIMARY KEY("user_id","manga_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mangas" (
	"manga_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"title" varchar NOT NULL,
	"author_fname" varchar NOT NULL,
	"author_lname" varchar NOT NULL,
	"status" "status_enum" NOT NULL,
	"published_at" timestamp NOT NULL,
	"image" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorites" ADD CONSTRAINT "favorites_manga_id_mangas_manga_id_fk" FOREIGN KEY ("manga_id") REFERENCES "public"."mangas"("manga_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
