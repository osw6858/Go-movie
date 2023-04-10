import "./App.css";
import React from "react";
import Movies from "./movies/movies";
import Boxoffice from "./boxoffice/boxoffice";
import { Routes, Route, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { BarsOutlined, SearchOutlined } from "@ant-design/icons";
import Login from "./login/login";
import KakaoLogin from "./login/kakaoLogin";
import LogOut from "./login/logout";
import KakaoLogout from "./login/test";

function App() {
  const navigate = useNavigate(); //v6부터는 useHistory 말고 useNavigate을 사용
  const [searchValue, setSearchValue] = React.useState("");
  let ACCESS_TOKEN = localStorage.getItem("token");
  console.log("토큰",ACCESS_TOKEN );

  const onChange = debounce((e) => {
    setSearchValue(e.target.value);
  }, 400);

  return (
    <div>
      <header className="header">
        <div className="left-section">
          <div className="hamburger-menu">
            <BarsOutlined
              onClick={() => {
                navigate("/");
              }}
            />
            <div className="tooltip">페이지 정보</div>
          </div>
          <div>
            <button
              className="logo"
              onClick={() => {
                navigate("/");
              }}
            >
              <span>go-movie</span>
            </button>
          </div>
        </div>
        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search movies"
            onChange={(e) => onChange(e)}
          />
          <button className="search-button">
            <SearchOutlined />
          </button>
        </div>
        <div className="right-section">
          <div className="select-container">
            <div className="login">
              {ACCESS_TOKEN !== null ? (
                <button
                  onClick={() => {
                    navigate("/logout");
                  }}
                >
                  로그아웃
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  로그인
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="body">
        <Routes>
          <Route path="/" element={<Movies searchString={searchValue} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/kakaoLogin" element={<KakaoLogin></KakaoLogin>} />
          <Route path="/logout" element={<LogOut></LogOut>} />
          <Route path="/kakaologout" element={<KakaoLogout></KakaoLogout>} />
        </Routes>
        <hr className="devid-line" />
        <Boxoffice></Boxoffice>
      </div>
      <footer className="footer">
        <p>ver 1.0 / MadeBy osw6858</p>
      </footer>
    </div>
  );
}

export default App;

//react-router-dom v6부터는, Switch 대신 Routes를 사용
//Route 안에 component 대신 element 사용
//그리고 <Routes> 자식으로는 <Route>만 가능

//박스오피스 페이지 구현할것 historyPupsh 활용

//v6부터는 useHistory 말고 useNavigate을 사용

//영화 상세페이지 rout로 구현하기

//로그인 api도입 예정 -> 적용하면 로그인시만 상세페이지 조회 가능

//디바운과 쓰로틀링을 이용해 api 호출을 줄여보자! => 성공
