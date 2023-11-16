import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  uniqueIndex,
  int,
  varchar,
  index,
  foreignKey,
  float,
  datetime,
} from 'drizzle-orm/mysql-core';
import { markets } from './markets';
import { cryptocurrencies } from './cryptocurrencies';
import { InferModel } from 'drizzle-orm';
export const exchangeRates = mysqlTable(
  'exchangerate',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    market: int('market')
      .references(() => markets.id, { onDelete: 'set null' })
      .notNull(),
    cryptocurrency: int('cryptocurrency')
      .references(() => cryptocurrencies.id, { onDelete: 'set null' })
      .notNull(),
    conversionToUsd: float('conversiontoUSD').notNull(),
    date: datetime('date', { mode: 'string' }).notNull(),
  },
  (table) => {
    return {
      market: index('market').on(table.market),
      cryptocurrency: index('cryptocurrency').on(table.cryptocurrency),
    };
  }
);

export type NewExchangeRate = InferModel<typeof exchangeRates, 'insert'>;

export type ExchangeRate = InferModel<typeof exchangeRates, 'select'>;
