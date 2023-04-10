import React from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function LogOut() {
    const navigate = useNavigate();
    let ACCESS_TOKEN = localStorage.getItem("token");
    console.log("토큰", ACCESS_TOKEN);
    React.useEffect(() => {
        axios
            .post(`https://kapi.kakao.com/v1/user/logout`, {}, {
                headers: {
                    "Authorization": `Bearer ${ACCESS_TOKEN}`
                }
            })
            .then((res) => {
                console.log("res", res);
                window.alert("로그아웃 성공!");
                window
                    .localStorage
                    .removeItem("token");
                navigate("/");
            })
            .catch((err) => {
                console.log("err", err);
                window.alert("로그아웃 실패!");
            });
    }, []);
   return <div></div>
}

export default LogOut;
