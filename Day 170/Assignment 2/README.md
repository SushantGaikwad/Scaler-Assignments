Problem Statement: Currency Converter Hook
Create a custom React hook called useCurrencyConverter that converts an amount from one currency to another using static exchange rates. This hook will facilitate currency conversions within components where such functionality is required.

Requirements:
The hook should accept two parameters:
baseCurrency: The currency from which the conversion should start.
targetCurrency: The currency to which the amount will be converted.
The hook should return a function:
convert(amount): Takes a numerical value (the amount in baseCurrency) and returns the converted amount in targetCurrency.
Use the following predefined exchange rates for conversion:
USD to EUR: 0.93
EUR to USD: 1.07
GBP to USD: 1.21
If an unsupported currency pair is used or if the input amount is not a number, the convert function should return null.