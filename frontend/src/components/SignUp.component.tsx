import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

export function SignUpForm() {
  let navigate = useNavigate();
  let userName = "";
  let password = "";
  let apiKey = "";
  let apiSecretKey = "";
  return (
    <Form action="http://localhost:3001/api/users/">
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="Text"
          placeholder="Enter Username"
          name="userName"
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
          name="password"
          onChange={(e) => {
            password = e.target.value;
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>바이낸스 API KEY</Form.Label>
        <Form.Control
          type="Text"
          placeholder="API KEY"
          name="apiKey"
          onChange={(e) => {
            apiSecretKey = e.target.value;
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>바이낸스 Secret KEY</Form.Label>
        <Form.Control
          type="password"
          placeholder="Secert KEY"
          name="apiSecretKey"
          onChange={(e) => {
            apiKey = e.target.value;
          }}
        />
      </Form.Group>
      <Button
        className="login-btn"
        variant="light"
        type="button"
        onClick={() => {
          axios
            .post("http://localhost:3001/api/users/", {
              userName: userName,
              password: password,
              apiKey: apiKey,
              apiSecretKey: apiSecretKey,
            })
            .then((result) => {
              navigate("/SignUpResult", { state: result.data.userName });
            })
            .catch((error: AxiosError) => {
              if (error.response?.status === 400) {
                alert("이미 존재하는 아이디입니다.");
              } else {
                console.log(error);
              }
            });
        }}
      >
        Create Account
      </Button>
    </Form>
  );
}
