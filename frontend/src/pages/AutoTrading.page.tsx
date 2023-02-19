import { AutoTradingResult } from "./../components/AutoTrading.component";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  margin: 128px auto;
  max-width: 800px;
`;

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
const Welcome = styled.h1`
  font-size: 26px;
  margin-bottom: 20px;
  text-align: center;
`;
export function AutoTrading() {
  return (
    <Container>
      <Welcome>코인 자동 매매</Welcome>

      <Button
        className="login-btn"
        type="button"
        onClick={() => {
          axios
            .post("http://localhost:8000/api/btc/auto-trading", {
              userName: "seokjin2",
              apiKey:
                "yqrURCKivzwjsTyzxs16JIotlcVVUbHKq71uQQcqIYACzeMwU65BY3HDgqnB2ijL",
              apiSecretKey:
                "gyfUDaf559JJA8qmqQE8ZK3pOUd7vad26ZUEYOalpUVy5ScBBWnJOFNZSkyeUMjF",
            })
            .then((result) => {});
          setInterval(() => {
            document.getElementById("refresh-btn-id")?.click();
          }, 5000);
        }}
      >
        코인 자동매매 시작
      </Button>
      <Button className="login-btn" type="submit">
        코인 자동매매 종료
      </Button>
      <AutoTradingResult />
    </Container>
  );
}
