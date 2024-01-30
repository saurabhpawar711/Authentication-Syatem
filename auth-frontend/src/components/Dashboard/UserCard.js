import React from "react";
import axios from "axios";

import "./UserCard.css";

const UserCard = (props) => {
  const addFollower = async (username) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        "http://localhost:4000/follow/add-follower",
        { usernameTobeAdd: username },
        { headers: { Authorization: token } }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="user-card">
      <img
        className="user-avatar"
        src="https://i.pravatar.cc/40?u={username}"
        alt="User"
      />
      <div className="user-info">
        <h4 className="user-name">Username : {props.username}</h4>
        <h4 className="user-name">Name : {props.name}</h4>
      </div>
      <button
        className="follow-button"
        onClick={() => addFollower(props.username)}
      >
        Follow
      </button>
    </div>
  );
};

export default UserCard;
