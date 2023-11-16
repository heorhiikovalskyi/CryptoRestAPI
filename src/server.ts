import App from './app';
import { db } from './db/db';
import AverageRatesController from './controllers/AverageRates';
import AverageRatesService from './services/AverageRates';
import CurrenciesController from './controllers/Currencies';
import CurrenciesService from './services/Currencies';
import ExchangeRatesController from './controllers/ExchangeRates';
import ExchangeRatesService from './services/ExchangeRates';
import { ExchangeRatesRepository } from './repositories/ExchangeRates';
import HelperService from './services/Helper';
import SchedulerService from './services/Scheduler';

const { PORT } = process.env;

const main = async () => {
  const exchangeRatesRepository = new ExchangeRatesRepository(db);
  const helperService = new HelperService();
  const averageRatesService = new AverageRatesService(exchangeRatesRepository, helperService);
  const averageRatesController = new AverageRatesController(averageRatesService);
  const currenciesService = new CurrenciesService(exchangeRatesRepository);
  const currenciesController = new CurrenciesController(currenciesService);
  const exchangeRatesService = new ExchangeRatesService(exchangeRatesRepository, helperService);
  const exchangeRatesController = new ExchangeRatesController(exchangeRatesService);

  const controllers = [averageRatesController, currenciesController, exchangeRatesController];
  const app = new App(Number(PORT), controllers);

  const schedulerService = new SchedulerService(exchangeRatesRepository);

  schedulerService.scheduleTask(5);

  app.start();
};
main();
