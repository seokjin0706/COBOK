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

const SignUpButton = styled.button`
  display: block;
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

const Welcome = styled.h1`
  font-size: 26px;
  margin-bottom: 20px;
`;
const Description = styled.h2`
  font-weight: 100;
  opacity: 0.6;
  margin-bottom: 36px;
`;

export function SignUp() {
  let navigate = useNavigate();
  let userName = "";
  let password = "";
  let apiKey = "";
  let apiSecretKey = "";
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
        name="userName"
        onChange={(e) => {
          userName = e.target.value;
        }}
      ></Input>
      <p>๋น๋ฐ๋ฒํธ</p>
      <Input
        type="password"
        placeholder="๋น๋ฐ๋ฒํธ๋ฅผ ์๋ ฅํด์ฃผ์ธ์"
        name="password"
        onChange={(e) => {
          password = e.target.value;
        }}
      ></Input>
      <p>๋ฐ์ด๋ธ์ค API KEY</p>
      <Input
        type="password"
        placeholder="๋ฐ์ด๋ธ์ค API KEY"
        name="apiKey"
        onChange={(e) => {
          apiSecretKey = e.target.value;
        }}
      ></Input>
      <p>๋ฐ์ด๋ธ์ค API SECRET KEY</p>
      <Input
        type="password"
        placeholder="๋ฐ์ด๋ธ์ค API SECRET KEY"
        name="apiSecretKey"
        onChange={(e) => {
          apiKey = e.target.value;
        }}
      ></Input>

      <SignUpButton
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
                alert("์ด๋ฏธ ์กด์ฌํ๋ ์์ด๋์๋๋ค.");
              } else {
                console.log(error);
              }
            });
        }}
      >
        ํ์๊ฐ์
      </SignUpButton>
    </Container>
  );
}

function test() {}
