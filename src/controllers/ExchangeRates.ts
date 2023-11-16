import { Request, Response } from 'express';
import ExchangeRatesService from '../services/ExchangeRates';
import Controller from './Controller';
import { markets } from '../types/enums/Markets';
import { currencies } from '../types/enums/Currencies';

class ExchangeRatesController extends Controller {
  constructor(private exchangeRates: ExchangeRatesService) {
    super('/exchangeRates');
    this.router.get('/market/:market', this.getByMarket);
  }

  private getByMarket = async (req: Request, res: Response) => {
    const { time, currency } = req.query;
    let { market } = req.params;
    market = market.toLowerCase();

    if (typeof time !== 'string' || !/^\d+(h|m)/.test(time)) {
      return res.status(400).send('No such time period. Try 45m or 2h for example');
    }

    if (typeof currency !== 'string' || !currencies.includes(currency)) {
      return res.status(400).send('No such currency');
    }

    if (!markets.includes(market)) {
      return res.status(400).send('No such market');
    }

    try {
      const averageExchange = await this.exchangeRates.getByMarket(time, market, currency);
      return res.status(200).json(averageExchange);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  };
}
export default ExchangeRatesController;
