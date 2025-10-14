CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"company" text NOT NULL,
	"position" text NOT NULL,
	"platform" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"link" text,
	"type" text,
	"status" text
);
