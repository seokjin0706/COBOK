import { Table } from 'react-bootstrap'

export function AutoTradingResult() {
  return (
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
          <td>2023-01-05 04:47:00</td>
          <td>16835.2</td>
          <td>0.000</td>
          <td>0.0</td>
          <td>10X</td>
          <td>1000.0%</td>
          <td>0.0$</td>
          <td>매수</td>
          <td>0.0$</td>
        </tr>
        <tr>
          <td>2023-01-05 04:47:00</td>
          <td>16835.2</td>
          <td>0.000</td>
          <td>0.0</td>
          <td>10X</td>
          <td>1000.0%</td>
          <td>0.0$</td>
          <td>매도</td>
          <td>0.0$</td>
        </tr>
        <tr>
          <td>2023-01-05 04:47:00</td>
          <td>16835.2</td>
          <td>0.000</td>
          <td>0.0</td>
          <td>10X</td>
          <td>1000.0%</td>
          <td>0.0$</td>
          <td>관망</td>
          <td>0.0$</td>
        </tr>

      </tbody>
    </Table>
  );
}
