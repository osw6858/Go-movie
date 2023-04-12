import "./App.css";
import React from "react";
import Movies from "./movies/movies";
import Boxoffice from "./boxoffice/boxoffice";
import {Routes, Route, useNavigate, Link} from "react-router-dom";
import {debounce} from "lodash";
import {BarsOutlined, SearchOutlined} from "@ant-design/icons";
import Login from "./login/login";
import KakaoLogin from "./login/kakaoLogin";
import LogOut from "./login/logout";
import KakaoLogout from "./login/test";
import {Carousel, Descriptions, Select} from 'antd';

function App() {
    const navigate = useNavigate(); //v6부터는 useHistory 말고 useNavigate을 사용
    const [searchValue, setSearchValue] = React.useState("");
    const [selected, setSelected] = React.useState("");
    let ACCESS_TOKEN = localStorage.getItem("token");
    console.log("토큰", ACCESS_TOKEN);

    const onChange = debounce((e) => {
        setSearchValue(e.target.value);
    }, 300);

    const handleChange = (value) => {
      console.log(`selected ${value}`);
      setSelected(value);
    };

    return (
        <div>
            <header className="header">
                <div className="left-section">
                    <div className="hamburger-menu">
                        <BarsOutlined
                            onClick={() => {
                                navigate("/");
                            }}/>
                    </div>
                    <div>
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none",
                                color: "black"
                            }}>
                            <span className="logo">
                                go-movie
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="middle-section">
                    <img className="search-button" src="assets/icons/search.svg" alt="search"/>
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="여기에 검색해 주세요."
                        onChange={(e) => onChange(e)}/>
                    <Select
                        defaultValue="제목"
                        className="selector"
                        onChange={handleChange}
                        options={[
                            {
                                value: 'movieNm',
                                label: '제목'
                            }, {
                                value: 'directorNm',
                                label: '감독'
                            }
                        ]}/>

                </div>
                <div className="right-section">
                    <div className="select-container">
                        <div className="login">
                            {
                                ACCESS_TOKEN !== null
                                    ? (
                                        <button
                                            onClick={() => {
                                                navigate("/logout");
                                            }}
                                            className="login-out-button">
                                            로그아웃
                                        </button>
                                    )
                                    : (
                                        <button
                                            onClick={() => {
                                                navigate("/login");
                                            }}
                                            className="login-out-button">
                                            로그인
                                        </button>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </header>
            <div className="body">
                <Carousel className="carousel" dotPosition="top">
                    <Routes>
                        <Route
                            path="/"
                            element={<Movies searchString = {
                                searchValue
                            } selected = {selected} />
                            }
                        />
                        <Route path="/login" element={<Login />}/>
                        <Route path="/login/kakaoLogin" element={<KakaoLogin></KakaoLogin>}/>
                        <Route path="/logout" element={<LogOut></LogOut>}/>
                        <Route path="/kakaologout" element={<KakaoLogout></KakaoLogout>}/>
                    </Routes>
                    <Boxoffice></Boxoffice>
                </Carousel>
            </div>
            <footer >
                <Descriptions title="User Info" className="footer">
                    <Descriptions.Item label="Made By">OH SHIN WOONG</Descriptions.Item>
                    <Descriptions.Item label="Telephone">010-3788-6858</Descriptions.Item>
                    <Descriptions.Item label="Live">Seoul</Descriptions.Item>
                    <Descriptions.Item label="Version">1.0.0</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        노원구
                    </Descriptions.Item>
                </Descriptions>
            </footer>
        </div>
    );
}

export default App;

// react-router-dom v6부터는, Switch 대신 Routes를 사용 Route 안에 component 대신 element 사용
// 그리고 <Routes> 자식으로는 <Route>만 가능 박스오피스 페이지 구현할것 historyPupsh 활용 v6부터는
// useHistory 말고 useNavigate을 사용 영화 상세페이지 rout로 구현하기 로그인 api도입 예정 -> 적용하면 로그인시만
// 상세페이지 조회 가능 디바운과 쓰로틀링을 이용해 api 호출을 줄여보자! => 성공