import { Request, Response } from 'express';
import CurrenciesService from '../services/Currencies';
import Controller from './Controller';

class CurrenciesController extends Controller {
  constructor(private currencies: CurrenciesService) {
    super('/currencies');
    this.router.get('/', this.getAll);
  }

  private getAll = async (req: Request, res: Response) => {
    return res.status(200).json(this.currencies.getAll());
  };
}
export default CurrenciesController;
