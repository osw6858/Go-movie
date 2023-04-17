import "./App.css";
import React from "react";
import Movies from "./movies/movies";
import Boxoffice from "./boxoffice/boxoffice";
import {Routes, Route, useNavigate, Link} from "react-router-dom";
import {debounce} from "lodash";
import {BarsOutlined} from "@ant-design/icons";
import Login from "./login/login";
import KakaoLogin from "./login/kakaoLogin";
import LogOut from "./login/logout";
import KakaoLogout from "./login/test";
import {
    Drawer,
    Descriptions,
    Select,
    Collapse,
    Space,
    Button
} from 'antd';

function App() {
    const navigate = useNavigate(); //v6부터는 useHistory 말고 useNavigate을 사용
    const [searchValue, setSearchValue] = React.useState("");
    const [selected, setSelected] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState('left');

    let ACCESS_TOKEN = localStorage.getItem("token");

    const {Panel} = Collapse;

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

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
                        <BarsOutlined onClick={showDrawer}/>
                        <Drawer
                            title="홈페이지 설계 과정 및 정보"
                            placement={placement}
                            width={500}
                            onClose={onClose}
                            open={open}
                            extra={<Space > <Button onClick={onClose}>닫기</Button>
                        </Space>}>
                            <h2>페이지 소개</h2>
                            <ul>
                                <li>영화진흥회 api를 이용한 간단한 영화정보 검색 페이지</li>
                                <br/>
                                <li>카카오 로그인api이용 로그인 상태일때만 성인물 표시</li>
                                <br/>
                                <li>React를 이용하여 SPA방식으로 구현</li>
                                <br/>
                                <li>디바운싱 적용하여 검색시 과도한 api호출 방지</li>
                                <br/>
                                <li>antd이용 레이아웃 구성</li>
                                <br/>
                                <li>
                                    <a href="https://osw6858.github.io/Go-movie/">각 부분 문제 해결 과정</a>
                                </li>
                            </ul>
                            <br/>
                            <h2>제작과정</h2>
                            <ul>
                                <li>총 재작 기간 14일</li>
                                <br/>
                                <li>3/30 - 레이아웃 구상</li>
                                <br/>
                                <li>3/31 ~ 4/1 - 영화진흥회api 연결, 결과 목록 페이징</li>
                                <br/>
                                <li>4/2 ~ 4/7 - 검색기능 구현</li>
                                <br/>
                                <li>4/8 ~ 4/10 - 카카오 로그인 api 연결</li>
                                <br/>
                                <li>4/11 ~ 4/14 - 검색카테고리 추가 및 버그 수정</li>
                            </ul>
                            <br/>

                        </Drawer>
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

                    <input
                        className="search-bar"
                        type="text"
                        placeholder="여기에 검색해 주세요."
                        onChange={(e) => onChange(e)}/>
                    <Select
                        defaultValue="movieNm"
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
            </header>
            <div className="body">

                <Routes>
                    <Route
                        path="/Go-movie"
                        element={<Movies searchString = {
                            searchValue
                        }
                        selected = {
                            selected
                        } />
}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/login/kakaoLogin" element={<KakaoLogin></KakaoLogin>}/>
                    <Route path="/logout" element={<LogOut></LogOut>}/>
                    <Route path="/kakaologout" element={<KakaoLogout></KakaoLogout>}/>
                </Routes>
                <hr className="hr-line"></hr>
                <Boxoffice></Boxoffice>

            </div>
            <footer >
                <Descriptions title="User Info" className="footer">
                    <Descriptions.Item label="Made By">OH SHIN WOONG</Descriptions.Item>
                    <Descriptions.Item label="Telephone">010-3788-6858</Descriptions.Item>
                    <Descriptions.Item label="Live">Seoul</Descriptions.Item>
                    <Descriptions.Item label="Version">1.0</Descriptions.Item>
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