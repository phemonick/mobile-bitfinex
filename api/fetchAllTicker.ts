import { api } from "./api";

export type Ticker = [
    symbol: string,
    bid: number,
    bid_size: number,
    ask: number,
    ask_size: number,
    daily_change: number,
    daily_change_relative: number,
    last_price: number,
    volume: number,
    high: number,
    low: number
  ];

export const cryptoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTickers: build.query<Ticker[], { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `tickers?symbols=ALL`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetTickersQuery } = cryptoApi;
  