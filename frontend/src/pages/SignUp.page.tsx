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
      <Welcome>💰COBOK에 오신 것을 환영합니다.</Welcome>
      <Description>
        COBOK은 가상화페 추세 예측 및 자동 매매 서비스입니다.{" "}
      </Description>
      <p>닉네임</p>
      <Input
        type="Text"
        placeholder="닉네임을 입력해주세요"
        name="userName"
        onChange={(e) => {
          userName = e.target.value;
        }}
      ></Input>
      <p>비밀번호</p>
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        name="password"
        onChange={(e) => {
          password = e.target.value;
        }}
      ></Input>
      <p>바이낸스 API KEY</p>
      <Input
        type="password"
        placeholder="바이낸스 API KEY"
        name="apiKey"
        onChange={(e) => {
          apiSecretKey = e.target.value;
        }}
      ></Input>
      <p>바이낸스 API SECRET KEY</p>
      <Input
        type="password"
        placeholder="바이낸스 API SECRET KEY"
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
                alert("이미 존재하는 아이디입니다.");
              } else {
                console.log(error);
              }
            });
        }}
      >
        회원가입
      </SignUpButton>
    </Container>
  );
}

function test() {}
