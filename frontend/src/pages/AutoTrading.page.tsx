import { Button, Card } from "react-bootstrap";
import { AutoTradingResult } from "./../components/AutoTrading.component";
import axios, { AxiosError } from "axios";
export function AutoTrading() {
  return (
    <div>
      <div className="center">
        <Card className="AutoTrading" bg="light">
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontSize: "35px" }}>
              AutoTraing
            </Card.Title>

            <Card.Text>
              <Button
                className="login-btn"
                variant="light"
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
                }}
              >
                코인 자동매매 시작
              </Button>
              <Button className="login-btn" variant="light" type="submit">
                코인 자동매매 종료
              </Button>
              <AutoTradingResult />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
