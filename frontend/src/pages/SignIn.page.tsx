import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  margin: 128px auto;
  max-width: 480px;
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.inputColor};
  width: 422px;
  border-style: solid;
  border-width: 1px 1px 1px 1px;
  border-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  margin-bottom: 30px;
  margin-top: 15px;
  padding: 15px;
  color: white;
`;

const SignInButton = styled.button`
  background-color: ${(props) => props.theme.btnColor};
  width: 422px;
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
`;
const SignUpButton = styled.button`
  background-color: ${(props) => props.theme.btnColor};
  width: 422px;
  border-style: solid;
  border-width: 1px 1px 1px 1px;
  border-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  margin-top: 15px;
  padding: 15px;
  color: white;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
`;

const Welcome = styled.h1`
  font-size: 26px;
  margin-bottom: 20px;
`;
const Description = styled.h2`
  font-weight: 100;
  opacity: 0.6;
  margin-bottom: 36px;
`;

export function SignIn() {
  let navigate = useNavigate();
  let userName: string | undefined = undefined;
  let password: string | undefined = undefined;
  return (
    <Container>
      <Welcome>๐ฐCOBOK์ ์ค์  ๊ฒ์ ํ์ํฉ๋๋ค.</Welcome>
      <Description>
        COBOK์ ๊ฐ์ํํ ์ถ์ธ ์์ธก ๋ฐ ์๋ ๋งค๋งค ์๋น์ค์๋๋ค.{" "}
      </Description>
      <p>๋๋ค์</p>
      <Input
        type="Text"
        placeholder="๋๋ค์์ ์๋ ฅํด์ฃผ์ธ์"
        onChange={(e) => {
          userName = e.target.value;
        }}
      ></Input>
      <p>๋น๋ฐ๋ฒํธ</p>
      <Input
        type="password"
        placeholder="๋น๋ฐ๋ฒํธ๋ฅผ ์๋ ฅํด์ฃผ์ธ์"
        onChange={(e) => {
          password = e.target.value;
        }}
      ></Input>
      <SignInButton
        className="login-btn"
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
                alert("์์ด๋ ๋๋ ๋น๋ฐ๋ฒํธ๊ฐ ํ๋ ธ์ต๋๋ค.");
              } else if (error.response?.status === 400) {
                alert("์์ด๋์ ๋น๋ฐ๋ฒํธ๋ฅผ ์๋ ฅํด์ฃผ์ธ์.");
              } else {
                console.log(error);
              }
            });
        }}
      >
        ๋ก๊ทธ์ธ
      </SignInButton>
      <SignUpButton
        onClick={() => {
          navigate("/SignUp");
        }}
        className="login-btn"
        type="submit"
      >
        ํ์๊ฐ์
      </SignUpButton>
    </Container>
  );
}
