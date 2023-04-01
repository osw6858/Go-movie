import "./App.css";
import React from "react";
import Movies from "./movies/movies";

import {
  BarsOutlined,
  SearchOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
//import Pagination from "react-js-pagination";

function App() {
  const [idValue, setId] = React.useState("");
  const saveUserId = (event) => {
    //이부분 다시 공부(useState에 대해 더 깊이 공부해 볼것)
    setId(event.target.value);
    //console.log(event.target.value);
  };
  return (
    <div>
      <header className="header">
        <div className="left-section">
          <div className="hamburger-menu">
            <BarsOutlined />
          </div>
          <span className="logo">go-movie</span>
        </div>
        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search movies"
            value={idValue}
            onChange={saveUserId}
          ></input>
          <button className="search-button">
            <SearchOutlined />
            <div className="tooltip">Search</div>
          </button>
        </div>
        <div className="right-section">
          <div className="select-container">
            <LineChartOutlined style={{ fontSize: "20px" }} />
            <div className="tooltip">박스오피스 순위</div>
          </div>
          <img
            className="youtube-apps-icon"
            src="assets/icons/youtube-apps.svg"
          />
          <div className="notifications-icon-container">
            <img
              className="notifications-icon"
              src="assets/icons/notifications.svg"
            />
            <div className="notifications-count">1</div>
          </div>
          <img
            className="current-user-picture"
            src="assets/images/avatars/avatar-1.png"
          ></img>
        </div>
      </header>
      <Movies searchString={idValue} />
    </div>
  );
}

export default App;
