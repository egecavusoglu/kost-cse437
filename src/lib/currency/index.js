const currencyDictionary = {
  usd: {
    symbol: '$',
  },
};

function getCurrencySymbol(code) {
  if (code in currencyDictionary) {
    return currencyDictionary[code].symbol;
  }
  return code;
}

export { getCurrencySymbol };
