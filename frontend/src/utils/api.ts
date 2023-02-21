import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  return await axios
    .get(`${BASE_URL}/coins`)
    .then((response) => response.data.slice(0, 100));
}
