import { pgTable, serial, integer, foreignKey, text, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const clientes = pgTable("clientes", {
	id: serial("id").primaryKey().notNull(),
	limite: integer("limite").notNull(),
	saldo: integer("saldo").notNull(),
});

export const transacoes = pgTable("transacoes", {
	id: serial("id").primaryKey().notNull(),
	clienteId: integer("cliente_id").notNull().references(() => clientes.id),
	valor: integer("valor").notNull(),
	tipo: text("tipo").notNull(),
	descricao: text("descricao").notNull(),
	realizadaEm: timestamp("realizada_em", { mode: 'string' }).defaultNow(),
});