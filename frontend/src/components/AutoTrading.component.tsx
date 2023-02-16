import { Table, Button } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import { useState } from "react";

interface IResult {
  Free_wallet: string;
  Total_wallet: string;
  average: string;
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
    <div>
      <Button
        className="login-btn"
        variant="light"
        type="submit"
        onClick={() => {
          axios
            .get("http://localhost:8000/api/btc/auto-trading-data")
            .then((result) => {
              setResult(result.data);
            })
            .catch((error: AxiosError) => {
              console.log(error);
            });
        }}
      >
        결과 새로고침
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Time</th>
            <th>현재 코인 가격</th>
            <th>현재 보유 수량</th>
            <th>현재 평단가</th>
            <th>현재 적용 레버리지</th>
            <th>현재 포지션 수익률</th>
            <th>현재 포지션 수익(달러)</th>
            <th>매수매도 시그널</th>
            <th>토탈 수익(달러)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{result?.time}</td>
            <td>코인가격</td>
            <td>{result?.quantity}</td>
            <td>평단가?</td>
            <td>{result?.average}X</td>
            <td>{result?.profit_rate}%</td>
            <td>{result?.profit}$</td>
            <td>{result?.signal}</td>
            <td>{result?.total_profit}$</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
