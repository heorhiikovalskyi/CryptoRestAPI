import { currencies } from '../types/enums/Currencies';
import { ExchangeRatesRepository } from '../repositories/ExchangeRates';

class CurrenciesService {
  constructor(private exchangeRates: ExchangeRatesRepository) {}
  public getAll = () => {
    return currencies;
  };
}

export default CurrenciesService;
