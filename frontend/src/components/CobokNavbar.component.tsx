import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface UserStateType {
  userName: string;
  isLogin: boolean;
}

const NavBar = styled.div`
  display: flex;
  align-items: center;
  height: 10vh;
  padding: 20px 0px;
  border-style: solid;
  border-width: 1px 0px 1px 0px;
  border-color: rgba(255, 255, 255, 0.4);
`;
const NavBrand = styled.span`
  font-size: 30px;
  margin-left: 80px;
  margin-right: 40px;
  a:hover {
    color: ${(props) => props.theme.textColor};
  }
`;
const NavAutoTrading = styled.span`
  font-size: 18px;
  margin-right: auto;
  a:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;
const NavSignIn = styled.span`
  font-size: 15px;
  border-radius: 15px;
  a:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;
const NavSignUp = styled.span`
  font-size: 15px;
  border-radius: 15px;
  padding: 10px 20px;
  margin-right: 80px;
  margin-left: 15px;
  a:hover {
    color: ${(props) => props.theme.accentColor};
  }
  background-color: #1755745c;
`;
export function CobokNavbar() {
  let [userName, setUserName] = useState("");
  let [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/authenticate", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((result) => {
        setUserName(result.data.userName);
        setIsLogin(true);
      })
      .catch((error: AxiosError) => {
        setUserName("로그인");
        setIsLogin(false);
        console.log(error);
      });
  }, []);

  return (
    <NavBar>
      <NavBrand>
        <Link to={"/"}>💰COBOK</Link>
      </NavBrand>
      <NavAutoTrading>
        <Link to={"#"}>오토트레이딩</Link>
      </NavAutoTrading>

      <NavSignIn>
        {isLogin ? (
          <Link to={"/"}>{userName}</Link>
        ) : (
          <Link to={"/SignIn"}>{userName}</Link>
        )}
      </NavSignIn>
      <NavSignUp>
        <Link to={"/SignUp"}>회원가입</Link>
      </NavSignUp>
    </NavBar>
  );
}
