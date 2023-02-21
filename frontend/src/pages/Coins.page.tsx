import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../utils/api";
import { Link } from "react-router-dom";
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

  padding: 20px 60px 20px 60px;
  width: 100%;
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
    padding-right: 20px;

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
  padding: 20px;
  background-color: ${(props) => props.theme.btnColor};
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
const ChartGraph = styled.div`
  margin-top: 50px;
  padding: 60px;
  background-color: ${(props) => props.theme.btnColor};
`;

export function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["coins"],
    queryFn: fetchCoins,
  });

  return (
    <Container>
      <ChartContainer>
        <ChartHeader>
          <ChartHeaderTitle>
            <span>Bitcoin</span>
            <span>BTC</span>
          </ChartHeaderTitle>
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
        </ChartHeader>
        <ChartGraph>
          <p>그래프</p>
        </ChartGraph>
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
