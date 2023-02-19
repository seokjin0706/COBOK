import { useNavigate, useLocation } from "react-router-dom";
export function SignUpResult() {
  let navigate = useNavigate();
  console.log(useLocation());
  return (
    <div>
      <div className="center">
        <h1> COBOK에 오신 것을 환영합니다.</h1>

        <h2>{useLocation().state}님 회원가입을 축하드립니다.</h2>
        <button
          className="login-btn"
          type="submit"
          onClick={() => {
            navigate("/Login");
          }}
        >
          로그인
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="login-btn"
          type="submit"
        >
          메인 페이지
        </button>
      </div>
    </div>
  );
}
