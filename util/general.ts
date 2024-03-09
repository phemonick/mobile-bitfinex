// format ticker
export const formatTradePair = (tradePair: string) => {
    if (tradePair.startsWith('t') && tradePair.length >= 7) {
      const tradeCurrency = tradePair.slice(1, 4);
      const sellCurrency = tradePair.slice(4);
      return `${tradeCurrency}/${sellCurrency}`;
    } else {
      return tradePair;
    }
  }
