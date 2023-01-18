import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
export function LoginForm() {
  let navigate = useNavigate();
  let userName: string | undefined = undefined;
  let password: string | undefined = undefined;
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="Text"
          placeholder="Enter Username"
          onChange={(e) => {
            userName = e.target.value;
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => {
            password = e.target.value;
          }}
        />
      </Form.Group>

      <Button
        className="login-btn"
        variant="light"
        type="button"
        onClick={() => {
          axios
            .post("http://localhost:3001/api/users/login", {
              userName,
              password,
            })
            .then((result) => {
              localStorage.setItem("accessToken", result.data.accessToken);
              window.location.href = "/";
            })
            .catch((error: AxiosError) => {
              if (error.response?.status === 401) {
                alert("아이디 또는 비밀번호가 틀렸습니다.");
              } else if (error.response?.status === 400) {
                alert("아이디와 비밀번호를 입력해주세요.");
              } else {
                console.log(error);
              }
            });
        }}
      >
        Login
      </Button>
      <Button
        onClick={() => {
          navigate("/SignUp");
        }}
        className="login-btn"
        variant="light"
        type="submit"
      >
        Create Account
      </Button>
    </Form>
  );
}
