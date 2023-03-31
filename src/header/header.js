import "./header.css";
import {
  BarsOutlined,
  SearchOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

function Header() {
  return (
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
          name="search"
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
  );
}

export default Header;
