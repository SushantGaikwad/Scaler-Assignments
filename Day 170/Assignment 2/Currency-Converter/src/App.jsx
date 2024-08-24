import React, { useState } from "react";
import "./App.css";
import useCurrencyConverter from "./useCurrencyConverter";

function App() {
  // States for each currency input
  const [usdAmount, setUsdAmount] = useState("");
  const [eurAmount, setEurAmount] = useState("");
  const [gbpAmount, setGbpAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [usdToEur, setusdToEur] = useState("");
  const [eurToUsd, setEurToUsd] = useState("");
  const [gbptoUsd, setGbpToUsd] = useState("");

  const convert = useCurrencyConverter(fromCurrency, toCurrency);

  // Event handlers for input changes (students need to complete these)
  const handleUsdAmountChange = (event) => {
    setUsdAmount(event.target.value);
    // Call conversion function and set result for EUR
    setFromCurrency("USD");
    setToCurrency("EUR");
    const ans = convert(event.target.value);
    setusdToEur(ans);
  };

  const handleEurAmountChange = (event) => {
    setEurAmount(event.target.value);
    // Call conversion function and set result for USD
    setFromCurrency("EUR");
    setToCurrency("USD");
    const ans = convert(event.target.value);
    setEurToUsd(ans);
  };

  const handleGbpAmountChange = (event) => {
    setGbpAmount(event.target.value);
    // Call conversion function and set result for USD
    setFromCurrency("GBP");
    setToCurrency("USD");
    const ans = convert(event.target.value);
    setGbpToUsd(ans);
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div>
        <label>USD to EUR:</label>
        <input
          type="number"
          value={usdAmount}
          onChange={handleUsdAmountChange}
          placeholder="Enter USD amount"
        />
        <p>Converted to EUR: {usdToEur}</p>
      </div>
      <div>
        <label>EUR to USD:</label>
        <input
          type="number"
          value={eurAmount}
          onChange={handleEurAmountChange}
          placeholder="Enter EUR amount"
        />
        <p>Converted to USD: {eurToUsd}</p>
      </div>
      <div>
        <label>GBP to USD:</label>
        <input
          type="number"
          value={gbpAmount}
          onChange={handleGbpAmountChange}
          placeholder="Enter GBP amount"
        />
        <p>Converted to USD: {gbptoUsd}</p>
      </div>
    </div>
  );
}

export default App;
