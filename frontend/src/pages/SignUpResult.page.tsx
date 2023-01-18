import { Card, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
export function SignUpResult() {
  let navigate = useNavigate();
  console.log(useLocation());
  return (
    <div>
      <div className="center">
        <Card className="sign-up-result" bg="light text-center">
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontSize: "35px" }}>
              Welcome to COBOK
            </Card.Title>
            <Card.Text>
              {useLocation().state}님 회원가입을 축하드립니다.
            </Card.Text>
          </Card.Body>
          <Button
            className="login-btn"
            variant="light"
            type="submit"
            onClick={() => {
              navigate("/Login");
            }}
          >
            로그인
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
            className="login-btn"
            variant="light"
            type="submit"
          >
            메인 페이지
          </Button>
        </Card>
      </div>
    </div>
  );
}
