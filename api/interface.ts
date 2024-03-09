export interface TickerInterface {
    channelId: number;
    bid: number;
    bid_size: number;
    ask: number;
    ask_size: number;
    daily_change: number;
    daily_change_relative: number;
    last_price: number;
    volume: number;
    high: number;
    low: number;
  }

export type Precision = "P0" | "P1" | "P2" | "P3" | "P4";

export type Order = [number, number, number];

