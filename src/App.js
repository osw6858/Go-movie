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
  const [searchValue, setSearchValue] = React.useState("");
  const searching = (event) => {
    //이부분 다시 공부(useState에 대해 더 깊이 공부해 볼것)
    setSearchValue(event.target.value);
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
            value={searchValue}
            onChange={searching}
          ></input>
          <button className="search-button">
            <SearchOutlined />
          </button>
        </div>
        <div className="right-section">
          <div className="select-container">
            <LineChartOutlined style={{ fontSize: "20px" }} />
            <div className="tooltip">박스오피스 순위</div>
          </div>
        </div>
      </header>
      <Movies searchString={searchValue} />
    </div>
  );
}

export default App;
