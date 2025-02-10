import {
	mysqlTable,
	text,
	varchar,
	int,
	decimal,
	date
} from 'drizzle-orm/mysql-core';

import { v4 as uuidv4 } from 'uuid';

export const category = mysqlTable('Categoria', {
	id: int('id').primaryKey().autoincrement(),
	name: text('nome').notNull(),
	type: text('tipo', { enum: ['entrada', 'saida'] }).notNull()
});

export const payment_method = mysqlTable('MetodoPagamento', {
	id: int('id').primaryKey().autoincrement(),
	name: text('name').notNull()
});

export const vendedora = mysqlTable('Vendedora', {
	id: varchar('id', { length: 36 }).primaryKey().$defaultFn(uuidv4),
	name: text('nome').notNull(),
	phone: text('telefone').notNull(),
	address: text('endereco').notNull()
});

export const transaction = mysqlTable('Transacao', {
	id: varchar('id', { length: 36 }).primaryKey().$defaultFn(uuidv4),
	payer_id: varchar('pagador_id', { length: 36 }).references(
		() => vendedora.id
	),
	amount: decimal('valor', { precision: 2 }).notNull(),
	category_id: int('categoria_id').references(() => category.id),
	payment_method_id: int('metodo_pagamento_id').references(
		() => payment_method.id
	),
	date: date('data').notNull(),
	description: text('descricao')
});
