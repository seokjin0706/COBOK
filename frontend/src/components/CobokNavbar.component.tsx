import axios, { AxiosError } from "axios";
import { Nav, Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface UserStateType {
  userName: string;
  isLogin: boolean;
}



export function CobokNavbar() {
  let navigate = useNavigate();
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
    <>
      <Navbar className="CobokNavbar" fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{ cursor: "pointer" }} href="/">
            💰COBOK
          </Navbar.Brand>
          <Nav className="me-auto">
            {isLogin ? (
              <Nav.Link href="/AutoTrading">코인자동매매</Nav.Link>
            ) : (
              <Nav.Link href="/Login">코인자동매매</Nav.Link>
            )}
          </Nav>
          <Nav>
            {isLogin ? (
              <Nav.Link href="/">{userName}</Nav.Link>
            ) : (
              <Nav.Link href="/Login">{userName}</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
