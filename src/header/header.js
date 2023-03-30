import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="left-section">
        <img className="hamburger-menu" src="assets/icons/hamburger-menu.svg" />
        <span className="logo">go-movie</span>
      </div>
      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="search"></input>
        <button className="search-button">
          <img className="search-icon" src="assets/icons/search.svg"></img>
          <div className="tooltip">Search</div>
        </button>
        <button className="voice-search-button">
          <img
            className="voice-search-icon"
            src="assets/icons/voice-search-icon.svg"
          ></img>
          <div className="tooltip">Search with your voice</div>
        </button>
      </div>
      <div className="right-section">
        <div className="upload-icon-container">
          <img className="upload-icon" src="assets/icons/upload.svg" />
          <div className="tooltip">Create</div>
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
          class="current-user-picture"
          src="assets/images/avatars/avatar-1.png"
        ></img>
      </div>
    </header>
  );
}

export default Header;
