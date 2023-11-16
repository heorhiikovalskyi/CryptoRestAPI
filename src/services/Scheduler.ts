import axios from 'axios';
import { ExchangeRatesRepository } from '../repositories/ExchangeRates';
import { marketFilter } from '../marketFilter';
import cron from 'node-cron';

class SchedulerService {
  constructor(private exchangeRates: ExchangeRatesRepository) {}
  private updateDb = () => {
    marketFilter.forEach(async (element) => {
      const { url, filter } = element;
      try {
        const response = await axios({
          method: 'get',
          url: url,
          responseType: 'json',
        });
        const exchanges = filter(response);
        await this.exchangeRates.insert(exchanges);
      } catch (err) {
        console.log(err);
      }
    });
  };

  public scheduleTask = (frequency: number) => {
    cron.schedule(`*/${frequency} * * * *`, this.updateDb);
  };
}

export default SchedulerService;
