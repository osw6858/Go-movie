import "./login.css";
import { REDIRECT_URI, KAKAO_KEY } from "../key";

function Login() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_URI}`;
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <header className="login-header">
        <h1>다음을 이용해 로그인 할 수 있습니다.</h1>
        <button onClick={kakaoLogin}>카카오톡으로 로그인</button>
      </header>
    </div>
  );
}

export default Login;
