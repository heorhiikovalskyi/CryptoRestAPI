import { Request, Response } from 'express';
import AverageRatesService from '../services/AverageRates';
import Controller from './Controller';
import { currencies } from '../types/enums/Currencies';

class AverageRatesController extends Controller {
  constructor(private averageRates: AverageRatesService) {
    super('/averageRates');
    this.router.get('/', this.getAll);
    this.router.get('/:currency', this.getOne);
  }

  private getAll = async (req: Request, res: Response) => {
    const { time } = req.query;

    if (typeof time !== 'string' || !/^\d+(h|m)/.test(time)) {
      return res.status(400).send('No such time period. Try 45m or 2h for example');
    }

    try {
      const averageExchanges = await this.averageRates.getAll(time);
      return res.status(200).json(averageExchanges);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  };

  private getOne = async (req: Request, res: Response) => {
    const { time } = req.query;
    const { currency } = req.params;
    if (typeof time !== 'string' || !/^\d+(h|m)/.test(time)) {
      return res.status(400).send('No such time period. Try 45m or 2h for example');
    }

    if (!currencies.includes(currency)) {
      return res.status(400).send('No such currency');
    }

    try {
      const averageExchange = await this.averageRates.getOne(time, currency);
      return res.status(200).json(averageExchange);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  };
}
export default AverageRatesController;
