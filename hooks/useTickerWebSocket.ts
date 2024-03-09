import { TickerInterface } from '@/api';
import { useEffect, useState } from 'react';


const useTickerWebSocket = (ticker: string) => {
  const [detail, setDetail] = useState<TickerInterface | null>(null);

  useEffect(() => {
    const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          event: "subscribe",
          channel: "ticker",
          symbol: ticker,
        })
      );
    };

    ws.onmessage = (evt) => {
      const data = JSON.parse(evt.data);

      if (Array.isArray(data) && Array.isArray(data[1])) {
        setDetail({
          channelId: data[0],
          bid: data[1][0],
          bid_size: data[1][1],
          ask: data[1][2],
          ask_size: data[1][3],
          daily_change: data[1][4],
          daily_change_relative: data[1][5],
          last_price: data[1][6],
          volume: data[1][7],
          high: data[1][8],
          low: data[1][9],
        });
      }
    };

    return () => {
        ws.close();
    };
  }, [ticker]);

  return detail;
};

export default useTickerWebSocket;
