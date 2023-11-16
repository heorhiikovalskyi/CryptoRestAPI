import { eq, sql, and } from 'drizzle-orm';
import { NewExchangeRate, ExchangeRate } from '../db/schema/exchangeRates';
import { exchangeRates } from '../db/schema/exchangeRates';
import { cryptocurrencies } from '../db/schema/cryptocurrencies';
import { CurrencyAverage } from './types';
import { MySql2Database } from 'drizzle-orm/mysql2';

export class ExchangeRatesRepository {
  constructor(private db: MySql2Database) {}

  insert = async (exchanges: NewExchangeRate[]) => {
    await this.db.insert(exchangeRates).values(exchanges);
  };

  getMarketRates = async (time: number, market: number, currency: number): Promise<ExchangeRate[]> => {
    return await this.db
      .select()
      .from(exchangeRates)
      .where(
        and(
          sql`TIMESTAMPDIFF(minute,${exchangeRates.date},NOW()) <= ${time}`,
          eq(exchangeRates.market, market),
          eq(exchangeRates.cryptocurrency, currency)
        )
      );
  };

  getOneAverage = async (time: number, currency: number) => {
    return (
      await this.db
        .select({ 'average price (USD)': sql<number | null>`AVG(conversiontoUSD)` })
        .from(exchangeRates)
        .where(
          and(
            sql`timestampdiff(minute,date,now()) <= ${sql.raw(time.toString())}`,
            eq(exchangeRates.cryptocurrency, currency)
          )
        )
    )[0];
  };

  getAllAverages = async (time: number): Promise<CurrencyAverage[]> => {
    return await this.db
      .select({ 'average price (USD)': sql<number | null>`AVG(conversiontoUSD)`, symbol: cryptocurrencies.symbol })
      .from(exchangeRates)
      .leftJoin(cryptocurrencies, eq(exchangeRates.cryptocurrency, cryptocurrencies.id))
      .where(sql`timestampdiff(minute,date,now()) <= ${sql.raw(time.toString())}`)
      .groupBy(({ symbol }) => symbol);
  };
}
