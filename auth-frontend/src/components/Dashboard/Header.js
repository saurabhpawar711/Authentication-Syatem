import React from "react";

import "./Header.css";

const Header = (props) => {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1>Dashboard</h1>
      </div>
      <div className="user-icon">
        <img src="https://i.pravatar.cc/40?u={username}" alt="User Icon" />
        <div className="user-name-header">{props.username}</div>
        <span className="follow-count">{props.follower}</span>
      </div>
    </header>
  );
};

export default Header;
