import { useCallback } from "react";

function useCurrencyConverter(baseCurrency, targetCurrency) {
  const CurrencyConstant = {
    USDEUR: 0.93,
    EURUSD: 1.07,
    GBPUSD: 1.21,
  };

  const getConversionRate = () => {
    const pair = baseCurrency + targetCurrency;
    console.log(">>> conversionRate :", pair, CurrencyConstant[pair]);
    return CurrencyConstant[pair];
  };

  const convert = useCallback(
    (amount) => {
      // Conversion logic will be placed here.
      const conversionRate = getConversionRate();
      return (conversionRate * amount).toFixed(2);
    },
    [baseCurrency, targetCurrency]
  );

  return convert;
}

export default useCurrencyConverter;
