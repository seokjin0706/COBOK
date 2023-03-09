import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAutoTrading,
  fetchAutoTradingResult,
  fetchCoins,
} from "../utils/api";
import { Link } from "react-router-dom";
import Chart from "../components/CoinsChart.component";
import { useState, useEffect } from "react";
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 20px 60px 20px 0px;
  width: 1510px;
`;
const Loader = styled.div`
  text-align: center;
`;

const CoinListHeader = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
  display: flex;
  align-items: center;
  text-align: right;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 5px;
  padding: 15px;
  transition: background-color 0.2s ease-in;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background-color: ${(props) => props.theme.btnColor};

  font-size: 11px;
  font-weight: bold;
  span {
    padding-right: 17px;

    :nth-child(1) {
      padding-left: 40px;
      padding-right: 120px;
    }
    :nth-child(3) {
      padding-left: 8px;
    }

    :nth-child(4) {
      padding-left: 8px;
    }
  }
`;

const Coin = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 5px;
  padding: 15px;
  transition: background-color 0.2s ease-in;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 12px;
  :first-child {
    font-size: 11px;
    font-weight: bold;
    background-color: ${(props) => props.theme.btnColor};

    color: ${(props) => props.theme.accentColor};
  }
  div {
    padding-right: 20px;

    :nth-child(1) {
      padding-left: 40px;
      padding-right: 120px;
    }
  }
  a {
    span {
      font-weight: bold;
      margin-right: 8px;
      :nth-child(3) {
        font-size: 4px;
        color: grey;
        opacity: 0.8;
      }
    }
    img {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    width: 200px;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.textColor};
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
    background-color: ${(props) => props.theme.btnColor};
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const CoinsList = styled.div``;

const ChartContainer = styled.div`
  padding: 0px 60px 20px 60px;
  width: 100%;
`;
const ChartHeader = styled.div`
  padding: 15px 20px 15px 20px;
  background-color: ${(props) => props.theme.btnColor};
  margin-bottom: 15px;
`;
const ChartHeaderTitle = styled.div`
  span {
    :nth-child(1) {
      font-weight: bold;
      font-size: 30px;
      margin-right: 8px;
    }
    :nth-child(2) {
      font-size: 20px;
      color: grey;
      opacity: 0.8;
    }
  }
`;
const ChartHeaderPrice = styled.div`
  color: red;
  padding-top: 10px;
  span {
    :nth-child(1) {
      font-size: 40px;
      margin-right: 8px;
    }
    :nth-child(2) {
      font-size: 20px;
      opacity: 0.9;
    }
  }
`;
const ChartHeaderMaxMinPrice = styled.div`
  padding-top: 10px;
  color: ${(props) => props.theme.textColor};
  span {
    :nth-child(2) {
      font-size: 16px;
      margin-right: 8px;
      color: red;
    }
    :nth-child(4) {
      font-size: 16px;

      color: blue;
    }
  }
`;

const AutoTradingStartButton = styled.button`
  background-color: ${(props) => props.theme.btnColor};
  color: tomato;
  border-style: solid;
  border-width: 1px 1px 1px 1px;
  border-color: rgba(179, 30, 30, 0.6);
  border-radius: 5px;
  padding: 6px;
  font-size: 12px;
  margin-left: 490px;
  &:hover {
    opacity: 0.6;
  }
`;
const AutoTradingStopButton = styled.button`
  background-color: ${(props) => props.theme.btnColor};
  color: ${(props) => props.theme.textColor};
  border-style: solid;
  border-width: 1px 1px 1px 1px;
  border-color: rgba(248, 241, 241, 0.6);
  border-radius: 5px;
  padding: 6px;
  margin-left: 10px;
  font-size: 12px;

  &:hover {
    opacity: 0.6;
  }
`;
const AutoTradingResultContainer = styled.div`
  margin-left: auto;
  div {
    margin-top: 8px;
    text-align: center;
    font-weight: bold;
    color: red;
    font-size: 14px;
  }
`;
const AutoTradingResultTable = styled.table`
  font-size: 12px;

  td {
    padding-top: 10px;
    :nth-child(1) {
      font-weight: bold;
      color: grey;
    }
    :nth-child(2) {
      text-align: right;
      width: 100px;
      padding-right: 10px;
    }
    :nth-child(3) {
      font-weight: bold;
      color: grey;
    }
    :nth-child(4) {
      text-align: right;
      width: 100px;
    }
  }
`;

const ProfitText = styled.span<{ color: string }>`
  color: ${(props) => props.color};
`;

interface IAutoTradingResult {
  raw_Time: string;
  time: string;
  average: string;
  leverage: string;
  quantity: string;
  profit_rate: number;
  profit: number;
  signal: string;
  total_profit: string;
  coin_curr_price: string;
  position_wallet: string;
  Free_wallet: string;
  Total_wallet: string;
}
export function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["coins"],
    queryFn: fetchCoins,
  });
  const {
    isLoading: autoTradingLoading,
    data: autoTradingData,
    refetch,
  } = useQuery({
    queryKey: ["autoTrading"],
    queryFn: fetchAutoTrading,
    enabled: false,
  });
  const [resultLoading, setResultLoading] = useState(false);
  const [autoTradingResult, setAutoTradingResult] =
    useState<IAutoTradingResult>();
  const [signal, setSignal] = useState<string | undefined>();
  const [leverage, setLeverage] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<string | undefined>();
  const [profit, setProfit] = useState<number | undefined>();
  const [profitRate, setProfitRate] = useState<number | undefined>();
  const [average, setAverage] = useState<string | undefined>();
  const [curCoinPirce, setCurCoinPrice] = useState<string | undefined>();

  useEffect(() => {
    setSignal(autoTradingResult?.signal);
    setLeverage(autoTradingResult?.leverage);
    setQuantity(autoTradingResult?.quantity);
    setProfit(autoTradingResult?.profit);
    setProfitRate(autoTradingResult?.profit_rate);
    setAverage(autoTradingResult?.average);
    setCurCoinPrice(autoTradingResult?.coin_curr_price);
  }, [autoTradingResult]);

  return (
    <Container>
      <ChartContainer>
        <ChartHeader>
          <ChartHeaderTitle>
            <span>Bitcoin</span>
            <span>BTC</span>
            <AutoTradingStartButton
              type="button"
              onClick={() => {
                setResultLoading(true);
                refetch();
                setInterval(async () => {
                  const result = await fetchAutoTradingResult();
                  setAutoTradingResult(result.data);
                  setResultLoading(false);
                }, 5000);
              }}
            >
              오토 트레이딩 시작
            </AutoTradingStartButton>
            <AutoTradingStopButton>오토 트레이딩 종료</AutoTradingStopButton>
          </ChartHeaderTitle>
          <div style={{ display: "flex" }}>
            <div>
              <ChartHeaderPrice>
                <span>$0.999999</span>
                <span>+2.67%</span>
              </ChartHeaderPrice>
              <ChartHeaderMaxMinPrice>
                <span>고가 </span>
                <span>$0.123239999</span>
                <span>저가 </span>
                <span>$0.32999</span>
              </ChartHeaderMaxMinPrice>
            </div>
            <AutoTradingResultContainer>
              <AutoTradingResultTable>
                <tr>
                  <td>시그널</td>
                  <td>{signal}</td>
                  <td>레버리지</td>
                  <td>{leverage}X</td>
                </tr>
                <tr>
                  <td>총 매수</td>
                  <td>${average}</td>
                  <td>평가손익</td>{" "}
                  <td>
                    {profitRate! >= 0 ? (
                      <ProfitText color={"red"}>{profit}$</ProfitText>
                    ) : (
                      <ProfitText color={"blue"}>{profit}$</ProfitText>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>총 평가</td>
                  <td>${curCoinPirce}</td>
                  <td>수익률</td>
                  <td>
                    {profitRate! >= 0 ? (
                      <ProfitText color={"red"}>{profitRate}%</ProfitText>
                    ) : (
                      <ProfitText color={"blue"}>{profitRate}%</ProfitText>
                    )}
                  </td>
                </tr>
              </AutoTradingResultTable>
              {resultLoading ? <div>"loading..." </div> : null}
            </AutoTradingResultContainer>
          </div>
        </ChartHeader>
        <Chart />
      </ChartContainer>
      <CoinsList>
        <CoinListHeader>
          <span>코인명</span>
          <span>순위</span>
          <span>가격</span>
          <span>변동률(24H)</span>
        </CoinListHeader>

        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          data?.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                <span>{coin.name}</span>
                <span>{coin.symbol}</span>
              </Link>
              <div>{coin.rank}</div>
              <div>$0.999999</div>
              <div>+2.67%</div>
            </Coin>
          ))
        )}
      </CoinsList>
    </Container>
  );
}
