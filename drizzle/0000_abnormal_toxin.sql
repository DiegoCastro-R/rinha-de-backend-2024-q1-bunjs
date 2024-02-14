-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "clientes" (
	"id" serial PRIMARY KEY NOT NULL,
	"limite" integer NOT NULL,
	"saldo" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transacoes" (
	"id" serial PRIMARY KEY NOT NULL,
	"cliente_id" integer NOT NULL,
	"valor" integer NOT NULL,
	"tipo" text NOT NULL,
	"descricao" text NOT NULL,
	"realizada_em" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/