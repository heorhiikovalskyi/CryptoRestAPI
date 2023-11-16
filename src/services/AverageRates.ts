import { ExchangeRatesRepository } from '../repositories/ExchangeRates';
import HelperService from './Helper';
import { Currencies } from '../types/enums/Currencies';

class AverageRatesService {
  constructor(private exchangeRates: ExchangeRatesRepository, private helper: HelperService) {}
  public getAll = async (time: string) => {
    const minutesTime = this.helper.timeStringToMinutes(time);
    return await this.exchangeRates.getAllAverages(minutesTime);
  };

  public getOne = async (time: string, currency: string) => {
    const minutesTime = this.helper.timeStringToMinutes(time);
    const currencyId = Currencies[currency as keyof typeof Currencies];
    return await this.exchangeRates.getOneAverage(minutesTime, currencyId);
  };
}

export default AverageRatesService;
