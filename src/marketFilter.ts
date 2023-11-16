import 'dotenv/config';
import { FilterService } from './services/Filter';
import HelperService from './services/Helper';

const { COIN_MARKET_CAP_API_KEY } = process.env;

const filterService = new FilterService(new HelperService());

export const marketFilter = [
  {
    url: 'http://api.coinstats.app/public/v1/coins?currency=USD',
    filter: filterService.filterCointStats,
  },
  {
    url: `http://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${COIN_MARKET_CAP_API_KEY}`,
    filter: filterService.filterCoinMarketCap,
  },
  {
    url: 'http://api.coinbase.com/v2/exchange-rates',
    filter: filterService.filterCoinBase,
  },
  {
    url: 'http://api.kucoin.com./api/v1/prices',
    filter: filterService.filterKucoin,
  },
  {
    url: 'http://api.coinpaprika.com/v1/tickers',
    filter: filterService.filterCoinPaprika,
  },
];
