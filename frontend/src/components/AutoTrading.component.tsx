import axios, { AxiosError } from "axios";
import { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props.theme.btnColor};
  width: 100%;
  border-style: solid;
  border-width: 1px 1px 1px 1px;
  border-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  color: white;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
  margin: 10px 10px;
`;

const OverviewContainer = styled.div<{ ratio: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.ratio}, 1fr);
`;
const Overview = styled.div`
  width: 100%;
  justify-content: space-between;

  background-color: ${(props) => props.theme.btnColor};
  padding: 30px 20px;
  border-radius: 10px;
  margin: 15px 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
interface IResult {
  Free_wallet: string;
  Total_wallet: string;
  average: string;
  coin_curr_price: string;
  leverage: string;
  position_wallet: string;
  profit: string;
  profit_rate: string;
  quantity: string;
  raw_Time: string;
  signal: string;
  time: string;
  total_profit: string;
}

export function AutoTradingResult() {
  const [result, setResult] = useState<IResult>();
  return (
    <>
      <Button
        id="refresh-btn-id"
        className="refresh-btn"
        type="submit"
        onClick={() => {
          axios
            .get("http://localhost:8000/api/btc/auto-trading-data")
            .then((result) => {
              console.log(result.data);
              setResult(result.data);
            })
            .catch((error: AxiosError) => {
              console.log(error);
            });
        }}
      >
        코인 자동매매 결과 새로고침
      </Button>

      <OverviewContainer ratio={1}>
        <Overview>
          <OverviewItem>
            <span>현재 시각</span>
            <span>{result?.time}</span>
          </OverviewItem>
        </Overview>
      </OverviewContainer>
      <OverviewContainer ratio={1}>
        <Overview>
          <OverviewItem>
            <span>총 입금액</span>
            <span>{result?.Total_wallet}</span>
          </OverviewItem>
        </Overview>
      </OverviewContainer>
      <OverviewContainer ratio={1}>
        <Overview>
          <OverviewItem>
            <span>현재 현금 보유량</span>
            <span>{result?.Free_wallet}</span>
          </OverviewItem>
        </Overview>
      </OverviewContainer>
      <OverviewContainer ratio={2}>
        <Overview>
          <OverviewItem>
            <span>현재 코인 가격</span>
            <span>{result?.coin_curr_price}$</span>
          </OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>
            <span>현재 코인 보유 수량</span>
            <span>{result?.quantity}</span>
          </OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>
            <span>현재 매매 평단가</span>
            <span>{result?.average}$</span>
          </OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>
            <span>현재 매매 적용 레버리지</span>
            <span>{result?.average}X</span>
          </OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>
            <span>현재 포지션 수익률</span>
            <span>{result?.profit_rate}%</span>
          </OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>
            <span>현재 포지션 수익(달러)</span>
            <span>{result?.profit}$</span>
          </OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>
            <span>현재 총 수익(달러)</span>
            <span>{result?.total_profit}$</span>
          </OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>
            <span>매수매도 시그널</span>
            <span>{result?.signal}</span>
          </OverviewItem>
        </Overview>
      </OverviewContainer>
    </>
  );
}
