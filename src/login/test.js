import React from "react";
import {LOGOUT_REDIRECT_URI, KAKAO_KEY} from "../key";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function KakaoLogout () {
    const navigate = useNavigate();
    React.useEffect(() => {
        axios
            .get(
                `https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`
            )
            .then((res) => {
                console.log("카카오계정과 함께 로그아웃 성공", res)
                navigate("/");
            })
            .catch((err) => {
                console.log("카카오계정과 함께 로그아웃 실패", err)
            })
          }, []);
            
            return <div></div>;
}

export default KakaoLogout;

//카카오계정과 함께 로그인 기능 왜 404에러 뜨는지 생각해볼것