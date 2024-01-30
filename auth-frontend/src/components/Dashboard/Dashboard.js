import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import "./Dashboard.css";
import Header from "./Header";
import axios from "axios";
import Pagination from "../../UI/Pagination/Pagination";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [user, setUser] = useState({});
  const [pageDetails, setPageDetails] = useState({});

  if (!localStorage.getItem("page")) {
    localStorage.setItem("page", 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const page = localStorage.getItem("page");
      try {
        const response = await axios.get(
          `http://localhost:4000/user/get-users/${page} `,
          { headers: { Authorization: token } }
        );
        setUserDetails(response.data.usersData);
        setUser(response.data.user);
        setPageDetails(response.data.pageDetails);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [pageDetails]);

  const pageChanges = (page, totalPages) => {
    const newPageDetails = {
      currentPage: page,
      totalPages: totalPages,
    };
    setPageDetails(newPageDetails);
    localStorage.setItem("page", page);
  };

  return (
    <div>
      <Header username={user.firstname} follower={user.follower} />
      <div className="user-cards">
        {userDetails.map((userDetail) => (
          <UserCard
            name={userDetail.firstname}
            username={userDetail.username}
          />
        ))}
      </div>
      <Pagination
        totalPages={pageDetails.totalPages}
        currentPage={pageDetails.currentPage}
        onPageChange={pageChanges}
      />
    </div>
  );
};

export default Dashboard;
