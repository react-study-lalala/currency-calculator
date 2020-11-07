import React, { useEffect, useState } from "react";
import CurrencyResponse from "./interfaces/CurrencyResponse";
import CURRENCIES from "./enums/currencies";

function App() {
  const [amountFrom, setAmountFrom] = useState<number>(100);
  const [rateFrom, setRateFrom] = useState<number>(0);
  const [currencyFrom, setCurrencyFrom] = useState<CURRENCIES>(CURRENCIES.KRW);

  const [amountTo, setAmountTo] = useState<number>(0);
  const [rateTo, setRateTo] = useState<number>(0);
  const [currencyTo, setCurrencyTo] = useState<CURRENCIES>(CURRENCIES.USD);

  const [currencies, setCurrencies] = useState<CurrencyResponse>();

  useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest?base=${currencyFrom}`)
      .then((res) => res.json())
      .then((result: CurrencyResponse) => {
        setCurrencies(() => result);
      });
  }, [currencyFrom]);

  useEffect(() => {
    setRateFrom(() => currencies?.rates?.[currencyFrom] || 1);
    setRateTo(() => currencies?.rates?.[currencyTo] || 1);
  }, [currencyFrom, currencyTo, currencies]);

  useEffect(() => {
    setAmountTo(() => amountFrom * rateFrom * rateTo);
  }, [amountFrom, rateFrom, rateTo]);

  return (
    <div className="l_page">
      <section className="l_section">
        <label htmlFor="from-amount">From</label>
        <select
          name="rate-from"
          id="rate-from"
          value={currencyFrom}
          onChange={(e) => setCurrencyFrom(e.target.value as CURRENCIES)}
        >
          {Object.values(CURRENCIES).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <input
          name="from-amount"
          id="from-amount"
          type="text"
          onChange={(e) => setAmountFrom(Number(e.target.value))}
          value={amountFrom}
        />
      </section>
      <section className="l_section">
        <label htmlFor="to-amount">To</label>
        <select
          name="rate-to"
          id="rate-to"
          value={currencyTo}
          onChange={(e) => setCurrencyTo(e.target.value as CURRENCIES)}
        >
          {Object.values(CURRENCIES).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <input
          name="to-amount"
          id="to-amount"
          type="text"
          onChange={(e) => setAmountTo(Number(e.target.value))}
          value={amountTo}
        />
      </section>
    </div>
  );
}

export default App;
