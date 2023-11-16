import { ExchangeRatesRepository } from '../repositories/ExchangeRates';
import HelperService from './Helper';
import { Currencies } from '../types/enums/Currencies';
import { markets } from '../types/enums/Markets';

class ExchangeRatesService {
  constructor(private exchangeRates: ExchangeRatesRepository, private helper: HelperService) {}
  public getByMarket = async (time: string, market: string, currency: string) => {
    const minutesTime = this.helper.timeStringToMinutes(time);
    const marketId = markets.indexOf(market) + 1;
    const currencyId = Currencies[currency as keyof typeof Currencies];
    const marketExchanges = await this.exchangeRates.getMarketRates(minutesTime, marketId, currencyId);
    return marketExchanges.map(({ date, conversionToUsd }) => ({
      date,
      conversionToUsd,
    }));
  };
}

export default ExchangeRatesService;
