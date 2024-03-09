import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { Precision } from "@/api";
import { clearbook, updatebook } from "@/redux/book";

export const useBook = (symbol: string, precision: Precision = "P0") => {
  const dispatch = useDispatch();
  const book = useSelector((state: RootState) => state.book.data);

  const [isConnected, setIsConnected] = useState(false);
  const  ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    return () => {
      disconnectWs();
      dispatch(clearbook());
    };
  }, [dispatch]);

  const connectWs = () => {
    if (ws.current) ws.current.close();
 
    const websocket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

    websocket.onopen = () => {
      websocket.send(
        JSON.stringify({
          event: "subscribe",
          channel: "book",
          symbol: symbol,
          prec: precision,
          freq: "F1",
        })
      );
    };

    websocket.onmessage = (event: MessageEvent) => {
      const response = JSON.parse(event.data);
      if (Array.isArray(response) && response.length === 2) {
        const [, book] = response;
        dispatch(updatebook(book));
      }
    };

    ws.current = websocket;
    setIsConnected(true);
  };

  const disconnectWs = () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
      setIsConnected(false);
    }
  };

  const toggleConnection = () => {
    if (isConnected) {
      disconnectWs();
    } else {
      connectWs();
    }
  };

  return { book, isConnected, toggleConnection };
};
