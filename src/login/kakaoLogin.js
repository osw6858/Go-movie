import axios from "axios";
import "./kakaoLogin.css";
import { Spin } from "antd";
import React from "react";
import { REDIRECT_URI, KAKAO_KEY } from "../key";
import { useNavigate } from "react-router-dom";

function KakaoLogin() {
  const navigate = useNavigate();

  //현재 윈도우 창의 주소값 불러옴
  const href = window.location.href;
  //현재 url의 파라미터를 가져옴
  let params = new URL(window.location.href).searchParams;
  //params에 저장된 파라미터 안에서 'code'의 값을 가져옴
  let code = params.get("code");

  React.useEffect(() => {
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        const ACCESS_TOKEN = res.data.accessToken;
        localStorage.setItem("token", ACCESS_TOKEN);
        window.alert("로그인성공!");
        navigate("/");
      })
      .catch((err) => {
        console.log("에러발생", err);
        window.alert("로그인에 실패하였습니다.");
        navigate("/login");
      });
  }, []);

  return (
    <div>
      <div className="login-ing">
        <Spin size="large" />
        <h2>잠시만 기다려 주세요.</h2>
      </div>
    </div>
  );
}

export default KakaoLogin;
