import axios, { AxiosError } from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  return await axios
    .get(`${BASE_URL}/coins`)
    .then((response) => response.data.slice(0, 15));
}

export async function fetchAutoTrading() {
  return await axios
    .get("http://localhost:8000/api/btc/auto-trading")
    .then((response) => response);
}

export async function fetchAutoTradingResult(): Promise<any> {
  return await axios
    .get("http://localhost:8000/api/btc/auto-trading-data")
    .then((response) => {
      return response;
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
}
